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
      className="w-full flex flex-col items-center justify-center bg-base-100 overflow-x-hidden py-20">
      <h2 className="text-4xl font-bold mb-8">Projects</h2>
      <div className="flex flex-col md:flex-row gap-4 tabs tabs-boxed mb-8">
        {projectTabs.map((tab, idx) => (
          <button
            key={tab.name}
            className={`tab${activeTab === idx ? " tab-active" : ""}`}
            onClick={() => setActiveTab(idx)}>
            {tab.name}
          </button>
        ))}
      </div>
      <div className="w-full max-w-5xl bg-base-100 rounded-lg p-6 md:p-8 shadow-none mx-4 md:mx-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="">
            {renderProject()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
