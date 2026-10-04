"use client";

import {
  Component,
  Suspense,
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

type OpeningCanvasComponent = ComponentType;

type BoundaryProps = {
  children: ReactNode;
};

type BoundaryState = {
  failed: boolean;
};

class OpeningCanvasBoundary extends Component<BoundaryProps, BoundaryState> {
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
    return context !== null;
  } catch {
    return false;
  }
}

export function OpeningCanvasLoader() {
  const [CanvasView, setCanvasView] = useState<OpeningCanvasComponent | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;

    const sync = () => {
      if (cancelled || media.matches || !webGLIsAvailable()) {
        setCanvasView(null);
        return;
      }

      // Dynamic import stays behind the reduced-motion and WebGL checks so the
      // 3D chunk is not requested when either check fails.
      void import("@/components/opening-canvas")
        .then((module) => {
          if (cancelled || media.matches || !webGLIsAvailable()) {
            return;
          }
          setCanvasView(() => module.OpeningCanvas);
        })
        .catch(() => {
          if (!cancelled) {
            setCanvasView(null);
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

  if (!CanvasView) {
    return null;
  }

  return (
    <OpeningCanvasBoundary>
      <Suspense fallback={null}>
        <div className="opening-canvas" inert aria-hidden="true">
          <CanvasView />
        </div>
      </Suspense>
    </OpeningCanvasBoundary>
  );
}
