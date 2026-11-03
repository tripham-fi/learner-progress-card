// Lesson titles are generated; `lessons` is how many lessons the module has.
const programsData = [
  {
    title: "Web Development Fundamentals",
    description: "A short program covering the basics of the web.",
    modules: [
      {
        title: "Getting Started with HTML",
        description: "Learn the building blocks of web pages.",
        lessons: 10,
      },
      {
        title: "Styling with CSS",
        description: "Make pages look good with layout and colour.",
        lessons: 10,
      },
    ],
  },
  {
    title: "JavaScript Essentials",
    description: "One long module covering the core of the language.",
    modules: [
      {
        title: "JavaScript from Scratch",
        description: "Variables, functions, arrays, objects and async code.",
        lessons: 24,
      },
    ],
  },
];

function toProgramCreate(program) {
  return {
    title: program.title,
    description: program.description,
    modules: {
      create: program.modules.map((m, mi) => ({
        title: m.title,
        description: m.description,
        position: mi + 1,
        lessons: {
          create: Array.from({ length: m.lessons }, (_, li) => ({
            title: `${m.title}: lesson ${li + 1}`,
            position: li + 1,
            content: `This is content test #${li + 1}....`
          })),
        },
      })),
    },
  };
}

module.exports = { programsData, toProgramCreate };