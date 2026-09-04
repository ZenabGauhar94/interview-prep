export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full h-1.5 bg-neutral-300/40 rounded-full overflow-hidden">
      <div
        className="h-full bg-primary-light rounded-full transition-all"
        style={{ width: `${Math.min(percent, 100)}%` }}
      />
    </div>
  );
}