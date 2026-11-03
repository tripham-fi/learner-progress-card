const learnerMapper = (learner) => {
  const completedLessons = learner.employee._count.lesson_completions;
  const totalLessons = learner.program.modules.reduce(
    (prev, a) => prev + a._count.lessons,
    0,
  );
  const precentage = (completedLessons / totalLessons) * 100;

  return {
    programName: learner.program.title,
    employeeName: learner.employee.name,
    employeeImage: learner.employee.image,
    enrolled_at: learner.enrolled_at,
    precentage: precentage.toFixed(2),
  };
};

module.exports = { learnerMapper };
