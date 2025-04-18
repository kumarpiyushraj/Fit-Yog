import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Reviews.css";
import "../styles/GlobalTitle.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/reviews")
      .then((response) => setReviews(response.data))
      .catch(() => setError("Error fetching reviews"));
  }, []);

  // Function to render star ratings
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="fade-in reviews-section">
      <h2 className="page-title">User Reviews</h2>
      <div className="review-grid">
        {error && <p>{error}</p>}
        {reviews.map((review) => (
          <div key={review._id} className="review-card">
            <h3>{review.username}</h3>
            <p className="star-rating">{renderStars(review.rating)}</p>
            <p className="review-text">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;