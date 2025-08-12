import React from "react";
import SkillGlobe from "./SkillGlobe";

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
        <SkillGlobe />
      </div>
      {/* Scroll down indicator */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center select-none cursor-pointer z-10"
        onClick={() => {
          const el = document.getElementById("projects");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }}>
        <span className="animate-bounce text-4xl text-primary drop-shadow-lg">↓</span>
        <span className="text-xs mt-1 text-primary-content opacity-70">Scroll</span>
      </div>
    </section>
  </>
);

export default Hero;
