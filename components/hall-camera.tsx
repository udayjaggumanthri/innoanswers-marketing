"use client";

import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import {
  isBeatName,
  isChamberId,
  poseFor,
  shotPose,
  stillPose,
  type BeatName,
  type ChamberId,
} from "@/lib/hall-pose";

function readChamber(): ChamberId {
  const value = document.querySelector("[data-chamber]")?.getAttribute("data-chamber");
  if (isChamberId(value)) {
    return value;
  }
  return "home";
}

function documentTop(element: HTMLElement): number {
  return element.getBoundingClientRect().top + window.scrollY;
}

function previousShot(beats: HTMLElement[], index: number): string | null {
  for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
    const shot = beats[cursor]?.dataset.shot;
    if (shot) {
      return shot;
    }
  }
  return null;
}

function readActiveBeat(scrollY: number): {
  name: BeatName;
  localT: number;
  shot: string | null;
  previousShot: string | null;
} {
  const beats = [...document.querySelectorAll<HTMLElement>("[data-beat]")];
  if (beats.length === 0) {
    return { name: "still", localT: 0, shot: null, previousShot: null };
  }

  let chosenIndex = 0;
  for (let index = 0; index < beats.length; index += 1) {
    const beat = beats[index];
    if (beat && documentTop(beat) <= scrollY) {
      chosenIndex = index;
    }
  }

  const chosen = beats[chosenIndex];
  if (!chosen) {
    return { name: "still", localT: 0, shot: null, previousShot: null };
  }
  const top = documentTop(chosen);
  const height = chosen.offsetHeight;
  const localT = height > 0 ? Math.min(1, Math.max(0, (scrollY - top) / height)) : 0;
  const name = isBeatName(chosen.dataset.beat) ? chosen.dataset.beat : "still";
  return {
    name,
    localT,
    shot: chosen.dataset.shot ?? null,
    previousShot: previousShot(beats, chosenIndex),
  };
}

function markCurrentShot(scrollY: number) {
  const shots = [...document.querySelectorAll<HTMLElement>(".shot-beat")];
  if (shots.length === 0) {
    return;
  }
  let chosen = shots[0];
  if (scrollY > 0) {
    for (const shot of shots) {
      if (documentTop(shot) <= scrollY) {
        chosen = shot;
      }
    }
  }
  for (const shot of shots) {
    shot.toggleAttribute("data-shot-current", shot === chosen);
  }
}

function applyPose(scrollY: number) {
  const chamber = readChamber();
  const opening = scrollY <= 0;
  markCurrentShot(scrollY);
  const beat = readActiveBeat(scrollY);
  const alongShot = beat.shot
    ? shotPose(chamber, beat.shot, opening ? null : beat.previousShot, opening ? 0 : beat.localT)
    : null;
  const pose = alongShot ?? (opening ? stillPose(chamber) : poseFor(chamber, beat.name, beat.localT));
  const root = document.querySelector(".hall-canvas");
  if (root instanceof HTMLElement) {
    root.dataset.hallPose = opening || beat.name === "still" ? "still" : "moving";
    root.dataset.hallChamber = chamber;
  }
  return pose;
}

export function HallCamera() {
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);

  useLayoutEffect(() => {
    const apply = () => {
      const pose = applyPose(window.scrollY);
      camera.position.set(pose.x, pose.y, pose.z);
      camera.lookAt(pose.tx, pose.ty, pose.tz);
      invalidate();
    };

    apply();
    const frame = requestAnimationFrame(apply);
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, [camera, invalidate]);

  return null;
}
