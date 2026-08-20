import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Users } from "lucide-react";
import { eventInfo } from "../data/eventInfo.js";
import { eventLinks } from "../data/eventLinks.js";

export default function RegistrationCTA() {
  const reduceMotion = useReducedMotion();
  const { finalCta, fee, teamSize, tagline, format } = eventInfo;

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section
      id="register"
      className="relative w-full overflow-hidden bg-void py-28 sm:py-36"
    >
      {/* ambient background — echoes the Hero's helix field without copying it */}
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[length:42px_42px] opacity-25" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[42rem] -translate-x-1/2 rounded-full bg-violet/[0.10] blur-[160px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-electric/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-magenta/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-border to-transparent" />

      {/* faint traveling circuit line, consistent animation language with HelixCircuit */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-40 w-full -translate-y-1/2 opacity-40"
      >
        <defs>
          <linearGradient id="ctaStrand" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="#3B6EFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#D6409F" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3B6EFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M -40 100 C 300 20, 500 180, 800 100 C 1000 40, 1200 160, 1480 100"
          stroke="url(#ctaStrand)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M -40 100 C 300 20, 500 180, 800 100 C 1000 40, 1200 160, 1480 100"
          stroke="#F4F5FF"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeDasharray="6 1400"
          className="motion-safe:animate-pulse-travel"
          fill="none"
        />
      </svg>

      <div className="section-shell relative z-10 flex flex-col items-center text-center">
        <motion.p {...fadeUp(0)} className="eyebrow">
          {finalCta.eyebrow} · {format}
        </motion.p>

        <motion.h2
          {...fadeUp(0.08)}
          className="mt-6 max-w-4xl font-display text-[11vw] leading-[0.98] tracking-tight text-ink-primary sm:text-6xl lg:text-[4.2rem]"
        >
          <span className="block">{finalCta.headlineWords[0]}</span>
          <span className="block bg-gradient-to-r from-electric via-violet to-magenta bg-clip-text text-transparent">
            {finalCta.headlineWords[1]}
          </span>
        </motion.h2>

        <motion.div {...fadeUp(0.16)} className="mt-6 flex flex-col items-center gap-1">
          <span className="font-display text-lg tracking-wide text-ink-primary sm:text-xl">
            {eventInfo.name}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted sm:text-sm">
            {format} &middot; {tagline.toUpperCase()}
          </span>
        </motion.div>

        {/* fee + team size — vital stats, not a pricing card */}
        <motion.div
          {...fadeUp(0.24)}
          className="mt-12 flex w-full max-w-xl flex-col gap-4 sm:flex-row sm:gap-5"
        >
          <div className="relative flex-1 overflow-hidden rounded-sm border border-magenta/40 bg-navy/60 px-6 py-6 backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-electric via-violet to-magenta"
            />
            <p className="eyebrow !text-magenta/80">Registration Fee</p>
            <div className="mt-2 flex items-baseline justify-center gap-2 sm:justify-start">
              <span className="font-display text-4xl text-ink-primary sm:text-5xl">
                {fee.amount}
              </span>
              <span className="font-mono text-sm uppercase tracking-[0.2em] text-ink-muted">
                {fee.unit}
              </span>
            </div>
          </div>

          <div className="relative flex-1 overflow-hidden rounded-sm border border-navy-border bg-navy/60 px-6 py-6 backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-electric via-violet to-magenta"
            />
            <p className="eyebrow !text-ink-faint">Team Size</p>
            <div className="mt-2 flex items-center justify-center gap-2 sm:justify-start">
              <Users size={22} strokeWidth={1.75} className="text-ink-muted" aria-hidden="true" />
              <span className="font-display text-4xl text-ink-primary sm:text-5xl">
                {teamSize}
              </span>
              <span className="font-mono text-sm uppercase tracking-[0.2em] text-ink-muted">
                Members
              </span>
            </div>
          </div>
        </motion.div>

        <motion.a
          {...fadeUp(0.32)}
          href={eventLinks.registration}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Register for SHELIX 2026 — opens the official Google Form in a new tab"
          className="btn-primary !mt-14 !px-10 !py-4 !text-base"
        >
          Register Now
          <ArrowUpRight size={18} strokeWidth={2.25} />
        </motion.a>

        <motion.p
          {...fadeUp(0.4)}
          className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint"
        >
          Opens the official SHELIX 2026 registration form
        </motion.p>
      </div>
    </section>
  );
}
