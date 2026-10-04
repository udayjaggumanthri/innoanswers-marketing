"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Color, NoToneMapping, PMREMGenerator, Scene, type WebGLRenderTarget } from "three";
import { HallScene } from "@/components/hall-scene";
import { readHallColors, type HallColors } from "@/lib/hall-colors";

function makeCanvasInert(element: HTMLCanvasElement) {
  element.style.pointerEvents = "none";
  element.setAttribute("aria-hidden", "true");
  element.removeAttribute("aria-label");
  element.removeAttribute("title");
  element.removeAttribute("role");
  element.removeAttribute("tabindex");
}

export function HallCanvas() {
  const [colors] = useState<HallColors | null>(() => readHallColors());
  const environment = useRef<WebGLRenderTarget | null>(null);

  useEffect(() => {
    return () => {
      environment.current?.dispose();
      environment.current = null;
    };
  }, []);

  return (
    <div className="hall-canvas" inert aria-hidden="true" data-hall-pose="still">
      <Canvas
        aria-hidden
        frameloop="demand"
        dpr={1}
        camera={{ fov: 42, near: 0.1, far: 90, position: [0, 1.55, 5.5] }}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "low-power",
          stencil: false,
        }}
        style={{ pointerEvents: "none" }}
        onCreated={({ gl, scene, camera }) => {
          gl.shadowMap.enabled = false;
          gl.toneMapping = NoToneMapping;
          makeCanvasInert(gl.domElement);
          if (colors) {
            gl.setClearColor(colors.background, 1);
            const pmrem = new PMREMGenerator(gl);
            const envScene = new Scene();
            envScene.background = new Color(colors.background);
            const target = pmrem.fromScene(envScene);
            environment.current = target;
            scene.environment = target.texture;
            pmrem.dispose();
          }
          camera.lookAt(0, 1.3, 0);
        }}
      >
        {colors ? <HallScene background={colors.background} foreground={colors.foreground} /> : null}
      </Canvas>
    </div>
  );
}
