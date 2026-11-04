const learnerMapper = (e, stats) => {
  const total = e.program.modules.reduce((sum, m) => sum + m._count.lessons, 0);
  const s = stats.get(`${e.employee_id}:${e.program_id}`);
  const done = s?._count.lesson_id ?? 0;
  const last = s?._max.completed_at ?? null;
  return {
    name: e.employee.name,
    username: e.employee.username,
    image: e.employee.image,
    program: e.program.title,
    enrolledAt: e.enrolled_at.toISOString().slice(0, 10),
    completedLessons: done,
    totalLessons: total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
    status:
      total > 0 && done === total
        ? "completed"
        : done === 0
          ? "not_started"
          : "in_progress",
    lastActivity: last ? last.toISOString().slice(0, 10) : null,
  };
};

module.exports = { learnerMapper };
