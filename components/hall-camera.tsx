"use client";

import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import {
  isBeatName,
  isChamberId,
  poseFor,
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

function readActiveBeat(scrollY: number): { name: BeatName; localT: number } {
  const beats = [...document.querySelectorAll<HTMLElement>("[data-beat]")];
  if (beats.length === 0) {
    return { name: "still", localT: 0 };
  }

  let chosen = beats[0];
  for (const beat of beats) {
    if (documentTop(beat) <= scrollY) {
      chosen = beat;
    }
  }

  const top = documentTop(chosen);
  const height = chosen.offsetHeight;
  const localT = height > 0 ? Math.min(1, Math.max(0, (scrollY - top) / height)) : 0;
  const name = isBeatName(chosen.dataset.beat) ? chosen.dataset.beat : "still";
  return { name, localT };
}

function applyPose(scrollY: number) {
  const chamber = readChamber();
  const beat = scrollY <= 0 ? { name: "still" as const, localT: 0 } : readActiveBeat(scrollY);
  const pose = poseFor(chamber, beat.name, beat.localT);
  const root = document.querySelector(".hall-canvas");
  if (root instanceof HTMLElement) {
    root.dataset.hallPose = beat.name === "still" ? "still" : "moving";
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
