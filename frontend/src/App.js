import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Packages from "./pages/Packages";
import Booking from "./pages/Booking";
import Classes from "./pages/Classes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import Videos from "./pages/Videos";
import UserBookings from "./pages/UserBookings";
import Reviews from "./components/Reviews";
import Layout from "./components/Layout";
import "./styles/App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/currentUser", { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          setCurrentUser(response.data.user);
        }
      })
      .catch(() => setCurrentUser(null));
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

        <Layout>
          <Routes>
            <Route path="/" element={<Home currentUser={currentUser} />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/packages"
              element={<Packages currentUser={currentUser} />}
            />
            <Route path="/booking" element={<Booking />} />
            <Route path="/classes" element={<Classes />} />
            <Route
              path="/login"
              element={<Login setCurrentUser={setCurrentUser} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/admin-login"
              element={<AdminLogin setCurrentUser={setCurrentUser} />}
            />
            <Route path="/videos" element={<Videos />} />
            <Route
              path="/userbookings"
              element={<UserBookings currentUser={currentUser} />}
            />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </Layout>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
