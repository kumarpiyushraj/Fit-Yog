import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Navbar.css";
import logo from "../assets/images/favicon.ico";

function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [authMenuOpen, setAuthMenuOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/logout",
        {},
        { withCredentials: true }
      );
      setCurrentUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const toggleAuthMenu = () => {
    setAuthMenuOpen((prev) => !prev);
  };

  const isAdmin = currentUser?.role === "admin";
  const isUser = currentUser && !isAdmin;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-img-container">
          <img src={logo} alt="Fit-Yoga Logo" className="logo-img" />
        </div>
        <Link to="/" className="logo-text">
          Fit-Yoga
        </Link>
      </div>

      <div className="nav-links">
        {/* If NO ONE is logged in */}
        {!currentUser && (
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/videos">Videos</Link>
            <div className="auth-dropdown">
              <button onClick={toggleAuthMenu} className="auth-btn">
                Sign In
              </button>
              {authMenuOpen && (
                <div className="auth-menu">
                  <Link to="/login" onClick={() => setAuthMenuOpen(false)}>
                    User Login
                  </Link>
                  <Link
                    to="/admin-login"
                    onClick={() => setAuthMenuOpen(false)}
                  >
                    Admin Login
                  </Link>
                  <Link to="/signup" onClick={() => setAuthMenuOpen(false)}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

        {/* If a USER is logged in */}
        {isUser && (
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/classes">Classes</Link>
            <Link to="/packages">Packages</Link>
            <Link to="/videos">Videos</Link>
            <Link to="/userbookings">Bookings</Link>
            <Link to="/reviews">Reviews</Link>
            <span onClick={handleLogout} className="logout-btn">
              Logout
            </span>
          </>
        )}

        {/* If an ADMIN is logged in */}
        {isAdmin && (
          <span onClick={handleLogout} className="logout-btn">
            Logout
          </span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
