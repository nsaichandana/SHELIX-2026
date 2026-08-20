// Signature visual: a double-helix drawn as a circuit-board trace —
// two intertwining strands built from straight PCB-style segments and
// rounded via-nodes, with a pulse of light traveling the length of it.
// This ties the "Helix" in the event name to the circuit-board /
// innovation-lab material language requested for the brand.
export default function HelixCircuit() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* faint grid */}
      <div className="absolute inset-0 bg-grid bg-[length:42px_42px] opacity-60" />

      {/* radial color wash */}
      <div className="absolute inset-0 bg-helix-radial" />

      {/* animated circuit helix */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-80"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="strandA" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="#3B6EFF" stopOpacity="0" />
            <stop offset="15%" stopColor="#3B6EFF" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.55" />
            <stop offset="85%" stopColor="#D6409F" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D6409F" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="strandB" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="#D6409F" stopOpacity="0" />
            <stop offset="20%" stopColor="#8B5CF6" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#3B6EFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B6EFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* strand 1 — PCB-style trace with right-angle steps */}
        <path
          d="M -40 180
             C 180 180, 220 340, 420 340
             C 620 340, 660 120, 860 120
             C 1060 120, 1100 460, 1300 460
             C 1420 460, 1440 500, 1480 500"
          stroke="url(#strandA)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M -40 180
             C 180 180, 220 340, 420 340
             C 620 340, 660 120, 860 120
             C 1060 120, 1100 460, 1300 460
             C 1420 460, 1440 500, 1480 500"
          stroke="#F4F5FF"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeDasharray="6 1200"
          className="motion-safe:animate-pulse-travel"
          fill="none"
        />

        {/* strand 2 — mirrored, quieter */}
        <path
          d="M -40 520
             C 180 520, 220 640, 420 640
             C 620 640, 660 760, 860 760
             C 1060 760, 1100 560, 1300 560
             C 1420 560, 1440 600, 1480 600"
          stroke="url(#strandB)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* via-nodes along strand 1 */}
        {[
          [420, 340],
          [860, 120],
          [1300, 460],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r="10"
              fill="none"
              stroke="#8B5CF6"
              strokeOpacity="0.35"
            />
            <circle
              cx={cx}
              cy={cy}
              r="3.5"
              className="motion-safe:animate-flicker"
              fill="#D6409F"
            />
          </g>
        ))}

        {/* drifting particles */}
        {[
          [140, 620, 2, "8s"],
          [980, 220, 1.5, "11s"],
          [1180, 700, 2.2, "9.5s"],
          [560, 90, 1.4, "13s"],
          [720, 780, 1.8, "10s"],
        ].map(([cx, cy, r], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="#9AA0C7"
            fillOpacity="0.5"
            className="motion-safe:animate-drift"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}
      </svg>

      {/* vignette so foreground content stays legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-transparent to-void/40" />
    </div>
  );
}
