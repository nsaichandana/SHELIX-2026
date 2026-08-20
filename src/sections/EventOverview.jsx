import { motion, useReducedMotion } from "framer-motion";
import { eventInfo } from "../data/eventInfo.js";

export default function EventOverview() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        };

  const { headlineWords, paragraphs, highlights, presentedBy, association } =
    eventInfo.about;

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-void py-24 sm:py-32"
    >
      {/* ambient background — quieter continuation of the Hero's material language */}
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[length:42px_42px] opacity-30" />
      <div className="pointer-events-none absolute -right-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-violet/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-electric/[0.08] blur-[130px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-border to-transparent" />

      <div className="section-shell relative z-10">
        <motion.p {...fadeUp(0)} className="eyebrow mb-4">
          About SHELIX
        </motion.p>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          {/* Left — large stacked editorial headline */}
          <motion.h2
            {...fadeUp(0.06)}
            className="font-display text-[13vw] leading-[0.94] tracking-tight text-ink-primary sm:text-6xl lg:text-[4.6rem]"
          >
            {headlineWords.map((word, i) => (
              <span
                key={word}
                className={
                  i === headlineWords.length - 1
                    ? "block bg-gradient-to-r from-electric via-violet to-magenta bg-clip-text text-transparent"
                    : "block"
                }
              >
                {word}
              </span>
            ))}
          </motion.h2>

          {/* Right — copy, highlights, branding */}
          <div className="flex flex-col gap-9">
            <motion.div {...fadeUp(0.14)} className="flex max-w-xl flex-col gap-4">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-body text-base leading-relaxed text-ink-muted sm:text-lg"
                >
                  {p}
                </p>
              ))}
            </motion.div>

            <motion.ul
              {...fadeUp(0.22)}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-sm border border-navy-border bg-navy/50 px-4 py-3.5 backdrop-blur-sm transition-colors duration-200 hover:border-electric/50"
                >
                  <span className="font-mono text-[11px] uppercase leading-snug tracking-[0.14em] text-ink-primary sm:text-xs">
                    {h}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-col gap-1 border-t border-navy-border pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint sm:text-xs"
            >
              <span>{presentedBy}</span>
              <span className="text-ink-muted">{association}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
