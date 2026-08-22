import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { eventInfo } from "../data/eventInfo.js";

// Fixed bento placement for the five snapshot stats, in data order:
// [Hours, Team Members, Per Person (emphasis), Innovation Domains, Level]
const CARD_SPAN = [
  "sm:col-span-1 lg:col-span-2 lg:row-start-1",
  "sm:col-span-1 lg:col-span-2 lg:row-start-1",
  "sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:row-start-1",
  "sm:col-span-1 lg:col-span-2 lg:row-start-2",
  "sm:col-span-1 lg:col-span-2 lg:row-start-2",
];

function CountUpValue({ target, prefix = "", reduceMotion }) {
  const [value, setValue] = useState(reduceMotion ? target : 0);
  const started = useRef(false);

  const start = () => {
    if (started.current || reduceMotion) return;

    started.current = true;

    const duration = 1200;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    start();
  }, [target, reduceMotion]);

  return (
    <motion.span>
      {prefix}
      {value}
    </motion.span>
  );
}

export default function EventStats() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section
      id="snapshot"
      className="relative w-full overflow-hidden bg-void py-24 sm:py-32"
    >
      {/* ambient background, consistent with the rest of the page */}
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[length:42px_42px] opacity-25" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-electric/[0.06] blur-[160px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-border to-transparent" />

      <div className="section-shell relative z-10">
        <div className="mb-14 flex flex-col gap-3 sm:mb-16">
          <motion.p {...fadeUp(0)} className="eyebrow">
            Event Snapshot
          </motion.p>
          <motion.h2
            {...fadeUp(0.06)}
            className="font-display text-4xl tracking-tight text-ink-primary sm:text-5xl lg:text-6xl"
          >
            At a Glance
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6 lg:grid-rows-2">
          {eventInfo.stats.map((stat, i) => {
            const isEmphasis = Boolean(stat.emphasis);

            return (
              <motion.div
                key={stat.label}
                {...fadeUp(0.08 + i * 0.06)}
                className={`relative flex flex-col justify-between overflow-hidden rounded-sm border p-6 backdrop-blur-sm sm:p-7 ${CARD_SPAN[i]} ${
                  isEmphasis
                    ? "border-magenta/40 bg-gradient-to-br from-electric/10 via-violet/10 to-magenta/15 shadow-glow-pink"
                    : "border-navy-border bg-navy/50"
                }`}
              >
                {/* top accent line */}
                <span
                  className={`absolute inset-x-0 top-0 h-px ${
                    isEmphasis
                      ? "bg-gradient-to-r from-electric via-violet to-magenta"
                      : "bg-navy-border"
                  }`}
                />

                <p
                  className={`eyebrow ${
                    isEmphasis ? "!text-magenta/80" : "!text-ink-faint"
                  }`}
                >
                  {stat.label}
                </p>

                <p
                  className={`mt-6 font-display leading-none text-ink-primary ${
                    isEmphasis
                      ? "text-6xl sm:text-7xl lg:text-8xl"
                      : "text-4xl sm:text-5xl"
                  }`}
                >
                  {stat.isText ? (
                    stat.value
                  ) : (
                    <CountUpValue
                      target={stat.value}
                      prefix={stat.prefix ?? ""}
                      reduceMotion={reduceMotion}
                    />
                  )}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
