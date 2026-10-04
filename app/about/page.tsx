import type { Metadata } from "next";
import { StillFrame } from "@/components/still-frame";
import { aboutStandIn } from "@/content/about";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutStandIn.description,
};

export default function AboutPage() {
  return (
    <div data-chamber="about">
      <h1>About Us</h1>
      {aboutStandIn.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <StillFrame beat="still" short />
      <section>
        <h2>{aboutStandIn.proofHeading}</h2>
        <ul className="offering-list">
          {aboutStandIn.proof.map((item) => (
            <li key={item.label}>
              <p>{item.label}</p>
              <p>{item.detail}</p>
            </li>
          ))}
        </ul>
        <StillFrame beat="reveal" />
      </section>
    </div>
  );
}
