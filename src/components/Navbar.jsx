import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar  shadow-sm p-4">
      <div className="navbar-start">
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
            <li>
              <Link to="/">Home</Link>
            </li>
            {user && (
              <>
              <li>
                <Link to="/update-profile">Update Profile</Link>
              </li>
              <li>
                <Link to="/dashboard"> Dashboard</Link>
              </li>
            </>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Friend App
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/update-profile">Update Profile</Link>
              </li>
              <li>
                <Link to="/dashboard"> Dashboard</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.username}!</span>
            <button onClick={logout} className="btn btn-error">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary mr-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
