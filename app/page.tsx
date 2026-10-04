import type { Metadata } from "next";
import { ServiceNameLinks } from "@/components/service-name-links";
import { StillFrame } from "@/components/still-frame";
import { siteStandIn } from "@/content/site";

export const metadata: Metadata = {
  title: "Home",
  description: siteStandIn.homeDescription,
};

export default function HomePage() {
  return (
    <div data-chamber="home">
      <h1>{siteStandIn.homeHeadline}</h1>
      <p>{siteStandIn.homeLede}</p>
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
