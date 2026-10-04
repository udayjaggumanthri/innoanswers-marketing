import { getPublishedAboutBeats } from "@/content/about";

export const chamberIds = [
  "home",
  "about",
  "services",
  "solutions",
  "blogs",
  "contact",
] as const;

export type ChamberId = (typeof chamberIds)[number];

export const beatNames = ["still", "approach", "pause", "reveal", "continue"] as const;

export type BeatName = (typeof beatNames)[number];

export type Pose = {
  x: number;
  y: number;
  z: number;
  tx: number;
  ty: number;
  tz: number;
};

export const chamberAnchor: Record<ChamberId, number> = {
  home: 0,
  about: -10,
  services: -22,
  solutions: -34,
  blogs: -46,
  contact: -58,
};

export function isChamberId(value: string | null | undefined): value is ChamberId {
  switch (value) {
    case "home":
    case "about":
    case "services":
    case "solutions":
    case "blogs":
    case "contact":
      return true;
    default:
      return false;
  }
}

export function isBeatName(value: string | null | undefined): value is BeatName {
  switch (value) {
    case "still":
    case "approach":
    case "pause":
    case "reveal":
    case "continue":
      return true;
    default:
      return false;
  }
}

function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

function lerpPose(start: Pose, end: Pose, amount: number): Pose {
  return {
    x: lerp(start.x, end.x, amount),
    y: lerp(start.y, end.y, amount),
    z: lerp(start.z, end.z, amount),
    tx: lerp(start.tx, end.tx, amount),
    ty: lerp(start.ty, end.ty, amount),
    tz: lerp(start.tz, end.tz, amount),
  };
}

export const homeShotIds = [
  "introduction",
  "discovery",
  "problem",
  "possibility",
  "services",
  "offerings",
  "proof",
  "plane",
] as const;

export type HomeShotId = (typeof homeShotIds)[number];

export const aboutShotIds = ["who", "think", "work", "believe", "why"] as const;

export type AboutShotId = (typeof aboutShotIds)[number];

export function isHomeShot(value: string | null | undefined): value is HomeShotId {
  switch (value) {
    case "introduction":
    case "discovery":
    case "problem":
    case "possibility":
    case "services":
    case "offerings":
    case "proof":
    case "plane":
      return true;
    default:
      return false;
  }
}

export function isAboutShot(value: string | null | undefined): value is AboutShotId {
  switch (value) {
    case "who":
    case "think":
    case "work":
    case "believe":
    case "why":
      return true;
    default:
      return false;
  }
}

function homeWaypoint(shot: HomeShotId): Pose {
  const servicesLook = chamberAnchor.services + 2.6;
  switch (shot) {
    case "introduction":
      return { x: 0, y: 1.55, z: 5.5, tx: 0, ty: 1.3, tz: 0 };
    case "discovery":
      return { x: 0, y: 1.62, z: 2.4, tx: 0, ty: 1.4, tz: -6 };
    case "problem":
      return { x: 0, y: 1.5, z: -4, tx: 0, ty: 1.45, tz: -9 };
    case "possibility":
      return { x: 0, y: 1.75, z: -8, tx: 0, ty: 1.3, tz: servicesLook };
    case "services":
      return { x: 0, y: 2.7, z: -8.6, tx: 0, ty: 1.15, tz: servicesLook };
    case "offerings":
      return { x: 0, y: 2.55, z: -22, tx: 0, ty: 1.15, tz: chamberAnchor.solutions };
    case "proof":
      return { x: -0.15, y: 2.4, z: -27.5, tx: -2.55, ty: 1.35, tz: -31 };
    case "plane":
      return { x: 0, y: 2.3, z: -39.6, tx: 0, ty: 1.25, tz: -42 };
    default: {
      const unreachable: never = shot;
      return unreachable;
    }
  }
}

function aboutWaypoint(shot: AboutShotId): Pose {
  switch (shot) {
    case "who":
      return { x: 0, y: 1.55, z: -4.5, tx: 0, ty: 1.3, tz: -10 };
    case "think":
      return { x: 0.35, y: 1.6, z: -6, tx: 0.15, ty: 1.3, tz: -12 };
    case "work":
      return { x: -0.25, y: 1.5, z: -7.2, tx: 0, ty: 1.25, tz: -13 };
    case "believe":
      return { x: 0.2, y: 1.58, z: -8, tx: 0, ty: 1.3, tz: -14 };
    case "why":
      return { x: 0, y: 1.52, z: -9, tx: 0, ty: 1.28, tz: -15 };
    default: {
      const unreachable: never = shot;
      return unreachable;
    }
  }
}

function contactPlanePose(): Pose {
  return { x: 0, y: 1.55, z: -56, tx: 0, ty: 1.25, tz: chamberAnchor.contact - 3.2 };
}

function heldPlanePose(): Pose {
  return {
    x: -0.48,
    y: 1.45,
    z: chamberAnchor.blogs + 2.6,
    tx: -0.48,
    ty: 1.2,
    tz: chamberAnchor.blogs,
  };
}

export function shotPose(
  chamber: ChamberId,
  shot: string,
  previousShot: string | null,
  amount: number,
): Pose | null {
  const t = Math.min(1, Math.max(0, amount));
  if (chamber === "blogs" && shot === "held") {
    return heldPlanePose();
  }
  if (chamber === "home" && isHomeShot(shot)) {
    const to = homeWaypoint(shot);
    if (previousShot && isHomeShot(previousShot)) {
      return lerpPose(homeWaypoint(previousShot), to, t);
    }
    return to;
  }
  if (chamber === "about" && isAboutShot(shot)) {
    const to = aboutWaypoint(shot);
    if (previousShot && isAboutShot(previousShot)) {
      return lerpPose(aboutWaypoint(previousShot), to, t);
    }
    return to;
  }
  return null;
}

function servicesStill(): Pose {
  const anchor = chamberAnchor.services;
  return {
    x: 0,
    y: 2.05,
    z: anchor + 8.2,
    tx: 0,
    ty: 1.15,
    tz: anchor + 2.6,
  };
}

export function stillPose(chamber: ChamberId): Pose {
  if (chamber === "services") {
    return servicesStill();
  }
  if (chamber === "home") {
    return homeWaypoint("introduction");
  }
  if (chamber === "about") {
    const first = getPublishedAboutBeats()[0];
    if (first && isAboutShot(first.id)) {
      return aboutWaypoint(first.id);
    }
    return aboutWaypoint("who");
  }
  if (chamber === "contact") {
    return contactPlanePose();
  }
  const anchor = chamberAnchor[chamber];
  return {
    x: 0,
    y: 1.55,
    z: anchor + 5.5,
    tx: 0,
    ty: 1.3,
    tz: anchor,
  };
}

export function poseFor(chamber: ChamberId, beat: BeatName, amount: number): Pose {
  const t = Math.min(1, Math.max(0, amount));
  if (chamber === "services") {
    const still = servicesStill();
    const nearer = { ...still, z: still.z - 0.7 };
    const aside = { ...nearer, x: 0.35, tx: 0.28 };
    switch (beat) {
      case "still":
        return still;
      case "pause":
        return nearer;
      case "approach":
        return lerpPose(still, nearer, t);
      case "reveal":
        return lerpPose(nearer, aside, t);
      case "continue":
        return lerpPose(aside, still, t);
      default: {
        const unreachable: never = beat;
        return unreachable;
      }
    }
  }

  const still = stillPose(chamber);
  const approach = { ...still, z: still.z - 1.7, tz: still.tz - 1.3 };
  const reveal = { ...approach, x: 0.9, tx: 0.35 };
  const moved = { ...approach, x: 0, tx: 0, z: approach.z - 1.5, tz: approach.tz - 1.5 };

  switch (beat) {
    case "still":
      return still;
    case "pause":
      return approach;
    case "approach":
      return lerpPose(still, approach, t);
    case "reveal":
      return lerpPose(approach, reveal, t);
    case "continue":
      return lerpPose(reveal, moved, t);
    default: {
      const unreachable: never = beat;
      return unreachable;
    }
  }
}
