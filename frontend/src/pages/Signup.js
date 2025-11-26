import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Regex validation
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!nameRegex.test(username)) {
      setMessage(
        "Name must be at least 2 characters and contain only letters and spaces."
      );
      return;
    }
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    if (!passwordRegex.test(password)) {
      setMessage(
        "Password must be at least 6 characters long and include at least one letter and one number."
      );
      return;
    }

    axios
      .post(
        "http://localhost:5000/api/register",
        { username, email, password },
        { withCredentials: true }
      )
      .then((response) => {
        setMessage(response.data.message);
        setUsername("");
        setEmail("");
        setPassword("");
        // After successful signup, redirect to login page
        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch((error) => {
        console.error("Signup error:", error);
        setMessage(error.response?.data?.message || "Signup failed");
      });
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h2 className="signup-title">Create Your Account</h2>
        <p className="signup-subtitle">Join us and start your journey today!</p>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your full name"
              pattern="^[A-Za-z\s]{2,}$"
              title="Name must be at least 2 characters and contain only letters and spaces"
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$"
              title="Enter a valid email address"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a secure password"
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
              title="Password must be at least 6 characters long and include at least one letter and one number"
            />
          </div>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
        {message && <p className="signup-message">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
