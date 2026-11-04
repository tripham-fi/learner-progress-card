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
const lisaWebDates = [...on("2026-11-02", 2), ...on("2026-11-03", 3)];

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
const davisJsDates = [
  ...on("2026-10-30", 2),
  ...on("2026-11-02", 3),
  ...on("2026-11-03", 2),
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
        image: "https://randomuser.me/api/portraits/women/32.jpg",
        enrollments: [
          { program: jsProgram, enrolled_at: "2026-09-14" },
          { program: webProgram, enrolled_at: "2026-11-01" },
        ],
      },
      {
        name: "Karen",
        email: "karen@test.com",
        username: "karenTest",
        image: "https://randomuser.me/api/portraits/women/33.jpg",
        enrollments: [{ program: jsProgram, enrolled_at: "2026-10-26" }],
      },
      {
        name: "Todd",
        email: "todd@test.com",
        username: "toddTest",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        enrollments: [{ program: jsProgram, enrolled_at: "2026-10-19" }],
      },
      {
        name: "Davis",
        email: "davis@test.com",
        username: "davisTest",
        image: "https://randomuser.me/api/portraits/men/36.jpg",
        enrollments: [
          { program: webProgram, enrolled_at: "2026-10-05" },
          { program: jsProgram, enrolled_at: "2026-10-29" },
        ],
      },
      {
        name: "Mayo",
        email: "mayo@test.com",
        username: "mayoTest",
        image: "https://randomuser.me/api/portraits/men/34.jpg",
        enrollments: [{ program: webProgram, enrolled_at: "2026-10-12" }],
      },
    ].map(({ enrollments, ...e }) =>
      prisma.employee.create({
        data: {
          ...e,
          enrollments: {
            create: enrollments.map(({ program, enrolled_at }) => ({
              program_id: program.id,
              enrolled_at: new Date(`${enrolled_at}T09:00:00Z`),
            })),
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
      ...completionsFor(lisa, lisaDates, jsLessons), // JS: 24 of 24, finished
      ...completionsFor(lisa, lisaWebDates, webLessons), // Web: 5 of 20
      ...completionsFor(todd, toddDates, jsLessons), // JS: 10 of 24
      ...completionsFor(davis, davisDates, webLessons), // Web: 14 of 20, 1 of 2 modules
      ...completionsFor(davis, davisJsDates, jsLessons), // JS: 7 of 24
      ...completionsFor(mayo, mayoDates, webLessons), // Web: 3 of 20
    ],
  });

  console.log("Seeded 2 programs, 5 learners, 7 enrolments, 63 completions");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
