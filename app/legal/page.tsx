import type { Metadata } from "next";
import { legalStandIn } from "@/content/legal";

export const metadata: Metadata = {
  title: legalStandIn.title,
  description: legalStandIn.description,
};

export default function LegalPage() {
  return (
    <>
      <h1>{legalStandIn.title}</h1>
      {legalStandIn.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
}
