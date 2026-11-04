import type { Status } from "../../constants/types";

const LABEL: Record<Status, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  completed: "Completed",
};

const STYLE: Record<Status, string> = {
  not_started: "text-muted border-track",
  in_progress: "text-accent border-accent",
  completed: "text-success border-success",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${STYLE[status]}`}
    >
      {LABEL[status]}
    </span>
  );
}
