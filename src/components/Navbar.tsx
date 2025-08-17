import { useState } from "react";
import { FaBars, FaTimes, FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAbout = location.pathname === "/about";

  return (
    <nav className="navbar bg-base-100 text-secondary-content px-4 w-full fixed top-0 left-0 z-60 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-2xl tracking-widest" id="title" to="/">
          wjbetech
        </Link>
      </div>
      <div className="flex-none">
        {/* Desktop menu */}
        <ul className="menu menu-horizontal px-1 gap-4 hidden lg:flex text-accent-content">
          {isAbout ? (
            <li>
              <button
                type="button"
                className="flex items-center gap-2 btn btn-ghost"
                onClick={() => navigate(-1)}>
                <FaArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </>
          )}
        </ul>
        {/* Mobile dropdown */}
        <div className="dropdown dropdown-end lg:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle cursor-pointer"
            onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-1 z-70 p-2 shadow bg-base-100 rounded-box w-52"
            onClick={() => setMenuOpen(false)}>
            {isAbout ? (
              <li>
                <button type="button" className="w-full text-left" onClick={() => navigate(-1)}>
                  <FaArrowLeft className="inline-block mr-2" /> Back
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <a href="#projects">Projects</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
