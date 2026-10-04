import type { Metadata } from "next";
import { serviceLines } from "@/content/service-lines";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <>
      <h1>Services</h1>
      <ul className="service-list">
        {serviceLines.map((line) => (
          <li key={line.id}>
            <a href={`#${line.id}`}>{line.name}</a>
          </li>
        ))}
      </ul>
      <p>
        <a href="/solutions">Solutions</a>
      </p>
      {serviceLines.map((line) => (
        <section
          key={line.id}
          id={line.id}
          tabIndex={-1}
          className="service-section"
          aria-labelledby={`${line.id}-heading`}
        >
          <h2 id={`${line.id}-heading`}>{line.name}</h2>
        </section>
      ))}
    </>
  );
}
