interface ProgressBarProps {
  percent: number;
  size?: "sm" | "lg";
}

export default function ProgressBar({ percent, size = "sm" }: ProgressBarProps) {
  const height = size === "lg" ? "h-4" : "h-2.5";
  return (
    <div
      className={`w-full ${height} rounded-full bg-border overflow-hidden`}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-linear-to-r from-brand-green to-brand-yellow transition-all duration-700 ease-out"
        style={{ width: `${Math.max(percent, percent > 0 ? 4 : 0)}%` }}
      />
    </div>
  );
}
