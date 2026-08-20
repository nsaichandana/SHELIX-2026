import { Instagram } from "lucide-react";
import Logo from "../components/Logo.jsx";
import { eventInfo } from "../data/eventInfo.js";
import { eventLinks } from "../data/eventLinks.js";

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-navy-border bg-void">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[length:42px_42px] opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-border to-transparent" />

      <div className="section-shell relative z-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center gap-2.5"
            >
              <Logo className="h-8 w-8" />
              <span className="font-display text-lg tracking-wide text-ink-primary">
                SHELIX <span className="text-magenta">2026</span>
              </span>
            </a>
            <p className="max-w-xs font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-ink-muted">
              {eventInfo.tagline}
            </p>
            <a
              href={eventLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SHELIX 2026 on Instagram — opens in a new tab"
              className="mt-1 inline-flex w-fit items-center gap-2 rounded-sm border border-navy-border p-2.5 text-ink-muted transition-colors hover:border-magenta/60 hover:text-magenta"
            >
              <Instagram size={16} strokeWidth={1.75} />
            </a>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <p className="eyebrow mb-5">Navigate</p>
            <ul className="flex flex-col gap-3">
              {eventInfo.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-ink-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Organization */}
          <div>
            <p className="eyebrow mb-5">Presented By</p>
            <div className="flex flex-col gap-1.5 font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-ink-muted">
              <span className="text-ink-primary">
                {eventInfo.about.presentedBy}
              </span>
              <span>{eventInfo.about.association}</span>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-navy-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            © 2026 SHELIX. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            {eventInfo.dateDisplay} &middot; {eventInfo.venue.hall}, {eventInfo.venue.building}
          </p>
        </div>
      </div>
    </footer>
  );
}
