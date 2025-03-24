import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router"; // Fixed incorrect import

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar fixed top-0 left-0 w-full bg-white bg-opacity-90 shadow-md backdrop-blur-md z-50 px-6">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 p-2 bg-base-100 rounded-box shadow z-10"
          >
            <li><Link to="/">Home</Link></li>
            {user && (
              <>
                <li><Link to="/update-profile">Update Profile</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
              </>
            )}
          </ul>
        </div>
        {/* Stylish Snizy Logo */}
        <Link to="/" className="btn btn-ghost text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide">
        SIGNZY✨
        </Link>
      </div>

      {/* Center Navigation (Visible on larger screens) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li><Link to="/" className="hover:text-primary">Home</Link></li>
          {user && (
            <>
              <li><Link to="/update-profile" className="hover:text-primary">Update Profile</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* User Authentication Section */}
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Welcome, {user.username}!</span>
            <button onClick={logout} className="btn btn-error btn-sm">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
            <Link to="/signup" className="btn btn-secondary btn-sm">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
