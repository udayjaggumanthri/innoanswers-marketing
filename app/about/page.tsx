import type { Metadata } from "next";
import { StillFrame } from "@/components/still-frame";

export const metadata: Metadata = {
  title: "About Us",
  description: "Nothing has been published for this page.",
};

export default function AboutPage() {
  return (
    <div data-chamber="about">
      <h1>About Us</h1>
      <p>Nothing has been published for this page.</p>
      <StillFrame beat="still" short />
    </div>
  );
}
