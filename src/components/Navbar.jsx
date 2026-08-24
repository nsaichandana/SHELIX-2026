import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Instagram, ArrowUpRight } from "lucide-react";
import { eventInfo } from "../data/eventInfo.js";
import { eventLinks } from "../data/eventLinks.js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setActive(href);
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-void/85 backdrop-blur-md border-b border-navy-border shadow-[0_1px_0_0_rgba(139,92,246,0.15)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="section-shell flex h-20 items-center justify-between"
      >
    <a
        href="#home"
        onClick={(e) => handleNavClick(e, "#home")}
        className="flex items-center"
      >
      <img
        src="/sathyabama logo.jpeg"
        alt="Sathyabama Institute of Science and Technology"
        className="h-14 w-auto object-contain"
      />
    </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {eventInfo.navLinks
            .filter((l) => l.label !== "Register")
            .map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={active === link.href ? "page" : undefined}
                  className={`relative font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-200 hover:text-ink-primary ${
                    active === link.href ? "text-ink-primary" : "text-ink-muted"
                  } after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:bg-gradient-to-r after:from-electric after:to-magenta after:transition-all after:duration-300 ${
                    active === link.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={eventLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SHELIX 2026 on Instagram"
            className="rounded-sm border border-navy-border p-2 text-ink-muted transition-colors hover:border-magenta/60 hover:text-magenta"
          >
            <Instagram size={17} strokeWidth={1.75} />
          </a>
          <a
            href={eventLinks.registration}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !px-5 !py-2.5 !text-xs"
          >
            Register
            <ArrowUpRight size={15} strokeWidth={2} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex items-center justify-center rounded-sm border border-navy-border p-2 text-ink-primary lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-navy-border bg-void/97 backdrop-blur-md lg:hidden"
          >
            <ul className="section-shell flex flex-col gap-1 py-6">
              {eventInfo.navLinks
                .filter((l) => l.label !== "Register")
                .map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block py-3 font-mono text-sm uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-ink-primary"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              <li className="mt-4 flex items-center gap-3">
                <a
                  href={eventLinks.registration}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1"
                  onClick={() => setOpen(false)}
                >
                  Register
                  <ArrowUpRight size={15} strokeWidth={2} />
                </a>
                <a
                  href={eventLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SHELIX 2026 on Instagram"
                  className="rounded-sm border border-navy-border p-3.5 text-ink-muted hover:border-magenta/60 hover:text-magenta"
                >
                  <Instagram size={18} strokeWidth={1.75} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
