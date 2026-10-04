"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  FrontSide,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  type Object3D,
  type SpotLight,
} from "three";
import { getPublishedArticles } from "@/content/articles";
import { getPublishedOfferings } from "@/content/offerings";
import { chamberAnchor } from "@/lib/hall-pose";
import { HallCamera } from "@/components/hall-camera";

function SettleTransmission() {
  const invalidate = useThree((state) => state.invalidate);
  const remaining = useRef(2);

  useFrame(() => {
    if (remaining.current > 0) {
      remaining.current -= 1;
      invalidate();
    }
  });

  return null;
}

function DirectedBeam({
  color,
  position,
  target,
  intensity,
  angle = 0.22,
  distance = 10,
}: {
  color: string;
  position: [number, number, number];
  target: [number, number, number];
  intensity: number;
  angle?: number;
  distance?: number;
}) {
  const light = useRef<SpotLight>(null);
  const targetRef = useRef<Object3D>(null);
  const invalidate = useThree((state) => state.invalidate);

  useLayoutEffect(() => {
    if (light.current && targetRef.current) {
      light.current.target = targetRef.current;
      invalidate();
    }
  }, [invalidate]);

  return (
    <>
      <spotLight
        ref={light}
        color={color}
        intensity={intensity}
        angle={angle}
        penumbra={0.5}
        distance={distance}
        decay={2}
        position={position}
        castShadow={false}
      />
      <object3D ref={targetRef} position={target} />
    </>
  );
}

function PlaneRun({
  material,
  count,
  origin,
  span,
  size = [0.9, 1.5],
}: {
  material: MeshPhysicalMaterial;
  count: number;
  origin: [number, number, number];
  span: number;
  size?: [number, number];
}) {
  if (count <= 0) {
    return null;
  }

  const step = count === 1 ? 0 : span / (count - 1);
  const start = count === 1 ? origin[0] : origin[0] - span / 2;

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <mesh
          key={index}
          position={[start + step * index, origin[1], origin[2]]}
          material={material}
        >
          <planeGeometry args={size} />
        </mesh>
      ))}
    </>
  );
}

export function HallScene({
  background,
  foreground,
}: {
  background: string;
  foreground: string;
}) {
  const techMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: background,
        roughness: 0.62,
        metalness: 0,
        transmission: 0.92,
        thickness: 0.42,
        ior: 1.05,
        attenuationColor: background,
        attenuationDistance: Infinity,
        side: FrontSide,
      }),
    [background],
  );
  const volumeMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: foreground,
        roughness: 0.62,
        metalness: 0,
        transmission: 0.35,
        thickness: 0.2,
        ior: 1.15,
        attenuationColor: background,
        attenuationDistance: 1.2,
        side: FrontSide,
      }),
    [background, foreground],
  );
  const shellMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: foreground,
        roughness: 1,
        metalness: 0,
      }),
    [foreground],
  );
  const passingLight = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#000000",
        emissive: background,
        emissiveIntensity: 1,
        roughness: 1,
        metalness: 0,
      }),
    [background],
  );

  useEffect(() => {
    return () => {
      techMaterial.dispose();
      volumeMaterial.dispose();
      shellMaterial.dispose();
      passingLight.dispose();
    };
  }, [passingLight, shellMaterial, techMaterial, volumeMaterial]);

  const offerings = getPublishedOfferings();
  const articles = getPublishedArticles();
  const servicesZ = chamberAnchor.services;
  const solutionsZ = chamberAnchor.solutions;
  const blogsZ = chamberAnchor.blogs;
  const contactZ = chamberAnchor.contact;

  return (
    <>
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 14, 38]} />
      <ambientLight color={background} intensity={0.55} />
      <directionalLight color={background} position={[1.5, 3.5, 6]} intensity={1.2} castShadow={false} />
      <HallCamera />
      <SettleTransmission />
      <mesh position={[0, 0, -28]} material={shellMaterial}>
        <boxGeometry args={[8, 0.05, 74]} />
      </mesh>
      <mesh position={[-3.55, 1.5, -20]} material={shellMaterial}>
        <boxGeometry args={[0.06, 3, 56]} />
      </mesh>
      <mesh position={[3.55, 1.5, -20]} material={shellMaterial}>
        <boxGeometry args={[0.06, 3, 56]} />
      </mesh>
      <mesh position={[-2.15, 1.5, -50]} material={shellMaterial}>
        <boxGeometry args={[0.06, 3, 6]} />
      </mesh>
      <mesh position={[2.15, 1.5, -50]} material={shellMaterial}>
        <boxGeometry args={[0.06, 3, 6]} />
      </mesh>
      <mesh position={[-1.35, 1.5, -55]} material={shellMaterial}>
        <boxGeometry args={[0.06, 3, 6]} />
      </mesh>
      <mesh position={[1.35, 1.5, -55]} material={shellMaterial}>
        <boxGeometry args={[0.06, 3, 6]} />
      </mesh>
      <mesh position={[-0.8, 1.5, -60]} material={shellMaterial}>
        <boxGeometry args={[0.06, 3, 6]} />
      </mesh>
      <mesh position={[0.8, 1.5, -60]} material={shellMaterial}>
        <boxGeometry args={[0.06, 3, 6]} />
      </mesh>
      <mesh position={[-1.7, 1.2, servicesZ + 2.25]} material={passingLight}>
        <planeGeometry args={[1.55, 2.05]} />
      </mesh>
      <mesh position={[-1.7, 1.2, servicesZ + 2.6]} material={techMaterial}>
        <boxGeometry args={[1.7, 2.2, 0.42]} />
      </mesh>
      <directionalLight
        color={background}
        position={[-1.7, 2.4, servicesZ + 1.2]}
        intensity={1.5}
        castShadow={false}
      />
      <PlaneRun
        material={volumeMaterial}
        count={5}
        origin={[0.35, 1.05, servicesZ + 2.6]}
        span={1.85}
        size={[0.16, 1.45]}
      />
      <mesh position={[1.95, 1.05, servicesZ + 2.6]} material={volumeMaterial}>
        <boxGeometry args={[0.55, 0.72, 0.55]} />
      </mesh>
      <DirectedBeam
        color={background}
        intensity={640}
        angle={0.16}
        distance={2.8}
        position={[1.95, 2.4, servicesZ + 3.7]}
        target={[1.95, 1.05, servicesZ + 2.6]}
      />
      {offerings.length === 0 ? (
        <DirectedBeam
          color={background}
          intensity={1100}
          angle={0.42}
          position={[0, 2.4, solutionsZ + 1.8]}
          target={[0, 0.02, solutionsZ]}
        />
      ) : (
        offerings.map((offering, index) => {
          const span = Math.max(offerings.length - 1, 1) * 0.95;
          const x = offerings.length === 1 ? 0 : -span / 2 + (span / (offerings.length - 1)) * index;
          return (
            <group key={offering.slug}>
              <mesh position={[x, 1.2, solutionsZ]} material={volumeMaterial}>
                <planeGeometry args={[0.9, 1.5]} />
              </mesh>
              <DirectedBeam
                color={background}
                intensity={1100 / offerings.length}
                position={[x, 3.1, solutionsZ + 2]}
                target={[x, 1.2, solutionsZ]}
              />
            </group>
          );
        })
      )}
      <PlaneRun
        material={volumeMaterial}
        count={articles.length}
        origin={[0, 1.2, blogsZ]}
        span={Math.max(articles.length - 1, 0) * 0.95}
      />
      <mesh position={[0, 1.25, contactZ - 3.2]} material={volumeMaterial}>
        <planeGeometry args={[1.05, 1.7]} />
      </mesh>
    </>
  );
}
