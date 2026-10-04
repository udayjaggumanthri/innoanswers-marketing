"use client";

import { Canvas } from "@react-three/fiber";

function makeCanvasInert(element: HTMLCanvasElement) {
  element.style.pointerEvents = "none";
  element.setAttribute("aria-hidden", "true");
  element.removeAttribute("aria-label");
  element.removeAttribute("title");
  element.removeAttribute("role");
  element.removeAttribute("tabindex");
}

export function OpeningCanvas() {
  return (
    <Canvas
      aria-hidden
      frameloop="demand"
      dpr={1}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}
      onCreated={({ gl }) => {
        makeCanvasInert(gl.domElement);
      }}
    />
  );
}
