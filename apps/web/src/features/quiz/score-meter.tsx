interface ScoreMeterProps {
  score: number;
  total: number;
  isPassed: boolean;
  passMark?: number;
}

export function ScoreMeter({
  score,
  total,
  isPassed,
  passMark = 6,
}: ScoreMeterProps) {
  const percentage = (score / total) * 100;
  const strokeColor = isPassed ? "#16a34a" : "#f59e0b"; // emerald vs amber

  // 120px circular gauge with SVG circle strokeDasharray
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
      <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#f1f5f9"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={strokeColor}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="flex items-baseline">
          <span className="text-2xl font-black text-slate-900">{score}</span>
          <span className="text-xs font-bold text-slate-400">/{total}</span>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            isPassed
              ? "bg-emerald-100 text-emerald-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {isPassed ? "PASSED" : `Pass mark: ${passMark}`}
        </span>
      </div>
    </div>
  );
}
