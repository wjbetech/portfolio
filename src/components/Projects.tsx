import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Project1 from "./Project1";
import Project2 from "./Project2";
import Project3 from "./Project3";
import Project4 from "./Project4";
import Project5 from "./Project5";

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const projectTabs = [
    { name: "Atomology", component: <Project1 /> },
    { name: "kiip-prep", component: <Project2 /> },
    { name: "sodraidcomp", component: <Project3 /> },
    { name: "wordweb.", component: <Project4 /> },
    { name: "Zenite", component: <Project5 /> }
  ];
  const renderProject = () => projectTabs[activeTab]?.component;
  return (
    <section
      id="projects"
      className="w-full min-h-screen flex flex-col items-center justify-center bg-base-100 overflow-x-hidden py-20">
      <h2 className="text-4xl font-bold mb-8">Projects</h2>
      {/* Nav-style project bar: subtle border, evenly distributed buttons */}
      <div className="w-full max-w-5xl mx-4 md:mx-0 mb-8">
        <div className="relative">
          {/* stronger top hairline for clearer separation */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 1,
              background: "linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0.10), rgba(0,0,0,0))",
              pointerEvents: "none"
            }}
          />

          {/* main nav: slightly darker glass background + subtle bottom hairline */}
          <nav
            role="tablist"
            aria-label="Projects"
            className="w-full bg-[rgba(255,255,255,0.06)] border-b border-base-300 px-3 py-2 flex items-center overflow-x-auto"
            style={{ backdropFilter: "saturate(130%) blur(6px)" }}>
            <div className="flex w-full items-center justify-between gap-4">
              {projectTabs.map((tab, idx) => (
                <button
                  id={`project-tab-${idx}`}
                  key={tab.name}
                  role="tab"
                  aria-selected={activeTab === idx}
                  aria-controls={`project-panel-${idx}`}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 text-center px-3 py-2 rounded-md transition-transform cursor-pointer ${
                    activeTab === idx
                      ? "bg-primary text-white shadow-md"
                      : "bg-transparent text-base-content/95 hover:bg-base-200"
                  }`}>
                  {tab.name}
                </button>
              ))}
            </div>
          </nav>

          {/* colored blurred accent below the bar (kept but toned down) */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "6%",
              right: "6%",
              bottom: -6,
              height: 8,
              borderRadius: 9999,
              background: "linear-gradient(90deg, rgba(108,99,255,0.10), rgba(6,182,212,0.07), rgba(249,115,22,0.06))",
              filter: "blur(10px)",
              opacity: 0.95,
              pointerEvents: "none"
            }}
          />
        </div>
      </div>
      <div className="w-full max-w-5xl bg-base-100 rounded-lg p-6 md:p-8 shadow-none mx-4 md:mx-0">
        <AnimatePresence mode="wait">
          <motion.div
            id={`project-panel-${activeTab}`}
            key={activeTab}
            role="region"
            aria-labelledby={`project-tab-${activeTab}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full">
            {renderProject()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
