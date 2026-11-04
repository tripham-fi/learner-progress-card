function pct(done, total) {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}
function statusOf(done, total) {
  return total > 0 && done === total
    ? "completed"
    : done === 0
      ? "not_started"
      : "in_progress";
}


module.exports = {pct, statusOf}