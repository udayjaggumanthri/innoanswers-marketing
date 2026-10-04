import type { ReactNode } from "react";
import type { BeatName } from "@/lib/hall-pose";

export function StillFrame({
  beat,
  short = false,
  shot,
}: {
  beat: BeatName;
  short?: boolean;
  shot?: string;
}) {
  return (
    <div
      className={short ? "beat-frame beat-frame-short" : "beat-frame"}
      data-beat={beat}
      data-shot={shot}
      aria-hidden="true"
    />
  );
}

export function ShotBeat({
  shot,
  beat = shot,
  children,
}: {
  shot: string;
  beat?: string;
  children: ReactNode;
}) {
  return (
    <div className="shot-beat" data-beat={beat} data-shot={shot}>
      <div className="beat-copy">{children}</div>
      <div className="beat-frame" aria-hidden="true" />
    </div>
  );
}
