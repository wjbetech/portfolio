import React from "react";
import SkillGlobe from "./SkillGlobe";
import { FiChevronDown } from "react-icons/fi";

const Hero: React.FC = () => (
  <>
    <section
      id="home"
      className="w-full flex flex-col lg:flex-row items-center justify-start bg-base-100 overflow-x-hidden relative pt-12 lg:pt-0">
      <div className="w-full lg:w-2/5 transform-gpu origin-top scale-95 lg:scale-100 flex flex-col items-center justify-center px-4 lg:pr-12 text-center lg:text-right pt-34 lg:h-screen lg:pt-0">
        <div className="relative w-full lg:pr-12 xl:pr-24">
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
      <div
        id="skills"
        className="w-full lg:w-3/5 transform-gpu origin-top scale-95 lg:scale-100 flex flex-col items-center justify-center px-4 lg:pl-8 lg:pt-0">
        <SkillGlobe />
      </div>
      {/* Scroll down indicator */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bottom-14 z-10">
        <button
          type="button"
          aria-label="Scroll to Projects"
          className="group inline-flex items-center justify-center focus:outline-none"
          onClick={() => {
            const el = document.getElementById("projects");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }}>
          <span
            className="flex items-center justify-center w-12 h-12 rounded-full bg-base-200/60 backdrop-blur-sm border border-primary/20 text-primary-content cursor-pointer transition-transform transform-gpu will-change-transform group-hover:scale-110 group-active:scale-95 motion-safe:animate-[bounce_1.2s_infinite] focus-visible:ring-4 focus-visible:ring-primary/30"
            aria-hidden="true">
            <FiChevronDown className="w-6 h-6" />
          </span>
        </button>
      </div>
    </section>
  </>
);

export default Hero;
