/**
 * REPLACEABLE STAND-IN.
 * Swap a title or summary without changing page code.
 * published is the switch: false omits that offering, its plane, and its beat.
 * Do not reuse the names Technology Services, Business Services, or Consulting.
 * No verified client, metric, or result belongs here.
 */
export type Offering = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly published: boolean;
  readonly replaceable: true;
};

export const solutionsStandIn = {
  replaceable: true,
  intro: "A few ways the work can be shaped.",
  description: "Sample offerings for platform work, operations, and advice.",
} as const;

export const offerings: readonly Offering[] = [
  {
    slug: "platform-delivery",
    title: "Platform delivery",
    summary: "Building or replacing a system an organization already relies on.",
    published: true,
    replaceable: true,
  },
  {
    slug: "operating-rhythm",
    title: "Operating rhythm",
    summary: "Making weekly work and handoffs visible.",
    published: true,
    replaceable: true,
  },
  {
    slug: "decision-support",
    title: "Decision support",
    summary: "Advice that ends in a choice the organization can explain.",
    published: true,
    replaceable: true,
  },
];

export function getPublishedOfferings(): readonly Offering[] {
  return offerings.filter(
    (offering) => offering.published && offering.title.trim().length > 0,
  );
}
