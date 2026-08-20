// Official 24-hour rules for SHELIX 2026.
// Sourced directly from the Phase 4 brief — do not invent additional rules.

export const rulesIntro = {
  headlineWords: ["BUILD WITHIN", "THE CLOCK."],
  paragraphLines: [
    "THE IDEA CAN START BEFORE.",
    "THE SOLUTION MUST BE BUILT DURING THE HACKATHON.",
  ],
};

export const rulesPhases = [
  {
    id: "before",
    label: "Before the Hackathon",
    heading: "PARTICIPANTS MAY",
    items: [
      "Research their selected problem/domain.",
      "Discuss ideas within their team.",
      "Identify technologies and tools.",
      "Prepare laptops and development environments.",
      "Review relevant domain knowledge.",
    ],
  },
  {
    id: "during",
    label: "During the Hackathon",
    heading: "SOLUTION DEVELOPMENT MAY INCLUDE",
    items: [
      "Problem analysis",
      "Ideation",
      "Solution design",
      "Architecture",
      "Coding",
      "Prototype development",
      "Testing",
      "Business model development",
      "Pitch preparation",
      "Final demonstration",
    ],
  },
];

export const mostImportantRule = {
  title: "NO PRE-BUILT PROJECTS.",
  lines: [
    "Teams must not develop or substantially complete their project before the hackathon begins.",
    "The hackathon work itself must happen during the official 24-hour period.",
    "Existing libraries, frameworks, APIs, open-source packages and development tools are allowed unless specifically restricted by the organizers.",
    "Violations may result in disqualification.",
  ],
};
