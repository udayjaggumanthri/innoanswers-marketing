import type { Metadata } from "next";
import { StillFrame } from "@/components/still-frame";
import { getPublishedOfferings, solutionsStandIn } from "@/content/offerings";

export function generateMetadata(): Metadata {
  const offerings = getPublishedOfferings();
  return {
    title: "Technology / Solutions",
    description:
      offerings.length === 0
        ? "No offerings have been confirmed for publication."
        : solutionsStandIn.description,
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
        <>
          <p>{solutionsStandIn.intro}</p>
          <ul className="offering-list">
            {offerings.map((offering) => (
              <li key={offering.slug}>
                {offering.title}
                <p>{offering.summary}</p>
              </li>
            ))}
          </ul>
        </>
      )}
      {offerings.length === 0 ? (
        <StillFrame beat="still" short />
      ) : (
        offerings.map((offering) => <StillFrame key={offering.slug} beat="reveal" />)
      )}
    </div>
  );
}
