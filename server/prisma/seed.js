const prisma = require("./../src/config/prisma");
const { programsData, toProgramCreate } = require("./ProgramsData");

const on = (date, n = 1) => Array(n).fill(new Date(`${date}T09:00:00Z`));
const lisaDates = [
  ...on("2026-09-18"),
  ...on("2026-09-28", 2),
  ...on("2026-09-29", 2),
  ...on("2026-09-30"),
  ...on("2026-10-01"),
  ...on("2026-10-06", 2),
  ...on("2026-10-07", 2),
  ...on("2026-10-09"),
  ...on("2026-10-20", 2),
  ...on("2026-10-21", 2),
  ...on("2026-10-22"),
  ...on("2026-10-23"),
  ...on("2026-10-27", 2),
  ...on("2026-10-29"),
  ...on("2026-10-30"),
  ...on("2026-10-31", 2),
];

const toddDates = [
  ...on("2026-10-20", 3),
  ...on("2026-10-22", 2),
  ...on("2026-10-27", 3),
  ...on("2026-10-29", 2),
];

const davisDates = [
  ...on("2026-10-06", 2),
  ...on("2026-10-07", 2),
  ...on("2026-10-08"),
  ...on("2026-10-13", 2),
  ...on("2026-10-14", 2),
  ...on("2026-10-15"),
  ...on("2026-10-27", 2),
  ...on("2026-10-28", 2),
];

const mayoDates = [...on("2026-10-13"), ...on("2026-10-14", 2)];

async function main() {
  console.log("Seeding database...");
  // Reset
  await prisma.employee.deleteMany();
  await prisma.program.deleteMany();

  // Initialize seeding program and employee
  const programs = {};
  for (const p of programsData) {
    programs[p.title] = await prisma.program.create({
      data: toProgramCreate(p),
    });
  }
  const jsProgram = programs["JavaScript Essentials"];
  const webProgram = programs["Web Development Fundamentals"];

  const [lisa, karen, todd, davis, mayo] = await Promise.all(
    [
      {
        name: "Lisa",
        email: "lisa@test.com",
        username: "lisaTest",
        enrolled_at: "2026-09-14",
        program: jsProgram,
      },
      {
        name: "Karen",
        email: "karen@test.com",
        username: "karenTest",
        enrolled_at: "2026-10-26",
        program: jsProgram,
      },
      {
        name: "Todd",
        email: "todd@test.com",
        username: "toddTest",
        enrolled_at: "2026-10-19",
        program: jsProgram,
      },
      {
        name: "Davis",
        email: "davis@test.com",
        username: "davisTest",
        enrolled_at: "2026-10-05",
        program: webProgram,
      },
      {
        name: "Mayo",
        email: "mayo@test.com",
        username: "mayoTest",
        enrolled_at: "2026-10-12",
        program: webProgram,
      },
    ].map(({ enrolled_at, program, ...e }) =>
      prisma.employee.create({
        data: {
          ...e,
          enrollments: {
            create: {
              program_id: program.id,
              enrolled_at: new Date(`${enrolled_at}T09:00:00Z`),
            },
          },
        },
      }),
    ),
  );

  // Seeding lesson progress
  const jsLessons = await prisma.lesson.findMany({
    where: { module: { program_id: jsProgram.id } },
    orderBy: { position: "asc" },
  });
  const webLessons = await prisma.lesson.findMany({
    where: { module: { program_id: webProgram.id } },
    orderBy: [{ module: { position: "asc" } }, { position: "asc" }],
  });

  const completionsFor = (employee, dates, lessonList) =>
    dates.map((completed_at, i) => ({
      employee_id: employee.id,
      lesson_id: lessonList[i].id,
      completed_at,
    }));

  await prisma.lessonCompletion.createMany({
    data: [
      ...completionsFor(lisa, lisaDates, jsLessons), // finished
      ...completionsFor(todd, toddDates, jsLessons), // 10 of 24
      ...completionsFor(davis, davisDates, webLessons), // 14 of 20, 1 of 2 modules
      ...completionsFor(mayo, mayoDates, webLessons), // 3 of 20
    ],
  });

  console.log("Seeded 2 programs, 5 learners, 51 completions");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
