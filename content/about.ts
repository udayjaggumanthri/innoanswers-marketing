/**
 * REPLACEABLE STAND-IN.
 * Swap a beat or the proof line without changing page code.
 * published is the switch: false omits that beat and shortens the chamber.
 * The proof line is fictional. No real person, client, address, or result.
 */
export type AboutBeatId = "who" | "think" | "work" | "believe" | "why";

export type AboutBeat = {
  readonly id: AboutBeatId;
  readonly heading: string;
  readonly body: string;
  readonly published: boolean;
  readonly replaceable: true;
};

export const aboutBeats: readonly AboutBeat[] = [
  {
    id: "who",
    heading: "Who we are",
    body: "A practice for technology, operations, and advice, written so a new reader can follow it.",
    published: true,
    replaceable: true,
  },
  {
    id: "think",
    heading: "How we think",
    body: "Name the problem in plain words before choosing a tool.",
    published: true,
    replaceable: true,
  },
  {
    id: "work",
    heading: "How we work",
    body: "Keep the next step small enough that someone else can explain it.",
    published: true,
    replaceable: true,
  },
  {
    id: "believe",
    heading: "What we believe",
    body: "What is shown should be understandable without a private language.",
    published: true,
    replaceable: true,
  },
  {
    id: "why",
    heading: "Why we build",
    body: "So a decision can be carried after the conversation ends.",
    published: true,
    replaceable: true,
  },
];

export const proofStandIn = {
  replaceable: true as const,
  published: true,
  line: "A fictional program stands in where confirmed proof would be. Not a real client.",
};

export function getPublishedAboutBeats(): readonly AboutBeat[] {
  return aboutBeats.filter((beat) => beat.published && beat.body.trim().length > 0);
}

export function isProofPublished(): boolean {
  return proofStandIn.published;
}

export const aboutStandIn = {
  replaceable: true as const,
  description: "Who we are, how we think, how we work, what we believe, and why we build.",
};
