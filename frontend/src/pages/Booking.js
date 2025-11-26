// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles/Pages.css';

// function Booking() {
//   const [bookings, setBookings] = useState([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/bookings', { withCredentials: true })
//       .then(response => setBookings(response.data))
//       .catch(error => setMessage('Error fetching bookings'));
//   }, []);

//   return (
//     <div className="fade-in">
//       <h2 className="page-title">Your Bookings</h2>
//       {message && <p>{message}</p>}
//       <ul>
//         {bookings.map(booking => (
//           <li key={booking._id}>
//             {booking.class.title} - {booking.class.schedule}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Booking;