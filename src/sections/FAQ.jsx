import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "../data/faqs.js";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden bg-void py-24 sm:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[length:42px_42px] opacity-25" />

      <div className="pointer-events-none absolute -right-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-electric/[0.07] blur-[150px]" />

      <div className="pointer-events-none absolute -left-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-magenta/[0.07] blur-[140px]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-border to-transparent" />

      <div className="section-shell relative z-10">
        {/* Heading */}
        <div className="mb-12 max-w-3xl sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            Need To Know
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display text-[10vw] leading-[0.96] tracking-tight text-ink-primary sm:text-5xl lg:text-[3.4rem]"
          >
            FREQUENTLY
            <span className="block bg-gradient-to-r from-electric via-violet to-magenta bg-clip-text text-transparent">
              ASKED.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 max-w-2xl font-body text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            Everything you need to know before you build.
          </motion.p>
        </div>

        {/* FAQ list */}
        <div className="mx-auto max-w-4xl">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.04,
                }}
                className="border-b border-navy-border"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg tracking-tight text-ink-primary transition-colors duration-200 hover:text-electric sm:text-xl">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm border border-navy-border text-ink-muted transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-magenta/50 text-magenta"
                        : ""
                    }`}
                  >
                    <Plus size={18} strokeWidth={1.75} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-6 pr-12 font-body text-sm leading-relaxed text-ink-muted sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}   