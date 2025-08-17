import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Group } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

const skills = [
  "TypeScript",
  "Three.js",
  "Tailwind",
  "DaisyUI",
  "Node.js",
  "GitHub",
  "Next.js",
  "Figma",
  "PostgreSQL",
  "Express"
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

// Use a seeded random for reproducibility (same order every render)
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getColorClass(idx: number, skill: string) {
  // Use skill name and index to generate a pseudo-random color
  const hash = skill.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) + idx * 31;
  const randIdx = Math.floor(seededRandom(hash) * colorClasses.length);
  return colorClasses[randIdx];
}

function SkillGlobe() {
  const globeRadius = 220;
  // Generate random offsets for each skill on every mount, avoiding overlap
  const minDistance = 0.25; // minimum allowed distance between nodes (in radians)
  const maxTries = 30;
  const randomOffsets = React.useMemo(() => {
    const placed: { phi: number; theta: number }[] = [];
    return skills.map(() => {
      let tries = 0;
      let phi: number = 0;
      let theta: number = 0;
      let ok = false;
      while (!ok && tries < maxTries) {
        phi = (Math.random() - 0.5) * 0.7;
        theta = (Math.random() - 0.5) * 1.2;
        ok = true;
        for (const prev of placed) {
          const dPhi = phi - prev.phi;
          const dTheta = theta - prev.theta;
          const dist = Math.sqrt(dPhi * dPhi + dTheta * dTheta);
          if (dist < minDistance) {
            ok = false;
            break;
          }
        }
        tries++;
      }
      placed.push({ phi, theta });
      return { phi, theta };
    });
  }, []);
  return (
    <motion.div
      style={{ position: "relative", width: "100%", maxWidth: 700, aspectRatio: "1 / 1", margin: "0 auto" }}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}>
      {/* Low opacity label behind the globe */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          fontSize: "5rem",
          fontWeight: 700,
          color: "#000",
          opacity: 0.08,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          fontFamily: "VT323, monospace",
          letterSpacing: "0.1em",
          textAlign: "center",
          userSelect: "none"
        }}>
        My Skills
      </div>
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          position: "relative",
          zIndex: 1
        }}
        camera={{ position: [0, 0, 700], fov: 50 }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}>
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
            const basePhi = Math.acos(-1 + (2 * i) / skills.length);
            const baseTheta = Math.sqrt(skills.length * Math.PI) * basePhi;
            const phiRand = basePhi + (randomOffsets[i]?.phi ?? 0);
            const thetaRand = baseTheta + (randomOffsets[i]?.theta ?? 0);
            const r = globeRadius;
            const x = r * Math.cos(thetaRand) * Math.sin(phiRand);
            const y = r * Math.sin(thetaRand) * Math.sin(phiRand);
            const z = r * Math.cos(phiRand);
            return (
              <Html key={skill} position={[x, y, z]} center style={{ pointerEvents: "none" }}>
                <span
                  className={`min-w-[90px] px-4 py-1.5 rounded-lg font-bold shadow border text-base antialiased flex items-center justify-center text-center ${getColorClass(
                    i,
                    skill
                  )}`}
                  style={{
                    fontSize: 16,
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
    </motion.div>
  );
}

export default function SkillGlobeWrapper() {
  return (
    <div className="w-full flex items-center justify-center mx-auto" style={{ maxWidth: 1000 }}>
      <SkillGlobe />
    </div>
  );
}
