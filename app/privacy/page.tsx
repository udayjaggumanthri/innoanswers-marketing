import type { Metadata } from "next";
import { privacyStandIn } from "@/content/legal";

export const metadata: Metadata = {
  title: privacyStandIn.title,
  description: privacyStandIn.description,
};

export default function PrivacyPage() {
  return (
    <>
      <h1>{privacyStandIn.title}</h1>
      {privacyStandIn.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
}
