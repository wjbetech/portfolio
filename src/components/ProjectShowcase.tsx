import React, { useState } from "react";

const placeholderImages = [
  "https://placehold.co/600x400?text=Image+1",
  "https://placehold.co/600x400?text=Image+2",
  "https://placehold.co/600x400?text=Image+3",
  "https://placehold.co/600x400?text=Image+4",
];

const ProjectShowcase: React.FC = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex flex-row gap-6 items-center justify-center w-full">
      <div>
        <img
          src={placeholderImages[selected]}
          alt={`Selected project screenshot`}
          className="w-72 h-[352px] object-cover rounded-xl border-4 border-primary shadow-lg transition-all duration-200"
        />
      </div>
      <div className="flex flex-col gap-4 h-[352px] justify-center">
        {placeholderImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`Project screenshot ${idx + 1}`}
            className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selected === idx
                ? "border-primary scale-110"
                : "border-base-300 opacity-70 hover:opacity-100"
            }`}
            onClick={() => setSelected(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;
