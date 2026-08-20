import { motion, useReducedMotion } from "framer-motion";
import { submissionsIntro, submissionItems } from "../data/submissions.js";

export default function SubmissionRequirements() {
  const reduceMotion = useReducedMotion();
  const count = submissionItems.length;

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
      id="submissions"
      className="relative w-full overflow-hidden bg-void py-24 sm:py-32"
    >
      {/* ambient background — consistent with the rest of the page */}
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[length:42px_42px] opacity-25" />
      <div className="pointer-events-none absolute -left-24 top-0 h-[26rem] w-[26rem] rounded-full bg-violet/[0.08] blur-[150px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[24rem] w-[24rem] rounded-full bg-magenta/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-border to-transparent" />

      <div className="section-shell relative z-10">
        <div className="mb-16 flex flex-col gap-4 sm:mb-20">
          <motion.p {...fadeUp(0)} className="eyebrow">
            The Submission Package
          </motion.p>
          <motion.h2
            {...fadeUp(0.06)}
            className="font-display text-[10vw] leading-[0.96] tracking-tight text-ink-primary sm:text-5xl lg:text-[3.4rem]"
          >
            {submissionsIntro.headlineWords.map((word, i) => (
              <span
                key={word}
                className={
                  i === submissionsIntro.headlineWords.length - 1
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
            {submissionsIntro.paragraph}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.4fr] lg:gap-8">
          {/* Hub — the assembled solution package */}
          <motion.div
            {...fadeUp(0.1)}
            className="relative order-1 flex flex-col justify-between overflow-hidden rounded-sm border border-navy-border bg-navy/50 p-7 backdrop-blur-sm sm:p-9 lg:sticky lg:top-28 lg:order-1 lg:self-start"
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-electric via-violet to-magenta" />
            {/* circuit corner accent */}
            <svg
              aria-hidden="true"
              viewBox="0 0 120 120"
              className="pointer-events-none absolute -bottom-4 -right-4 h-32 w-32 text-navy-border"
            >
              <path d="M120 40 H70 V0" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M120 80 H90 V120" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="70" cy="40" r="3" fill="currentColor" />
              <circle cx="90" cy="80" r="3" fill="currentColor" />
            </svg>

            <div className="relative">
              <span className="font-mono text-xs tracking-[0.2em] text-ink-faint">
                FINAL SUBMISSION
              </span>
              <h3 className="mt-5 font-display text-3xl leading-tight tracking-tight text-ink-primary sm:text-4xl">
                THE SOLUTION
              </h3>
              <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ink-muted sm:text-base">
                Every team assembles these {count} components into one
                complete, presentable submission.
              </p>
            </div>

            <div className="relative mt-10 flex items-center gap-4 border-t border-navy-border pt-6">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm border border-magenta/50 bg-white/[0.03] font-mono text-sm text-magenta">
                {String(count).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
                Required
                <br />
                Components
              </span>
            </div>
          </motion.div>

          {/* Stack — numbered components feeding into the solution */}
          <ol className="relative order-2 flex flex-col rounded-sm border border-navy-border bg-navy/50 p-2 backdrop-blur-sm sm:p-3 lg:order-2">
            {submissionItems.map((item, i) => (
              <motion.li key={item.id} {...fadeUp(0.05 * i)} className="relative">
                <div
                  className={`group flex items-start gap-4 rounded-sm border border-transparent px-4 py-4 transition-colors duration-200 hover:border-navy-border hover:bg-white/[0.02] sm:px-5 sm:py-5 ${
                    i !== submissionItems.length - 1
                      ? "border-b-navy-border/60"
                      : ""
                  }`}
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm border border-navy-border bg-white/[0.03] font-mono text-xs tracking-[0.05em] text-ink-faint transition-colors duration-200 group-hover:border-magenta/50 group-hover:text-magenta">
                    {item.stage}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="font-display text-base tracking-tight text-ink-primary sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-md font-body text-sm leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
                {i !== submissionItems.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mx-5 block h-px bg-navy-border/60"
                  />
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
