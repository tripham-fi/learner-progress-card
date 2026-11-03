const prisma = require("./../../config/prisma");
const HttpException = require('../../exception/http-exception.model');
const { learnerMapper } = require("./learner.mapper");

async function getLearners() {
  const learners = await prisma.enrollment.findMany({
    orderBy: {
      enrolled_at: "desc",
    },
    select: {
      program: {
        select: {
          title: true,
          modules: { select: { _count: { select: { lessons: true } } } },
        },
      },
      employee: {
        select: {
          name: true,
          image: true,
          _count: { select: { lesson_completions: true } },
        },
      },
      enrolled_at: true,
    },
  });
  const learnerMapped = learners.map(learnerMapper);
  return learnerMapped;
}

module.exports = { getLearners };
