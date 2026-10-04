/**
 * REPLACEABLE STAND-IN for the summaries only.
 * The three names are the service labels. Swap a summary without changing page code.
 * These notes are not verified results.
 */
export type ServiceLine = {
  readonly id: string;
  readonly name: string;
  readonly summary: string;
  readonly replaceable: true;
};

export const servicesStandIn = {
  replaceable: true,
  intro: "Three lines of work, each with a short sample note.",
  description: "Technology Services, Business Services, and Consulting.",
} as const;

export const serviceLines = [
  {
    id: "technology-services",
    name: "Technology Services",
    summary: "Systems, software, and the care of what is already running.",
    replaceable: true,
  },
  {
    id: "business-services",
    name: "Business Services",
    summary: "The routines that keep delivery and handoff visible.",
    replaceable: true,
  },
  {
    id: "consulting",
    name: "Consulting",
    summary: "A directed engagement with one question and a clear stop.",
    replaceable: true,
  },
] as const satisfies readonly ServiceLine[];
