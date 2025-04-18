import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserBookings.css";
import "../styles/GlobalTitle.css";

function UserBookings({ currentUser }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/userbookings", {
          withCredentials: true,
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      }
    };

    if (currentUser) {
      fetchBookings();
    }
  }, [currentUser]);

  return (
    <div className="fade-in bookings-page">
      <h1 className="page-title">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>
          <strong>No bookings found.</strong>
        </p>
      ) : (
        <div className="booking-cards">
          {bookings.map((booking, index) => (
            <div className="booking-card" key={index}>
              <h3 id="pkgnm">{booking.packageId?.name}</h3>
              <p>
                <strong>Seats Booked:</strong> {booking.seatsBooked}
              </p>
              <p>
                <strong>Price Paid:</strong> ₹{booking.pricePaid}
              </p>
              <p>
                <strong>Contact:</strong> {booking.phone}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBookings;
