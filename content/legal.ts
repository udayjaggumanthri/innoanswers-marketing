/**
 * REPLACEABLE STAND-IN.
 * Swap these drafts without changing page code.
 * They are not legal advice, not a policy, and not a description of a real practice.
 * No secret or mail key belongs here.
 */
export const legalStandIn = {
  replaceable: true,
  title: "Legal",
  description: "Placeholder draft. Not legal advice.",
  paragraphs: [
    "This page is a placeholder draft. It is not legal advice and it is not a finished policy.",
    "Replace this text before anyone relies on it.",
  ],
} as const;

export const privacyStandIn = {
  replaceable: true,
  title: "Privacy",
  description: "Placeholder draft. Not legal advice.",
  paragraphs: [
    "This page is a placeholder draft. It is not legal advice and it is not a finished privacy notice.",
    "Replace this text before anyone relies on it. It does not describe a real collection practice.",
  ],
} as const;
