import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { rulesIntro, rulesPhases, mostImportantRule } from "../data/rules.js";

export default function HackathonRules() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const active = rulesPhases[activeIndex];

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        };

  const selectAndFocus = (index) => {
    const wrapped = (index + rulesPhases.length) % rulesPhases.length;
    setActiveIndex(wrapped);
    tabRefs.current[wrapped]?.focus();
  };

  const handleKeyDown = (e, index) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        selectAndFocus(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        selectAndFocus(index - 1);
        break;
      case "Home":
        e.preventDefault();
        selectAndFocus(0);
        break;
      case "End":
        e.preventDefault();
        selectAndFocus(rulesPhases.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <section
      id="rules"
      className="relative w-full overflow-hidden bg-void py-24 sm:py-32"
    >
      {/* ambient background — consistent with the rest of the page */}
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[length:42px_42px] opacity-25" />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-[26rem] w-[26rem] rounded-full bg-electric/[0.07] blur-[150px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-magenta/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-border to-transparent" />

      <div className="section-shell relative z-10">
        <div className="mb-16 flex flex-col gap-4 sm:mb-20">
          <motion.p {...fadeUp(0)} className="eyebrow">
            The 24-Hour Rules
          </motion.p>
          <motion.h2
            {...fadeUp(0.06)}
            className="font-display text-[10vw] leading-[0.96] tracking-tight text-ink-primary sm:text-5xl lg:text-[3.4rem]"
          >
            <span className="block">{rulesIntro.headlineWords[0]}</span>
            <span className="block bg-gradient-to-r from-electric via-violet to-magenta bg-clip-text text-transparent">
              {rulesIntro.headlineWords[1]}
            </span>
          </motion.h2>
          <motion.div {...fadeUp(0.14)} className="flex flex-col">
            {rulesIntro.paragraphLines.map((line) => (
              <p
                key={line}
                className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted sm:text-sm"
              >
                {line}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Before / During tab interface — never hover-only */}
        <motion.div {...fadeUp(0.18)}>
          <div
            role="tablist"
            aria-label="Before and during the hackathon"
            className="mb-6 inline-flex w-full gap-1 rounded-sm border border-navy-border bg-navy/50 p-1.5 backdrop-blur-sm sm:w-auto"
          >
            {rulesPhases.map((phase, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={phase.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`rules-tab-${phase.id}`}
                  aria-selected={isActive}
                  aria-controls={`rules-panel-${phase.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`flex-1 rounded-sm px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-all duration-200 sm:flex-none sm:px-7 ${
                    isActive
                      ? "bg-gradient-to-r from-electric via-violet to-magenta text-void shadow-glow"
                      : "text-ink-muted hover:text-ink-primary"
                  }`}
                >
                  {phase.label}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`rules-panel-${active.id}`}
            aria-labelledby={`rules-tab-${active.id}`}
            tabIndex={0}
            className="relative overflow-hidden rounded-sm border border-navy-border bg-navy/50 p-7 backdrop-blur-sm sm:p-9"
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-electric via-violet to-magenta" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-xs tracking-[0.2em] text-ink-faint">
                  {active.heading}
                </span>
                <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  {active.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-electric to-magenta"
                      />
                      <span className="font-body text-sm leading-relaxed text-ink-muted sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Most important rule — visually dominant warning panel */}
        <motion.div
          {...fadeUp(0.1)}
          className="relative mt-8 overflow-hidden rounded-sm border border-magenta/50 bg-navy/60 p-7 backdrop-blur-sm sm:mt-10 sm:p-10"
        >
          {/* circuit interruption motif */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-magenta to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-magenta/[0.12] blur-[100px]"
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm border border-magenta/50 bg-magenta/[0.08] text-magenta">
              <AlertTriangle size={22} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <p className="eyebrow mb-3 text-magenta/90">Most Important Rule</p>
              <h3 className="font-display text-2xl tracking-tight text-ink-primary sm:text-3xl">
                {mostImportantRule.title}
              </h3>
              <div className="mt-5 flex flex-col gap-3">
                {mostImportantRule.lines.map((line) => (
                  <p
                    key={line}
                    className="max-w-2xl font-body text-sm leading-relaxed text-ink-muted sm:text-base"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
