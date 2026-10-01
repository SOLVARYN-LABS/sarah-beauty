export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  const word = light ? "text-cream" : "text-plum";
  const accent = light ? "text-[#e7d3b4]" : "text-champagne";
  return (
    <span className="inline-flex items-center gap-2 min-w-0">
      <svg viewBox="0 0 48 48" className="h-8 w-8 shrink-0" aria-hidden>
        <circle cx="24" cy="24" r="23" fill="#2a1520" />
        <circle cx="24" cy="24" r="20.5" fill="none" stroke="#c4a882" strokeWidth="0.8" />
        <path
          d="M24 13.2c1.6 1.5 1.4 3.2-.2 4.2-1.8 1.1-1.6 2.6.2 3.6"
          fill="none"
          stroke="#c4a882"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <text x="24" y="33" textAnchor="middle" fill="#f8f3ee" fontSize="16" fontFamily="Georgia, serif">
          S
        </text>
      </svg>
      <span className={`font-serif leading-none truncate ${compact ? "text-[13px] tracking-[0.08em]" : "text-[15px] sm:text-xl tracking-[0.12em] sm:tracking-[0.18em]"} ${word}`}>
        SARAH <span className={accent}>BEAUTY</span>
      </span>
    </span>
  );
}
