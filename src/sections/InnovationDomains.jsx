import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { domains } from "../data/domains.js";
import { eventInfo } from "../data/eventInfo.js";
import { eventLinks } from "../data/eventLinks.js";

export default function InnovationDomains() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);

  const active = domains[activeIndex];
  const ActiveIcon = active.icon;
  const { headlineWords, paragraph } = eventInfo.domainsIntro;

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        };

  // Roving-tabindex keyboard support for the vertical tablist.
  const selectAndFocus = (index) => {
    const wrapped = (index + domains.length) % domains.length;
    setActiveIndex(wrapped);
    tabRefs.current[wrapped]?.focus();
  };

  const handleKeyDown = (e, index) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        selectAndFocus(index + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        selectAndFocus(index - 1);
        break;
      case "Home":
        e.preventDefault();
        selectAndFocus(0);
        break;
      case "End":
        e.preventDefault();
        selectAndFocus(domains.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <section
      id="domains"
      className="relative w-full overflow-hidden bg-void py-24 sm:py-32"
    >
      {/* ambient background — consistent with the rest of the page */}
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[length:42px_42px] opacity-25" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-magenta/[0.08] blur-[150px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-electric/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-border to-transparent" />

      <div className="section-shell relative z-10">
        <div className="mb-14 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div>
            <motion.p {...fadeUp(0)} className="eyebrow mb-4">
              Innovation Domains
            </motion.p>
            <motion.h2
              {...fadeUp(0.06)}
              className="font-display text-[10vw] leading-[0.96] tracking-tight text-ink-primary sm:text-5xl lg:text-[3.4rem]"
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
          </div>

          <motion.p
            {...fadeUp(0.14)}
            className="max-w-sm font-body text-base leading-relaxed text-ink-muted sm:text-lg lg:text-right"
          >
            {paragraph}
          </motion.p>
        </div>

        <motion.div
          {...fadeUp(0.18)}
          className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.15fr] lg:gap-6"
        >
          {/* Stage — selected domain detail */}
          <div
            role="tabpanel"
            id="domain-panel"
            aria-labelledby={`domain-tab-${active.id}`}
            tabIndex={0}
            className="relative order-2 flex min-h-[22rem] flex-col overflow-hidden rounded-sm border border-navy-border bg-navy/50 p-7 backdrop-blur-sm sm:p-9 lg:order-1"
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-electric via-violet to-magenta" />
            {/* faint circuit corner accent */}
            <svg
              aria-hidden="true"
              viewBox="0 0 120 120"
              className="pointer-events-none absolute -bottom-4 -right-4 h-32 w-32 text-navy-border"
            >
              <path
                d="M120 40 H70 V0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M120 80 H90 V120"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="70" cy="40" r="3" fill="currentColor" />
              <circle cx="90" cy="80" r="3" fill="currentColor" />
            </svg>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-full flex-col"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-ink-faint">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(domains.length).padStart(2, "0")}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-sm border border-navy-border bg-white/[0.03] text-electric">
                    <ActiveIcon size={22} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>

                <h3 className="mt-8 font-display text-3xl leading-tight tracking-tight text-ink-primary sm:text-4xl">
                  {active.name}
                </h3>

                <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-ink-muted sm:text-base">
                  {active.description}
                </p>

                <div className="mt-auto pt-10">
                  <a
                    href={eventLinks.registration}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-primary transition-colors hover:text-magenta"
                  >
                    Register for SHELIX
                    <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* List — all 11 domains, keyboard-navigable */}
          <div
            role="tablist"
            aria-label="Innovation domains"
            aria-orientation="vertical"
            className="order-1 flex flex-col gap-1 rounded-sm border border-navy-border bg-navy/50 p-2 backdrop-blur-sm sm:p-3 lg:order-2"
          >
            {domains.map((domain, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={domain.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`domain-tab-${domain.id}`}
                  aria-selected={isActive}
                  aria-controls="domain-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`group flex items-center gap-4 rounded-sm border px-4 py-3.5 text-left transition-all duration-200 sm:px-5 ${
                    isActive
                      ? "border-magenta/50 bg-white/[0.05]"
                      : "border-transparent hover:border-navy-border hover:bg-white/[0.02]"
                  }`}
                >
                  <span
                    className={`font-mono text-xs tracking-[0.1em] ${
                      isActive ? "text-magenta" : "text-ink-faint"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-display text-base tracking-tight sm:text-lg ${
                      isActive
                        ? "text-ink-primary"
                        : "text-ink-muted group-hover:text-ink-primary"
                    }`}
                  >
                    {domain.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors duration-200 ${
                      isActive ? "bg-magenta" : "bg-navy-border"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
