import { motion, useReducedMotion } from "framer-motion";
import { Instagram, Mail, Phone, Users, ArrowUpRight } from "lucide-react";
import { contactIntro, contactChannels } from "../data/contactInfo.js";
import { eventLinks } from "../data/eventLinks.js";

export default function Contact() {
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

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-void py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[length:42px_42px] opacity-25" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-[24rem] w-[24rem] rounded-full bg-electric/[0.07] blur-[150px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-border to-transparent" />

      <div className="section-shell relative z-10 grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        {/* Left — intro */}
        <div>
          <motion.p {...fadeUp(0)} className="eyebrow">
            Contact
          </motion.p>
          <motion.h2
            {...fadeUp(0.06)}
            className="mt-5 font-display text-[11vw] leading-[0.96] tracking-tight text-ink-primary sm:text-5xl lg:text-[3.4rem]"
          >
            <span className="block">{contactIntro.headlineWords[0]}</span>
            <span className="block bg-gradient-to-r from-electric via-violet to-magenta bg-clip-text text-transparent">
              {contactIntro.headlineWords[1]}
            </span>
          </motion.h2>
          <motion.p
            {...fadeUp(0.14)}
            className="mt-6 max-w-md font-body text-sm leading-relaxed text-ink-muted sm:text-base"
          >
            {contactIntro.paragraph}
          </motion.p>

          <motion.a
            {...fadeUp(0.2)}
            href={eventLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow SHELIX 2026 on Instagram — opens in a new tab"
            className="mt-8 inline-flex items-center gap-2.5 rounded-sm border border-navy-border px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted transition-colors duration-200 hover:border-magenta/60 hover:text-magenta"
          >
            <Instagram size={16} strokeWidth={1.75} aria-hidden="true" />
            Follow SHELIX
          </motion.a>
        </div>

        {/* Right — contact directory */}
        <motion.ul {...fadeUp(0.16)} className="flex flex-col gap-3">
          {contactChannels.map((channel) => {
            const href = channel.email
              ? `mailto:${channel.email}`
              : channel.phone
              ? `tel:${channel.phone}`
              : null;
            const displayValue =
              channel.email || channel.phone || channel.placeholder || "Details coming soon";
            const hasPeople = Array.isArray(channel.people) && channel.people.length > 0;
            const isPlaceholder = !channel.email && !channel.phone && !hasPeople;
            const Icon = hasPeople ? Users : channel.phone && !channel.email ? Phone : Mail;

            const valueContent = hasPeople ? (
              <span className="mt-1 flex flex-col gap-1 font-body text-sm text-ink-primary sm:text-base">
                {channel.people.map((person, index) => (
                  <span key={person}>
                    {person}
                    {index < channel.people.length - 1 ? "," : ""}
                  </span>
                ))}
              </span>
            ) : (
              <span
                className={`mt-0.5 ${
                  isPlaceholder
                    ? "font-mono text-xs uppercase tracking-[0.1em] text-ink-faint sm:text-sm"
                    : "font-body text-sm text-ink-primary sm:text-base"
                }`}
              >
                {displayValue}
              </span>
            );

            return (
              <li key={channel.id}>
                {href ? (
                  <a
                    href={href}
                    className="group flex items-center justify-between gap-4 rounded-sm border border-navy-border bg-navy/50 px-6 py-5 backdrop-blur-sm transition-colors duration-200 hover:border-electric/50"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm border border-navy-border text-ink-muted transition-colors group-hover:border-electric/60 group-hover:text-electric">
                        <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                          {channel.label}
                        </span>
                        {valueContent}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2}
                      className="flex-shrink-0 text-ink-faint transition-colors group-hover:text-electric"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <div className="flex items-center justify-between gap-4 rounded-sm border border-dashed border-navy-border bg-navy/30 px-6 py-5">
                    <span className="flex items-center gap-4">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm border border-navy-border text-ink-faint">
                        <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                          {channel.label}
                        </span>
                        {valueContent}
                      </span>
                    </span>
                    {isPlaceholder && (
                      <span className="flex-shrink-0 rounded-sm border border-navy-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint">
                        TBA
                      </span>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
