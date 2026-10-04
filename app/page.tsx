import type { Metadata } from "next";
import { ServiceNameLinks } from "@/components/service-name-links";
import { ShotBeat } from "@/components/still-frame";
import { isProofPublished, proofStandIn } from "@/content/about";
import { homeShotCopy } from "@/content/home-shot";
import { getPublishedOfferings } from "@/content/offerings";
import { siteStandIn } from "@/content/site";

export const metadata: Metadata = {
  title: "Home",
  description: siteStandIn.homeDescription,
};

export default function HomePage() {
  const offerings = getPublishedOfferings();

  return (
    <div data-chamber="home">
      <ShotBeat shot="introduction" beat="still">
        <h1>{siteStandIn.homeHeadline}</h1>
        <p>{siteStandIn.homeLede}</p>
      </ShotBeat>
      <ShotBeat shot="discovery">
        <p>{homeShotCopy.discovery}</p>
      </ShotBeat>
      <ShotBeat shot="problem">
        <p>{homeShotCopy.problem}</p>
      </ShotBeat>
      <ShotBeat shot="possibility">
        <p>{homeShotCopy.possibility}</p>
      </ShotBeat>
      <ShotBeat shot="services">
        <p>{homeShotCopy.services}</p>
        <ServiceNameLinks hrefFor={(id) => `/services#${id}`} />
      </ShotBeat>
      {offerings.length > 0 ? (
        <ShotBeat shot="offerings">
          <p>{homeShotCopy.offerings}</p>
          <ul className="offering-list">
            {offerings.map((offering) => (
              <li key={offering.slug}>{offering.title}</li>
            ))}
          </ul>
        </ShotBeat>
      ) : null}
      {isProofPublished() ? (
        <ShotBeat shot="proof">
          <p>{proofStandIn.line}</p>
        </ShotBeat>
      ) : null}
      <ShotBeat shot="plane">
        <p>{homeShotCopy.plane}</p>
      </ShotBeat>
    </div>
  );
}
