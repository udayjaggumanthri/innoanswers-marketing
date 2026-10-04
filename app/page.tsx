import type { Metadata } from "next";
import { ServiceNameLinks } from "@/components/service-name-links";
import { StillFrame } from "@/components/still-frame";

export const metadata: Metadata = {
  title: "Home",
  description: "The opening stays still until you scroll.",
};

export default function HomePage() {
  return (
    <div data-chamber="home">
      <h1>Home</h1>
      <p>The opening stays still until you scroll.</p>
      <ServiceNameLinks hrefFor={(id) => `/services#${id}`} />
      <p>
        <a href="/solutions">Solutions</a>
      </p>
      <StillFrame beat="still" />
      <StillFrame beat="approach" />
      <StillFrame beat="pause" />
      <StillFrame beat="reveal" />
      <StillFrame beat="continue" />
    </div>
  );
}
