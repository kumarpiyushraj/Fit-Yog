import React from "react";
import "../styles/About.css";

function About() {
  return (
    <div className="fade-in about-section">
      <h1 className="about-title">About Us</h1>
      <div className="about-container">
        <div className="about-card">
          <h2>Who We Are</h2>
          <p className="about-content">
            Welcome to Fit-Yoga! We are committed to bringing you the best yoga
            classes, tutorials, and wellness tips to enhance your lifestyle.
          </p>
        </div>

        <div className="about-card">
          <h2>Our Mission</h2>
          <p className="about-content">
            Our goal is to promote health and mindfulness through expert-led
            yoga sessions, making wellness accessible to everyone.
          </p>
        </div>

        <div className="about-card">
          <h2>Why Choose Us?</h2>
          <p className="about-content">
            With experienced trainers, personalized plans, and a supportive
            community, we ensure you get the best yoga experience possible.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
