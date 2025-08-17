import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Group, CanvasTexture } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

const skills = ["TypeScript", "Three.js", "Tailwind", "Node.js", "GitHub", "Next.js", "Figma", "PostgreSQL", "Express"];

function RotatingGlobe({ children, paused }: { children: React.ReactNode; paused: boolean }) {
  const ref = useRef<Group>(null);
  useFrame((state, delta) => {
    // skip rotation when paused (offscreen or document hidden)
    if (paused) return;
    if (ref.current && !state.gl.domElement.classList.contains("dragging")) {
      ref.current.rotation.y += delta * 0.25; // slow auto-spin
    }
  });
  return <group ref={ref}>{children}</group>;
}

// Minimal, modern palette (hex values). We'll pick one per skill deterministically.
const palette = [
  "#6C63FF", // indigo-ish
  "#06B6D4", // cyan
  "#F97316", // orange
  "#EF4444", // red
  "#10B981", // green
  "#8B5CF6", // violet
  "#F59E0B" // amber
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pickColor(idx: number, skill: string) {
  const hash = skill.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) + idx * 97;
  const i = Math.floor(seededRandom(hash) * palette.length);
  return palette[i];
}

function hexToRgba(hex: string, alpha = 1) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function SkillGlobe() {
  const globeRadius = 220;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(true);
  const [docVisible, setDocVisible] = useState(true);
  const [dprMax, setDprMax] = useState(1.5);
  const [lowPower, setLowPower] = useState(false);
  const [veryLowPower, setVeryLowPower] = useState(false);
  const [midPower, setMidPower] = useState(false);

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

  // Observe container visibility (pause when offscreen) and document visibility
  useEffect(() => {
    // Set DPR safely on mount
    if (typeof window !== "undefined" && window.devicePixelRatio) {
      setDprMax(Math.min(window.devicePixelRatio, 1.5));
    }

    // Lightweight low-power detection: narrow screens, low core counts, or very high DPR
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      const isNarrow = width < 480;
      const isVeryNarrow = width < 360;
      const nav =
        typeof navigator !== "undefined" ? (navigator as Navigator & { hardwareConcurrency?: number }) : undefined;
      const hw = nav && typeof nav.hardwareConcurrency === "number" ? nav.hardwareConcurrency : undefined;
      const lowCores = !!(hw && hw <= 2);
      const veryLowCores = !!(hw && hw <= 1);
      const highDpr = (window.devicePixelRatio || 1) > 1.4;
      setLowPower(isNarrow || lowCores || highDpr);
      setVeryLowPower(isVeryNarrow || veryLowCores);
      // midPower when device is moderately capable: >2 cores or medium width
      const isMid = !isNarrow && !isVeryNarrow && !!(hw && hw > 2);
      setMidPower(isMid);
    }

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setInView(entry.isIntersecting && entry.intersectionRatio > 0);
        }
      },
      { threshold: [0, 0.01, 0.25, 0.5, 1] }
    );

    observer.observe(el);

    const onVisibility = () => setDocVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const paused = !inView || !docVisible;

  // choose a simplified skill set and geometry for low-power devices
  const skillsToShow = veryLowPower
    ? skills.slice(0, Math.max(4, Math.floor(skills.length / 3)))
    : lowPower
    ? skills.slice(0, Math.max(6, Math.floor(skills.length / 2)))
    : skills;
  const geomSegments = veryLowPower ? 6 : lowPower ? 8 : 16;

  // helper: create a canvas texture for a pill-styled label
  const createLabelTexture = (text: string, color: string) => {
    if (typeof document === "undefined") return null;
    const padding = 12;
    const fontSize = 32; // base; scaled via sprite size
    const font = `${fontSize}px system-ui, -apple-system, 'Segoe UI', Roboto, Arial`;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    // measure text
    ctx.font = font;
    const textMetrics = ctx.measureText(text);
    const textWidth = Math.ceil(textMetrics.width);
    const width = textWidth + padding * 2;
    const height = fontSize + padding;
    canvas.width = Math.max(64, width);
    canvas.height = Math.max(32, height);

    // high-DPR support
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (dpr !== 1) {
      canvas.width *= dpr;
      canvas.height *= dpr;
      ctx.scale(dpr, dpr);
    }

    // draw pill background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    const radius = 20;
    const w = width;
    const h = height;
    // rounded rect
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.strokeStyle = hexToRgba(color, 0.28);
    ctx.lineWidth = 2;
    ctx.moveTo(radius, 0);
    ctx.arcTo(w, 0, w, h, radius);
    ctx.arcTo(w, h, 0, h, radius);
    ctx.arcTo(0, h, 0, 0, radius);
    ctx.arcTo(0, 0, w, 0, radius);
    ctx.fill();
    ctx.stroke();

    // draw colored dot
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(12 + 6, h / 2, 6, 0, Math.PI * 2);
    ctx.fill();

    // draw text
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = "middle";
    ctx.fillText(text, 12 + 12, h / 2);

    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    return { texture, width: w, height: h };
  };

  // Decide which skills will use sprite textures (to reduce DOM/Html usage)
  const spriteSkills = React.useMemo(() => {
    if (veryLowPower || lowPower) return skillsToShow;
    if (midPower) {
      // use sprites for every other skill to halve Html nodes
      return skillsToShow.filter((_, idx) => idx % 2 === 0);
    }
    return [] as string[];
  }, [veryLowPower, lowPower, midPower, skillsToShow]);

  // Cache label textures for chosen sprite labels to avoid recreating canvases each frame
  const labelTextures = React.useMemo(() => {
    if (spriteSkills.length === 0)
      return {} as Record<string, { texture: CanvasTexture; width: number; height: number }>;

    const map: Record<string, { texture: CanvasTexture; width: number; height: number }> = {};
    for (const skill of spriteSkills) {
      const color = pickColor(skills.indexOf(skill), skill);
      const res = createLabelTexture(skill, color) as { texture: CanvasTexture; width: number; height: number } | null;
      if (res && res.texture) {
        map[skill] = res as { texture: CanvasTexture; width: number; height: number };
      }
    }
    return map;
  }, [spriteSkills]);

  // Dispose textures when they change/unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      try {
        Object.values(labelTextures).forEach((l) => {
          if (l?.texture && typeof l.texture.dispose === "function") l.texture.dispose();
        });
      } catch {
        // ignore disposal errors in older browsers
      }
    };
  }, [labelTextures]);

  return (
    <motion.div
      ref={containerRef}
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
        className="skillglobe-canvas"
        frameloop={paused ? "demand" : "always"}
        dpr={[1, dprMax]}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          position: "relative",
          zIndex: 1,
          cursor: paused ? "default" : "grab"
        }}
        camera={{ position: [0, 0, 700], fov: 50 }}
        gl={{ preserveDrawingBuffer: !lowPower, alpha: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          onStart={() => {
            // toggle dragging cursor on this globe's canvas only
            document.querySelector(".skillglobe-canvas")?.classList.add("dragging");
          }}
          onEnd={() => {
            document.querySelector(".skillglobe-canvas")?.classList.remove("dragging");
          }}
        />
        <RotatingGlobe paused={paused}>
          {/* Invisible globe mesh for reference only */}
          <mesh>
            {/* geometry detail scales with device capability */}
            <sphereGeometry args={[globeRadius, geomSegments, geomSegments]} />
            <meshStandardMaterial color="#6C63FF" opacity={0} transparent />
          </mesh>
          {/* Skill spheres distributed on globe */}
          {skillsToShow.map((skill, i) => {
            const originalIndex = lowPower ? skills.indexOf(skill) : i;
            const basePhi = Math.acos(-1 + (2 * originalIndex) / skills.length);
            const baseTheta = Math.sqrt(skills.length * Math.PI) * basePhi;
            const phiRand = basePhi + (randomOffsets[originalIndex]?.phi ?? 0);
            const thetaRand = baseTheta + (randomOffsets[originalIndex]?.theta ?? 0);
            const r = globeRadius;
            const x = r * Math.cos(thetaRand) * Math.sin(phiRand);
            const y = r * Math.sin(thetaRand) * Math.sin(phiRand);
            const z = r * Math.cos(phiRand);
            const color = pickColor(originalIndex, skill);
            const overlay = hexToRgba(color, 0.18);
            // use low-cost sprites on low-power devices; Html otherwise
            if (lowPower) {
              const label = labelTextures[skill] ?? createLabelTexture(skill, color);
              // fallback to Html if texture couldn't be created
              if (!label) {
                return (
                  <Html key={skill} position={[x, y, z]} center style={{ pointerEvents: "auto" }}>
                    <span style={{ padding: 8, background: "rgba(255,255,255,0.04)", borderRadius: 999 }}>{skill}</span>
                  </Html>
                );
              }
              // sprite size scaled down for 3D world; convert px -> world units
              const scaleFactor = veryLowPower ? 0.28 : 0.4; // smaller on very low-power
              const spriteW = (label.width / 100) * scaleFactor;
              const spriteH = (label.height / 100) * scaleFactor;
              return (
                <sprite key={skill} position={[x, y, z]} scale={[spriteW, spriteH, 1]}>
                  <spriteMaterial attach="material" map={label.texture} depthTest={true} transparent={true} />
                </sprite>
              );
            }
            return (
              <Html key={skill} position={[x, y, z]} center style={{ pointerEvents: "auto" }}>
                <span
                  role="button"
                  tabIndex={0}
                  className={`min-w-[92px] px-3 py-1.5 rounded-full font-semibold text-sm antialiased flex items-center justify-center text-center gap-2 transform-gpu transition-all duration-300 cursor-not-allowed`}
                  onPointerDown={(e) => e.stopPropagation()}
                  onPointerMove={(e) => e.stopPropagation()}
                  onPointerUp={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateZ(0) scale(1.08)";
                    el.style.boxShadow = `0 18px 40px ${hexToRgba(color, 0.22)}, inset 0 1px 0 rgba(255,255,255,0.03)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateZ(0) scale(1)";
                    el.style.boxShadow = `0 10px 28px ${hexToRgba(color, 0.16)}, inset 0 1px 0 rgba(255,255,255,0.02)`;
                  }}
                  onFocus={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateZ(0) scale(1.08)";
                    el.style.boxShadow = `0 18px 40px ${hexToRgba(color, 0.22)}, inset 0 1px 0 rgba(255,255,255,0.03)`;
                  }}
                  onBlur={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateZ(0) scale(1)";
                    el.style.boxShadow = `0 10px 28px ${hexToRgba(color, 0.16)}, inset 0 1px 0 rgba(255,255,255,0.02)`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateZ(0) scale(1.06)";
                      setTimeout(() => (el.style.transform = "translateZ(0) scale(1.08)"), 120);
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  style={{
                    userSelect: "none",
                    fontFamily:
                      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                    color: color,
                    textShadow: `0 1px 0 rgba(255,255,255,0.85), 0 2px 8px ${hexToRgba("#000000", 0.32)}`,
                    background: `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008))`,
                    border: `2px solid ${hexToRgba(color, 0.3)}`,
                    backgroundImage: `radial-gradient(100% 60% at 10% 20%, ${overlay}, transparent 35%)`,
                    boxShadow: `0 10px 28px ${hexToRgba(color, 0.16)}, inset 0 1px 0 rgba(255,255,255,0.02)`,
                    backdropFilter: "saturate(140%) blur(6px)",
                    filter: `drop-shadow(0 3px 10px ${hexToRgba(color, 0.1)})`,
                    outline: "none"
                  }}>
                  <span
                    aria-hidden
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 9999,
                      background: color,
                      border: `2px solid rgba(255,255,255,0.10)`,
                      boxShadow: `0 3px 8px ${hexToRgba(color, 0.3)}`
                    }}
                  />
                  <span style={{ lineHeight: 1 }}>{skill}</span>
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
