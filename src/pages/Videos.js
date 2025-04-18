import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/VideoCard.css";
import "../styles/GlobalTitle.css";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/videos")
      .then((response) => setVideos(response.data))
      .catch(() => setError("Error fetching videos"));
  }, []);

  return (
    <div className="fade-in videos-section">
      <h2 className="page-title">Video Library</h2>
      <div className="video-grid">
        {error && <p>{error}</p>}
        {videos.map((video) => (
          <div key={video._id} className="video-card">
            <h3 className="video-title">{video.title}</h3>
            <iframe
              className="video-iframe"
              src={video.url}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p className="video-description">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Videos;