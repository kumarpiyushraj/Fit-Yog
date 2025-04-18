import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { motion } from "framer-motion";

const Home = ({ currentUser }) => {
  return (
    <div className="home-container">
      <div className="overlay"></div>
      <motion.div
        className="content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>
          The only platform you need for the wellness of your mind and body.
        </h1>
        <p id="home-p-text">"Welcome to your fitness journey :)"</p>
        <motion.div
          className="buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div id="home_btn">
            {!currentUser && ( // Hide Join Now if user is logged in
              <Link to="/signup" className="btn primary">
                Join Now
              </Link>
            )}
            <Link to="/videos" className="btn secondary">
              Explore Videos
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
