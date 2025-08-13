import React from "react";
import ProjectShowcase from "./ProjectShowcase";

const Project1: React.FC = () => (
  <div className="flex flex-col items-start">
    <h3 className="text-2xl font-bold mb-2">Project 1</h3>
    <p>This is the content for Project 1. Add your project details here.</p>
    <div className="mt-6 w-full flex justify-start">
      <ProjectShowcase />
    </div>
  </div>
);

export default Project1;
