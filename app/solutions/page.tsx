import type { Metadata } from "next";
import { getPublishedOfferings } from "@/content/offerings";

export const metadata: Metadata = {
  title: "Technology / Solutions",
};

export default function SolutionsPage() {
  const offerings = getPublishedOfferings();

  return (
    <>
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
    </>
  );
}
