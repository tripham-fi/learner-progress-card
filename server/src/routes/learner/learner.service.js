const prisma = require("./../../config/prisma");
const { learnerMapper } = require("./learner.mapper");
const HttpException = require('./../../exception/http-exception.model')

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

module.exports = { getLearners };
