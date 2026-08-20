# SHELIX 2026 — Website (Phase 5)

Complete landing page: Navbar, Hero, About, Event Snapshot, Innovation
Domains, Hackathon Journey, What You'll Submit, 24-Hour Rules, Final
Registration CTA, Contact, and Footer.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   Navbar, Logo, HelixCircuit (signature background)
  sections/     Hero, EventOverview, EventStats, InnovationDomains,
                HackathonJourney, SubmissionRequirements, HackathonRules,
                RegistrationCTA, Contact, Footer
  data/         eventInfo.js (facts from the official brochure/PDF)
                eventLinks.js (single source of truth for Registration
                and Instagram URLs — used everywhere instead of
                hardcoded links)
                contactInfo.js (contact directory — placeholders until
                official coordinator details are supplied)
  index.css     design tokens / global styles
```

## Notes

- All event facts (dates, venue, fee, eligibility) are pulled from
  `src/data/eventInfo.js`, sourced directly from the SHELIX 2026
  brochure and guidelines PDF you provided.
- Registration and Instagram links live in `src/data/eventLinks.js`.
  Update them there if they ever change.
- Animations respect `prefers-reduced-motion`.
