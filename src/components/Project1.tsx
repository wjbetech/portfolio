import ProjectShowcase from "./ProjectShowcase";

const Project1: React.FC = () => (
  <div className="flex flex-col items-start w-full">
    <h3 className="text-2xl font-bold mb-2">Atomology</h3>
    <div className="flex flex-row w-full gap-8 mt-6">
      <div className="flex-1 min-w-0">
        <ProjectShowcase />
      </div>
      <div className="flex-1 min-w-0 max-h-[352px] overflow-y-auto bg-base-100 rounded-xl border border-base-300 p-4 shadow-inner">
        <p>
          {/* Add your detailed project description here. This section is scrollable if the text overflows. */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget
          aliquam massa nisl quis neque. Mauris non erat nec nulla dictum
          dictum. Etiam euismod, urna eu tincidunt consectetur, nisi nisl
          aliquam nunc, eget aliquam massa nisl quis neque.
        </p>
      </div>
    </div>
  </div>
);

export default Project1;
