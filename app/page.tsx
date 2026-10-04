import type { Metadata } from "next";
import { OpeningFrame } from "@/components/opening-frame";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <OpeningFrame />
    </>
  );
}
