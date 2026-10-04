import type { BeatName } from "@/lib/hall-pose";

export function StillFrame({
  beat,
  short = false,
}: {
  beat: BeatName;
  short?: boolean;
}) {
  return (
    <div
      className={short ? "beat-frame beat-frame-short" : "beat-frame"}
      data-beat={beat}
      aria-hidden="true"
    />
  );
}
