import { NavLink } from "react-router-dom";

export default function Navbar() {
  const baseStyle = "hover:text-blue-500";
  const activeStyle = "underline underline-offset-6 decoration-blue-300 text-lg";

  return (
    <nav className="flex items-center justify-between px-6 lg:px-16 py-4 bg-white shadow ">
      {/* Logo */}
      <NavLink to="/" className="text-2xl lg:text-3xl font-bold text-blue-600">
        FileKeep
      </NavLink>

      {/* Nav Links */}
      <div className="space-x-6 font-medium lg:text-xl text-gray-700">
        <NavLink
          to="/folders"
          // Add base style, if not active, do not apply active style
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          Folders
        </NavLink>

        <NavLink
          to="/files"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          Files
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ""}`
          }
        >
          About
        </NavLink>
      </div>
    </nav>
  );
}
