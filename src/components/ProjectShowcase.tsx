import React, { useState } from "react";

const placeholderImages = [
  "https://placehold.co/600x400?text=Image+1",
  "https://placehold.co/600x400?text=Image+2",
  "https://placehold.co/600x400?text=Image+3",
  "https://placehold.co/600x400?text=Image+4"
];

const ProjectShowcase: React.FC = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="w-full">
      {/* main image on top for small screens, left for md+ */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 w-full">
        <div className="w-full md:flex-1 flex items-center justify-center">
          <img
            src={placeholderImages[selected]}
            alt={`Selected project screenshot`}
            className="w-full max-w-[680px] h-auto md:flex-1 md:h-[420px] object-cover rounded-lg border-2 md:border-4 border-primary transition-all duration-200"
          />
        </div>

        <div className="flex flex-row md:flex-col gap-3 md:gap-4 items-center md:items-start justify-center md:justify-start">
          {placeholderImages.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Project screenshot ${idx + 1}`}
              className={`w-14 h-14 md:w-20 md:h-20 object-cover rounded-md border-2 cursor-pointer transition-all duration-200 ${
                selected === idx ? "border-primary scale-110" : "border-base-300 opacity-70 hover:opacity-100"
              }`}
              onClick={() => setSelected(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
