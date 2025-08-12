import React from "react";

const Projects: React.FC = () => (
  <section className="w-screen h-screen flex flex-col items-center justify-center bg-base-200 overflow-x-hidden">
    {/* TODO: Add interactive multi-tab project panels */}
    <h2 className="text-4xl font-bold mb-8">Projects</h2>
    <div className="tabs tabs-boxed mb-8">
      <a className="tab tab-active">Project 1</a>
      <a className="tab">Project 2</a>
      <a className="tab">Project 3</a>
    </div>
    <div className="w-full max-w-2xl bg-base-100 rounded-lg p-8 shadow-none">
      {/* Project details go here */}
      <p className="text-lg">Select a project tab to view details.</p>
    </div>
  </section>
);

export default Projects;
