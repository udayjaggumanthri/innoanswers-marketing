import type { Metadata } from "next";
import { ServiceNameLinks } from "@/components/service-name-links";
import { serviceLines } from "@/content/service-lines";
import type { BeatName } from "@/lib/hall-pose";

export const metadata: Metadata = {
  title: "Services",
  description: "Technology Services, Business Services, and Consulting.",
};

const serviceBeats: Record<(typeof serviceLines)[number]["id"], BeatName> = {
  "technology-services": "approach",
  "business-services": "pause",
  consulting: "reveal",
};

export default function ServicesPage() {
  return (
    <div data-chamber="services">
      <h1>Services</h1>
      <ServiceNameLinks hrefFor={(id) => `#${id}`} />
      <p>
        <a href="/solutions">Solutions</a>
      </p>
      {serviceLines.map((line) => (
        <section
          key={line.id}
          id={line.id}
          tabIndex={-1}
          data-beat={serviceBeats[line.id]}
          className="service-section"
          aria-labelledby={`${line.id}-heading`}
        >
          <div className="beat-copy">
            <h2 id={`${line.id}-heading`}>{line.name}</h2>
          </div>
          <div className="beat-frame" aria-hidden="true" />
        </section>
      ))}
    </div>
  );
}
