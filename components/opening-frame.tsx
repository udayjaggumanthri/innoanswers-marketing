import { OpeningCanvasLoader } from "@/components/opening-canvas-loader";

export function OpeningFrame() {
  return (
    <div className="opening-frame">
      <div className="opening-still" aria-hidden="true" />
      <OpeningCanvasLoader />
    </div>
  );
}
