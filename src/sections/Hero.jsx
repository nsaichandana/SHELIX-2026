import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Instagram } from "lucide-react";
import HelixCircuit from "../components/HelixCircuit.jsx";
import { eventInfo } from "../data/eventInfo.js";
import { eventLinks } from "../data/eventLinks.js";

const readout = [
  { label: "Format", value: eventInfo.format },
  { label: "Date", value: eventInfo.dateDisplay },
  {
    label: "Venue",
    value: `${eventInfo.venue.hall}, ${eventInfo.venue.building}`,
  },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        };

  const scrollToDomains = (e) => {
    e.preventDefault();
    const el = document.querySelector("#domains");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-void pt-28 pb-20 sm:pt-32"
    >
      <HelixCircuit />

      <div className="section-shell relative z-10 grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* Left: primary content */}
        <div className="max-w-2xl">
          <motion.p {...fadeUp(0)} className="eyebrow mb-6">
            {eventInfo.organizer}
          </motion.p>

          <motion.h1
            {...fadeUp(0.08)}
            className="font-display text-[15vw] leading-[0.95] tracking-tight text-ink-primary sm:text-6xl md:text-7xl lg:text-[5.2rem]"
          >
            SHELIX
            <span className="bg-gradient-to-r from-electric via-violet to-magenta bg-clip-text text-transparent">
              {" "}
              2026
            </span>
          </motion.h1>

          <motion.h2
            {...fadeUp(0.16)}
            className="mt-5 max-w-xl font-body text-lg font-medium text-ink-muted sm:text-xl"
          >
            {eventInfo.tagline}
          </motion.h2>

          <motion.div
            {...fadeUp(0.24)}
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint sm:text-sm"
          >
            {eventInfo.taglineWords.map((word, i) => (
              <span key={word} className="flex items-center gap-3">
                <span className="text-ink-muted">{word}</span>
                {i < eventInfo.taglineWords.length - 1 && (
                  <span className="text-magenta">•</span>
                )}
              </span>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp(0.32)}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href={eventLinks.registration}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Register Now
              <ArrowUpRight size={16} strokeWidth={2.25} />
            </a>
            <a href="#domains" onClick={scrollToDomains} className="btn-secondary">
              Explore Domains
              <ChevronDown size={16} strokeWidth={2.25} />
            </a>
          </motion.div>

          <motion.a
            {...fadeUp(0.4)}
            href={eventLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-magenta"
          >
            <Instagram size={15} strokeWidth={1.75} />
            Follow @shelix_2026
          </motion.a>
        </div>

        {/* Right: data readout / event badge panel */}
        <motion.aside
          {...fadeUp(0.3)}
          aria-label="Key event details"
          className="relative w-full max-w-md justify-self-start lg:justify-self-end"
        >
          <div className="relative rounded-sm border border-navy-border bg-navy/70 p-7 backdrop-blur-md sm:p-8">
            <div className="absolute -inset-px -z-10 rounded-sm bg-gradient-to-br from-electric/25 via-violet/15 to-magenta/25 opacity-40 blur-lg" />

            <p className="eyebrow mb-5 !text-ink-faint">Event Details</p>

            <dl className="flex flex-col gap-5">
              {readout.map((item) => (
                <div key={item.label} className="border-b border-navy-border pb-5 last:border-b-0 last:pb-0">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-lg text-ink-primary sm:text-xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Entry fee — treated as a vital event stat, not a price tag */}
            <div className="relative mt-7 overflow-hidden rounded-sm border border-magenta/40 bg-gradient-to-br from-electric/10 via-violet/10 to-magenta/15 px-6 py-5">
              <p className="eyebrow !text-magenta/80">Entry</p>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="font-display text-4xl text-ink-primary sm:text-5xl">
                  {eventInfo.fee.amount}
                </span>
                <span className="font-mono text-sm uppercase tracking-[0.2em] text-ink-muted">
                  {eventInfo.fee.unit}
                </span>
              </div>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                {eventInfo.eligibility}
              </p>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* scroll cue */}
      <motion.button
        {...fadeUp(0.6)}
        type="button"
        onClick={scrollToDomains}
        aria-label="Scroll to Domains section"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint transition-colors hover:text-ink-muted sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown
          size={16}
          className="motion-safe:animate-bounce"
          strokeWidth={1.75}
        />
      </motion.button>
    </section>
  );
}
