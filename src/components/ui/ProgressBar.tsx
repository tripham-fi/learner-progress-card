interface ProgressProp {
  percent: number;
}

export default function ProgressBar({ percent }: ProgressProp) {
  return (
    <div className="flex items-center gap-3">
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 flex-1 rounded-full bg-track overflow-hidden"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-sm text-muted tabular-nums">{percent}%</span>
    </div>
  );
}
