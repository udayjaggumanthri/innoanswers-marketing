"use client";

import { Component, Suspense, useEffect, useState, type ComponentType, type ReactNode } from "react";

type HallCanvasComponent = ComponentType;

type BoundaryProps = {
  children: ReactNode;
};

type BoundaryState = {
  failed: boolean;
};

class HallBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return null;
    }
    return this.props.children;
  }
}

function webGLIsAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!context) {
      return false;
    }
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function HallLoader() {
  const [HallView, setHallView] = useState<HallCanvasComponent | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;

    const sync = () => {
      if (cancelled || media.matches || !webGLIsAvailable()) {
        setHallView(null);
        return;
      }

      // Imported only after both checks so the 3D chunk stays unrequested otherwise.
      void import("@/components/hall-canvas")
        .then((module) => {
          if (cancelled || media.matches || !webGLIsAvailable()) {
            return;
          }
          setHallView(() => module.HallCanvas);
        })
        .catch(() => {
          if (!cancelled) {
            setHallView(null);
          }
        });
    };

    sync();
    media.addEventListener("change", sync);
    return () => {
      cancelled = true;
      media.removeEventListener("change", sync);
    };
  }, []);

  if (!HallView) {
    return null;
  }

  return (
    <HallBoundary>
      <Suspense fallback={null}>
        <HallView />
      </Suspense>
    </HallBoundary>
  );
}
