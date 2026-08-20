import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { journeyIntro, journeyStages } from "../data/journey.js";

export default function HackathonJourney() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.7", "end 0.35"],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(lineProgress, "change", (v) => {
    if (reduceMotion) return;
    const idx = Math.min(
      journeyStages.length - 1,
      Math.max(0, Math.floor(v * journeyStages.length))
    );
    setActiveIndex(idx);
  });

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
      id="journey"
      className="relative w-full overflow-hidden bg-void py-24 sm:py-32"
    >
      {/* ambient background — consistent with the rest of the page */}
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[length:42px_42px] opacity-25" />
      <div className="pointer-events-none absolute -right-24 top-0 h-[26rem] w-[26rem] rounded-full bg-electric/[0.07] blur-[150px]" />
      <div className="pointer-events-none absolute -left-32 bottom-1/4 h-[24rem] w-[24rem] rounded-full bg-violet/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-border to-transparent" />

      <div className="section-shell relative z-10">
        <div className="mb-16 flex flex-col gap-4 sm:mb-20">
          <motion.p {...fadeUp(0)} className="eyebrow">
            The Journey
          </motion.p>
          <motion.h2
            {...fadeUp(0.06)}
            className="font-display text-[10vw] leading-[0.96] tracking-tight text-ink-primary sm:text-5xl lg:text-[3.4rem]"
          >
            {journeyIntro.headlineWords.map((word, i) => (
              <span
                key={word}
                className={
                  i === journeyIntro.headlineWords.length - 1
                    ? "block bg-gradient-to-r from-electric via-violet to-magenta bg-clip-text text-transparent"
                    : "block"
                }
              >
                {word}
              </span>
            ))}
          </motion.h2>
          <motion.p
            {...fadeUp(0.14)}
            className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted sm:text-sm"
          >
            {journeyIntro.paragraph}
          </motion.p>
        </div>

        {/* Desktop / tablet-landscape — connected horizontal progression */}
        <div ref={trackRef} className="hidden lg:block">
          <ol className="relative grid grid-cols-6 gap-4">
            {/* connecting circuit line, sits behind the stage nodes */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 top-[27px] h-[4px]"
            >
              <svg
                viewBox="0 0 1200 4"
                preserveAspectRatio="none"
                className="h-full w-full overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="journeyLineGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#3B6EFF" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#D6409F" />
                  </linearGradient>
                </defs>
                <line
                  x1="0"
                  y1="2"
                  x2="1200"
                  y2="2"
                  stroke="#232B5C"
                  strokeWidth="2"
                />
                <motion.line
                  x1="0"
                  y1="2"
                  x2="1200"
                  y2="2"
                  stroke="url(#journeyLineGradient)"
                  strokeWidth="2"
                  strokeDasharray="1 1"
                  strokeDashoffset="0"
                  style={{ pathLength: reduceMotion ? 1 : lineProgress }}
                />
              </svg>
            </div>

            {journeyStages.map((s, i) => {
              const isActive = i <= activeIndex;
              return (
                <motion.li key={s.id} {...fadeUp(0.06 * i)} className="relative">
                  <span
                    className={`relative z-10 flex h-[56px] w-[56px] items-center justify-center rounded-full border font-mono text-sm tracking-[0.05em] transition-all duration-300 ${
                      isActive
                        ? "border-magenta/60 bg-navy text-ink-primary shadow-glow-pink"
                        : "border-navy-border bg-navy/70 text-ink-faint"
                    }`}
                  >
                    {s.stage}
                  </span>
                  <h3
                    className={`mt-5 font-display text-lg tracking-tight transition-colors duration-300 ${
                      isActive ? "text-ink-primary" : "text-ink-muted"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-2 pr-2 font-body text-sm leading-relaxed text-ink-muted">
                    {s.description}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Mobile / tablet-portrait — vertical timeline */}
        <ol className="relative flex flex-col lg:hidden">
          {journeyStages.map((s, i) => (
            <motion.li
              key={s.id}
              {...fadeUp(0.05 * i)}
              className="relative flex gap-5 pb-10 last:pb-0"
            >
              {i !== journeyStages.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[27px] top-[56px] h-[calc(100%-40px)] w-px bg-gradient-to-b from-navy-border to-navy-border/20"
                />
              )}
              <span className="relative z-10 flex h-[56px] w-[56px] flex-shrink-0 items-center justify-center rounded-full border border-magenta/40 bg-navy font-mono text-sm tracking-[0.05em] text-ink-primary">
                {s.stage}
              </span>
              <div className="pt-2">
                <h3 className="font-display text-lg tracking-tight text-ink-primary sm:text-xl">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-ink-muted">
                  {s.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
