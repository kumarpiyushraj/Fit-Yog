import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeSection, setActiveSection] = useState("bookings");

  const [classData, setClassData] = useState({
    title: "",
    description: "",
    instructor: "",
    schedule: "",
    duration: "",
    category: "",
  });

  const [videoData, setVideoData] = useState({
    title: "",
    url: "",
    category: "",
  });

  useEffect(() => {
    if (activeSection === "bookings") {
      fetchBookings();
    }
    if (activeSection === "reviews") {
      fetchReviews();
    }
  }, [activeSection]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/bookings",
        { withCredentials: true }
      );
      console.log("Fetched bookings:", response.data);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      alert(`Booking Removed Successfully!`);
      fetchBookings();
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/reviews",
        {
          withCredentials: true,
        }
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/reviews/${id}`, {
        withCredentials: true,
      });
      alert(`Review Deleted Successfully!`);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Updated handleSubmit function with full URL
  const handleSubmit = async (e, section, data, resetForm) => {
    e.preventDefault();
    try {
      let endpoint = "";
      switch (section) {
        case "class":
          endpoint = "http://localhost:5000/api/admin/classes";
          break;
        case "video":
          endpoint = "http://localhost:5000/api/admin/videos";
          break;
        default:
          throw new Error("Invalid section");
      }
      await axios.post(endpoint, data, { withCredentials: true });
      alert(`${section.toUpperCase()} Submitted Successfully!`);
      resetForm();
    } catch (error) {
      console.error(
        `Error submitting ${section.toUpperCase()}:`,
        error.response ? error.response.data : error
      );
      alert(`Failed to submit ${section.toUpperCase()}.`);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <button onClick={() => setActiveSection("bookings")}>
          Manage Bookings
        </button>
        <button onClick={() => setActiveSection("classes")}>Add Classes</button>
        <button onClick={() => setActiveSection("videos")}>Add Videos</button>
        <button onClick={() => setActiveSection("reviews")}>
          Manage Reviews
        </button>
      </div>

      <div className="main-content">
        {activeSection === "bookings" && (
          <div className="card">
            <h3 className="lbltxt">Bookings</h3>
            {bookings.length === 0 ? (
              <p>No Bookings Available</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Seats</th>
                    <th>Price paid (₹)</th>
                    <th>Package</th>
                    <th>Booking Date & Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.userName}</td>
                      <td>{booking.email}</td>
                      <td>{booking.phone}</td>
                      <td>{booking.seatsBooked}</td>
                      <td>{booking.pricePaid}</td>
                      <td>
                        {booking.packageId
                          ? booking.packageId.name
                          : "Unknown Package"}
                      </td>
                      <td>
                        {booking.bookingDate
                          ? new Date(booking.bookingDate).toLocaleString()
                          : "N/A"}
                      </td>
                      <td>
                        <button onClick={() => cancelBooking(booking._id)}>
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeSection === "classes" && (
          <div className="card">
            <h3 className="lbltxt">Add Class</h3>
            <form
              onSubmit={(e) =>
                handleSubmit(e, "class", classData, () =>
                  setClassData({
                    title: "",
                    description: "",
                    instructor: "",
                    schedule: "",
                    duration: "",
                    category: "",
                  })
                )
              }
            >
              {Object.keys(classData).map((key) => (
                <div className="form-group" key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <input
                    type="text"
                    value={classData[key]}
                    onChange={(e) =>
                      setClassData({ ...classData, [key]: e.target.value })
                    }
                    required
                  />
                </div>
              ))}
              <button type="submit" className="submit-btn">
                ADD
              </button>
            </form>
          </div>
        )}

        {activeSection === "videos" && (
          <div className="card">
            <h3 className="lbltxt">Add Video</h3>
            <form
              onSubmit={(e) =>
                handleSubmit(e, "video", videoData, () =>
                  setVideoData({ title: "", url: "", category: "" })
                )
              }
            >
              {Object.keys(videoData).map((key) => (
                <div className="form-group" key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <input
                    type="text"
                    value={videoData[key]}
                    onChange={(e) =>
                      setVideoData({ ...videoData, [key]: e.target.value })
                    }
                    required
                  />
                </div>
              ))}
              <button type="submit" className="submit-btn">
                ADD
              </button>
            </form>
          </div>
        )}

        {activeSection === "reviews" && (
          <div className="card">
            <h3 className="lbltxt">Reviews</h3>
            {reviews.length === 0 ? (
              <p>
                <strong>No Reviews Available</strong>
              </p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review._id}>
                      <td>{review.username}</td>
                      <td>{review.rating}</td>
                      <td>{review.comment}</td>
                      <td>
                        <button onClick={() => deleteReview(review._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
