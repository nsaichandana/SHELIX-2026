// Contact directory for SHELIX 2026.
//
// IMPORTANT: no official coordinator names, email addresses or phone
// numbers were present anywhere in the supplied Phase 1–4 project /
// source material. Each channel below is therefore a clearly-marked
// editable placeholder — do not replace these with invented details.
//
// To wire up a real channel once official info is available, just set
// `email` and/or `phone` on that entry. Contact.jsx already renders a
// clickable mailto:/tel: link automatically whenever one is present,
// and falls back to the placeholder label otherwise.

export const contactIntro = {
  headlineWords: ["LET'S", "CONNECT."],
  paragraph:
    "For anything related to SHELIX 2026 — registration, teams, domains, or on-the-day logistics — reach out through the official channels below.",
};

export const contactChannels = [
  {
    id: "general",
    label: "General Enquiries",
    email: "shelix2026official@gmail.com",
    phone: null,
  },
  {
    id: "registration",
    label: "Registration Support",
    email: null,
    phone: "+91 8106899722, +91 77367 99312",
  },
  {
    id: "student",
    label: "Student Coordinators",
    email: null,
    phone: null,
    people: [
      "Ms. Norah Ann John",
      "Ms. Saichandana",
      "Ms. Nithyashree Rama",
      "Mr. Mohammed Ayyan",
      "Mr. Muthukumar",
      "Mr. Midhun Oliver",
      "Mr. Andrew J",
      "Mr. Anson T Anil"
    ],
  },

  {
    id: "faculty",
    label: "Faculty Coordinators",
    email: null,
    phone: null,
    people: [
      "Dr. A. Deepa",
      "Dr. Kishore Raaj S",
      "Dr. C. Geetha",
      "Dr. L. S. Beschi",
      "Dr. Jenzin Joshua",
      "Ms. Krishna .R"
    ]
  },
];
