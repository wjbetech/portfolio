type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="navbar bg-accent text-primary-content px-4 w-full fixed top-0 left-0 z-50">
      <div className="flex-1">
        <a
          className="btn btn-ghost normal-case text-2xl font-mono tracking-widest"
          href="#home"
        >
          Will's Portfolio
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
