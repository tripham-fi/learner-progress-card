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

  const [lisa, karen, todd] = await Promise.all(
    [
      {
        name: "Lisa",
        email: "lisa@test.com",
        username: "lisaTest",
        enrolled_at: "2026-09-14",
      },
      {
        name: "Karen",
        email: "karen@test.com",
        username: "karenTest",
        enrolled_at: "2026-10-26",
      },
      {
        name: "Todd",
        email: "todd@test.com",
        username: "toddTest",
        enrolled_at: "2026-10-19",
      },
    ].map(({ enrolled_at, ...e }) =>
      prisma.employee.create({
        data: {
          ...e,
          enrollments: {
            create: {
              program_id: jsProgram.id,
              enrolled_at: new Date(`${enrolled_at}T09:00:00Z`),
            },
          },
        },
      }),
    ),
  );

  // Seeding lesson progress
  const lessons = await prisma.lesson.findMany({
    where: { module: { program_id: jsProgram.id } },
    orderBy: { position: "asc" },
  });

  const completionsFor = (employee, dates) => {
    return dates.map((completed_at, i) => ({
      employee_id: employee.id,
      lesson_id: lessons[i].id,
      completed_at,
    }));
  };

  await prisma.lessonCompletion.createMany({
    data: [
      ...completionsFor(lisa, lisaDates), // completed a module
      ...completionsFor(todd, toddDates), // 10 of 24
    ],
  });
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
