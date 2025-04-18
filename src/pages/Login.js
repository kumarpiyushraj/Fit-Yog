import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Login({ setCurrentUser }) {
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

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/login",
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        setMessage(response.data.message);
        setCurrentUser(response.data.user);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || "Invalid credentials");
      });
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Sign In to Fit-Yoga</h2>
        <p className="login-subtitle">
          Welcome back! Please enter your credentials.
        </p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
