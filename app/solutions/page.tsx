import type { Metadata } from "next";
import { StillFrame } from "@/components/still-frame";
import { getPublishedOfferings } from "@/content/offerings";

export function generateMetadata(): Metadata {
  const offerings = getPublishedOfferings();
  return {
    title: "Technology / Solutions",
    description:
      offerings.length === 0
        ? "No offerings have been confirmed for publication."
        : "Published offerings.",
  };
}

export default function SolutionsPage() {
  const offerings = getPublishedOfferings();

  return (
    <div data-chamber="solutions">
      <h1>Technology / Solutions</h1>
      {offerings.length === 0 ? (
        <p>No offerings have been confirmed for publication.</p>
      ) : (
        <ul className="offering-list">
          {offerings.map((offering) => (
            <li key={offering.slug}>{offering.title}</li>
          ))}
        </ul>
      )}
      <StillFrame beat={offerings.length === 0 ? "still" : "reveal"} short={offerings.length === 0} />
    </div>
  );
}
