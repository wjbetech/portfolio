import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar bg-content text-secondary-content px-4 w-full fixed top-0 left-0 z-50">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-2xl tracking-widest"
          id="title"
          href="#home"
        >
          wjbetech
        </a>
      </div>
      <div className="flex-none">
        {/* Desktop menu */}
        <ul className="menu menu-horizontal px-1 gap-4 hidden lg:flex">
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
        {/* Mobile dropdown */}
        <div className="dropdown dropdown-end lg:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle cursor-pointer"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            onClick={() => setMenuOpen(false)}
          >
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
      </div>
    </nav>
  );
}
