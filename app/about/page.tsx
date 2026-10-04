import type { Metadata } from "next";
import { ShotBeat } from "@/components/still-frame";
import { aboutStandIn, getPublishedAboutBeats } from "@/content/about";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutStandIn.description,
};

export default function AboutPage() {
  const beats = getPublishedAboutBeats();

  return (
    <div data-chamber="about">
      <h1>About Us</h1>
      {beats.map((beat) => (
        <ShotBeat key={beat.id} shot={beat.id}>
          <h2>{beat.heading}</h2>
          <p>{beat.body}</p>
        </ShotBeat>
      ))}
    </div>
  );
}
