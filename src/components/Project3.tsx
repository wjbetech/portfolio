import ProjectShowcase from "./ProjectShowcase";

const Project3: React.FC = () => (
  <div className="flex flex-col items-start w-full">
    <h3 className="text-2xl font-bold mb-2 text-center m-auto">sodraidcomp</h3>
    <div className="flex flex-col md:flex-row w-full gap-6 mt-6">
      <div className="w-full md:w-2/3">
        <ProjectShowcase />
      </div>
      <div className="w-full md:w-2/3 max-h-[400px] overflow-y-auto bg-base-100 rounded-xl border border-base-300 p-4 shadow-inner">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur,
          nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris non erat nec nulla dictum dictum. Etiam
          euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Sed ut
          perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
        </p>
      </div>
    </div>
  </div>
);

export default Project3;
