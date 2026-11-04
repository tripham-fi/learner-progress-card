import ProgressBar from "./ui/ProgressBar";
import StatusBadge from "./ui/StatusBadge";
import type { LearnerProgress } from "../constants/types";

interface SummaryProp {
    learner: LearnerProgress
}


export default function LearnerSummary({ learner }: SummaryProp) {
  const {
    program,
    status,
    percent,
    totalCompleted,
    totalLessons,
    modulesCompleted,
    modulesTotal,
    lastActivity,
  } = learner;

  return (
    <section
      aria-labelledby="program-title"
      className="rounded-card border border-track bg-surface p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 id="program-title" className="text-lg font-semibold text-text">
          {program}
        </h2>
        <StatusBadge status={status} />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1">
          <ProgressBar percent={percent} />
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted">Modules</dt>
          <dd className="text-text">
            {modulesCompleted} of {modulesTotal} completed
          </dd>
        </div>
        <div>
          <dt className="text-muted">Lessons</dt>
          <dd className="text-text">
            {totalCompleted} of {totalLessons} completed
          </dd>
        </div>
        <div>
          <dt className="text-muted">Last activity</dt>
          <dd className="text-text">
            {lastActivity ? (
              <time dateTime={lastActivity}>{lastActivity}</time>
            ) : (
              "No activity yet"
            )}
          </dd>
        </div>
      </dl>
    </section>
  );
}
