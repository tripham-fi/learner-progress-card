import StatusBadge from "./ui/StatusBadge";
import ProgressBar from "./ui/ProgressBar";
import type { ModuleLearning } from "../constants/types";

interface ModuleItemProp {
  moduleLearning: ModuleLearning;
}

export default function ModuleItem({
  moduleLearning: { title, status, progress, completedLessons, totalLessons },
}: ModuleItemProp) {
  return (
    <li className="rounded-card border border-track bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-text">{title}</h3>
        <StatusBadge status={status} />
      </div>
      <div className="mt-3">
        <ProgressBar percent={progress} />
      </div>
      <p className="mt-2 text-sm text-muted">
        {completedLessons} of {totalLessons} lessons
      </p>
    </li>
  );
}
