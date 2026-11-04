const prisma = require("./../../config/prisma");
const { learnerMapper } = require("./learner.mapper");
const HttpException = require("./../../exception/http-exception.model");
const { pct, statusOf } = require("../../util");

async function getLearners() {
  const enrollments = await prisma.enrollment.findMany({
    orderBy: { enrolled_at: "desc" },
    select: {
      employee_id: true,
      program_id: true,
      enrolled_at: true,
      employee: { select: { name: true, username: true, image: true } },
      program: {
        select: {
          title: true,
          modules: { select: { _count: { select: { lessons: true } } } },
        },
      },
    },
  });

  const programIds = [...new Set(enrollments.map((e) => e.program_id))];
  const grouped = await Promise.all(
    programIds.map(async (program_id) => {
      const rows = await prisma.lessonCompletion.groupBy({
        by: ["employee_id"],
        where: { lesson: { module: { program_id } } },
        _count: { lesson_id: true },
        _max: { completed_at: true },
      });
      return rows.map((r) => [`${r.employee_id}:${program_id}`, r]);
    }),
  );

  const stats = new Map(grouped.flat());

  return enrollments.map((e) => learnerMapper(e, stats));
}

async function getLearnerProgress(username, programId) {
  if (!programId || programId.length === 0) {
    throw new HttpException(401, "Invalid query");
  }
  const enrollment = await prisma.enrollment.findFirst({
    where: { employee: { username }, program_id: programId },
    orderBy: { enrolled_at: "asc" },
    select: {
      enrolled_at: true,
      employee: {
        select: { id: true, name: true, username: true, image: true },
      },
      program: {
        select: {
          id: true,
          title: true,
          modules: {
            orderBy: { position: "asc" },
            select: {
              id: true,
              title: true,
              position: true,
              lessons: {
                select: {
                  id: true,
                  completions: { select: { completed_at: true } },
                },
              },
            },
          },
        },
      },
    },
  });
  if (!enrollment) {
    throw new HttpException(404, "Learner not found or not enrolled");
  }
  const { employee, program } = enrollment;

  const lessonIds = program.modules.flatMap((m) => m.lessons.map((l) => l.id));
  const lessonCompletions = await prisma.lessonCompletion.findMany({
    where: { AND: { employee_id: employee.id, lesson_id: { in: lessonIds } } },
    select: { lesson_id: true, completed_at: true },
  });

  const completedAt = new Map(
    lessonCompletions.map((c) => [c.lesson_id, c.completed_at]),
  );

  const modules = program.modules.map((m) => {
    const total = m.lessons.length;
    const completed = m.lessons.filter((l) => completedAt.has(l.id)).length;
    return {
      id: m.id,
      title: m.title,
      position: m.position,
      totalLessons: total,
      completedLessons: completed,
      progress: pct(completed, total),
      status: statusOf(completed, total),
    };
  });

  const totalLessons = modules.reduce((sum, m) => sum + m.totalLessons, 0);
  const totalCompleted = modules.reduce(
    (sum, m) => sum + m.completedLessons,
    0,
  );
  const latest = lessonCompletions.reduce(
    (max, c) => (!max || c.completed_at > max ? c.completed_at : max),
    null,
  );

  return {
    learner: employee,
    program: program.title,
    programId: program.id,
    enrolledAt: enrollment.enrolled_at.toISOString().slice(0, 10),
    status: statusOf(totalCompleted, totalLessons),
    totalLessons,
    totalCompleted,
    percent: pct(totalCompleted, totalLessons),
    modulesTotal: modules.length,
    modulesCompleted: modules.filter((m) => m.status === "completed").length,
    lastActivity: latest ? latest.toISOString().slice(0, 10) : null,
    modules,
  };
}

module.exports = { getLearners, getLearnerProgress };
