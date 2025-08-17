import React from "react";
import SkillGlobe from "./SkillGlobe";

const Hero: React.FC = () => (
  <>
    <section className="w-full flex flex-col lg:flex-row items-center justify-start bg-base-100 overflow-x-hidden relative pt-12 lg:pt-0">
      <div className="w-full lg:w-2/5 transform-gpu origin-top scale-95 lg:scale-100 flex flex-col items-center justify-center px-4 lg:pr-12 text-center lg:text-right pt-12 lg:h-screen lg:pt-0">
        <div className="relative w-full lg:pr-12 xl:pr-24 2xl: pr-36">
          <div
            className="hidden lg:block absolute top-1 bottom-1 right-0 w-1 bg-primary rounded-full"
            style={{ height: "94%" }}
            aria-hidden="true"></div>
          <img
            src="/src/assets/wjbe.png"
            alt="William East profile"
            className="rounded-full w-40 h-40 sm:w-48 sm:h-48 lg:w-40 lg:h-40 mb-4 border-4 border-primary justify-self-center lg:justify-self-end"
          />
          <h1 className="text-5xl sm:text-6xl lg:text-5xl text-secondary-content font-bold mb-2">William East</h1>
          <p className="text-xl sm:text-2xl lg:text-xl font-semibold mb-2">Full-stack Developer</p>
          <p className="text-xl sm:text-2xl lg:text-xl mb-4">Native to UK - living in Seoul, Korea</p>
        </div>
      </div>
      <div className="w-full lg:w-3/5 transform-gpu origin-top scale-95 lg:scale-100 flex flex-col items-center justify-center px-4 lg:pl-8 lg:pt-0">
        <SkillGlobe />
      </div>
      {/* Scroll down indicator */}
      <div
        className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bottom-14 flex-col items-center select-none cursor-pointer z-10"
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
