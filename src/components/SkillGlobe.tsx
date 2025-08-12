import React, { useRef } from "react";
import { Group } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

const skills = [
  "TypeScript",
  "React",
  "Three.js",
  "Tailwind",
  "DaisyUI",
  "Framer Motion",
  "Node.js",
  "Vite",
  "HTML",
  "CSS"
];

function RotatingGlobe({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((state, delta) => {
    if (ref.current && !state.gl.domElement.classList.contains("dragging")) {
      ref.current.rotation.y += delta * 0.25; // slow auto-spin
    }
  });
  return <group ref={ref}>{children}</group>;
}

// DaisyUI color classes to randomly assign
const colorClasses = [
  "bg-primary text-primary-content border-primary",
  "bg-secondary text-secondary-content border-secondary",
  "bg-accent text-accent-content border-accent",
  "bg-info text-info-content border-info",
  "bg-success text-success-content border-success",
  "bg-warning text-warning-content border-warning",
  "bg-error text-error-content border-error"
];

function getColorClass(idx: number) {
  // Deterministic but "random" for each skill
  return colorClasses[idx % colorClasses.length];
}

function SkillGlobe() {
  const globeRadius = 220;
  return (
    <Canvas style={{ width: 700, height: 700 }} camera={{ position: [0, 0, 700], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        onStart={() => {
          document.querySelector("canvas")?.classList.add("dragging");
        }}
        onEnd={() => {
          document.querySelector("canvas")?.classList.remove("dragging");
        }}
      />
      <RotatingGlobe>
        {/* Invisible globe mesh for reference only */}
        <mesh>
          <sphereGeometry args={[globeRadius, 32, 32]} />
          <meshStandardMaterial color="#6C63FF" opacity={0} transparent />
        </mesh>
        {/* Skill spheres distributed on globe */}
        {skills.map((skill, i) => {
          // Distribute points on a sphere using spherical coordinates
          const phi = Math.acos(-1 + (2 * i) / skills.length);
          const theta = Math.sqrt(skills.length * Math.PI) * phi;
          const r = globeRadius;
          const x = r * Math.cos(theta) * Math.sin(phi);
          const y = r * Math.sin(theta) * Math.sin(phi);
          const z = r * Math.cos(phi);
          return (
            <Html key={skill} position={[x, y, z]} center style={{ pointerEvents: "none" }}>
              <span
                className={`min-w-[90px] px-4 py-1.5 rounded-lg font-bold shadow border text-base antialiased ${getColorClass(
                  i
                )}`}
                style={{
                  fontSize: 16,
                  display: "inline-block",
                  userSelect: "none",
                  fontFamily:
                    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale"
                }}>
                {skill}
              </span>
            </Html>
          );
        })}
      </RotatingGlobe>
    </Canvas>
  );
}

export default SkillGlobe;
