import React from "react";
import { motion } from "framer-motion";
import { useRef } from "react";

const techStack = [
  { label: "React", className: "badge badge-primary" },
  { label: "TypeScript", className: "badge badge-secondary" },
  { label: "Vite", className: "badge badge-accent" },
  { label: "TailwindCSS", className: "badge badge-info" },
  { label: "DaisyUI", className: "badge badge-success" },
  { label: "GitHub", className: "badge badge-warning" },
  { label: "Next.js", className: "badge badge-error" },
  { label: "JavaScript", className: "badge badge-primary" },
  { label: "DaisyUI", className: "badge badge-secondary" },
  { label: "HTML", className: "badge badge-accent" },
  { label: "CSS", className: "badge badge-info" },
  { label: "MaterialUI", className: "badge badge-success" },
  { label: "Shadcn", className: "badge badge-warning" }
];

const ORBIT_RADIUS = 120;

const GlobeOrbit: React.FC = () => {
  return (
    <div
      style={{
        perspective: 600,
        width: 2 * ORBIT_RADIUS,
        height: 2 * ORBIT_RADIUS,
        margin: "0 auto",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      aria-label="Animated tech stack globe">
      {techStack.map((tech, i) => {
        // Distribute badges in a circle
        const angle = (i / techStack.length) * 2 * Math.PI;
        const x = ORBIT_RADIUS * Math.cos(angle);
        const y = ORBIT_RADIUS * Math.sin(angle);
        return (
          <motion.span
            key={tech.label + i}
            className={tech.className}
            style={{
              position: "absolute",
              left: ORBIT_RADIUS + x,
              top: ORBIT_RADIUS + y,
              transform: `translate(-50%, -50%)`,
              fontSize: "1.1rem",
              cursor: "pointer",
              boxShadow: "none"
            }}
            whileHover={{ scale: 1.2, rotateZ: 10 }}
            whileTap={{ scale: 0.95 }}
            tabIndex={0}
            aria-label={tech.label}>
            {tech.label}
          </motion.span>
        );
      })}
    </div>
  );
};

const Hero: React.FC = () => (
  <>
    <section className="w-screen h-screen flex flex-row items-center justify-center bg-base-100 overflow-x-hidden relative -mt-24">
      <div className="flex flex-col items-end justify-center w-2/5 h-full pr-12 text-right">
        <div className="relative pr-8">
          <div
            className="absolute top-1 bottom-1 right-0 w-1 bg-primary rounded-full"
            style={{ height: "94%" }}
            aria-hidden="true"></div>
          <img
            src="/src/assets/wjbe.png"
            alt="William East profile"
            className="rounded-full w-40 h-40 mb-4 border-4 border-primary ml-auto"
          />
          <h1 className="text-5xl font-bold mb-2">William East</h1>
          <p className="text-xl font-semibold mb-2">Full-stack Developer</p>
          <p className="text-xl mb-4">Native to UK - living in Seoul, Korea</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-3/5 h-full pl-8">
        <GlobeOrbit />
      </div>
      <button className="btn btn-primary btn-lg absolute left-1/2 -translate-x-1/2 bottom-8">See My Work ↓</button>
    </section>
  </>
);

export default Hero;
