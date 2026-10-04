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
