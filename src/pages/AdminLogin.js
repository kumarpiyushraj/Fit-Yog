import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function AdminLogin({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setEmail("");
    setPassword("");
    setMessage("");
  }, [location]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/login",
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.user.role !== "admin") {
          setMessage("Access denied: Not an admin.");
          return;
        }
        setMessage(response.data.message);
        setCurrentUser(response.data.user);
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 500);
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || "Invalid credentials");
      });
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Admin Sign In</h2>
        <p className="login-subtitle">Enter your admin credentials.</p>
        <form onSubmit={handleAdminLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter admin email"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter admin password"
            />
          </div>
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;
