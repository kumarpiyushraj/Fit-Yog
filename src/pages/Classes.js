import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Classes.css";
import "../styles/GlobalTitle.css";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/classes")
      .then((response) => setClasses(response.data))
      .catch(() => setError("Error fetching classes"));
  }, []);

  return (
    <div className="fade-in classes-section">
      <h1 className="page-title">Available Classes</h1>
      <div className="class-grid">
        {error && <p>{error}</p>}
        {classes.map((cls) => (
          <div key={cls._id} className="class-card">
            <h3 className="class-title">{cls.title}</h3>
            <p className="class-description">{cls.description}</p>
            <div className="class-details">
              {cls.instructor && (
                <p>
                  <strong>Instructor:</strong> {cls.instructor}
                </p>
              )}
              {cls.schedule && (
                <p>
                  <strong>Schedule:</strong> {cls.schedule}
                </p>
              )}
              {cls.duration && (
                <p>
                  <strong>Duration:</strong> {cls.duration}
                </p>
              )}
              {cls.category && (
                <p>
                  <strong>Category:</strong> {cls.category}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classes;
