require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const User = require("./models/User");
const Class = require("./models/Class");
const Package = require("./models/Package");
const Booking = require("./models/Booking");
const Review = require("./models/Review");
const Video = require("./models/Video");

const app = express();

// Middleware configuration
app.use(
  cors({
    origin: "http://localhost:3000", // React frontend on PORT 3000
    credentials: true,
  })
);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretkey123",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  })
);

// Connecting to MongoDB using .env variable
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Authenticate Admin Middleware
const authenticateAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Registration Endpoint
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    // In production, hash the password before saving!
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login Endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    // Save session info
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    res.json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout Endpoint
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
});

// Get Current Session User
app.get("/api/currentUser", (req, res) => {
  res.json({ user: req.session.user || null });
});

// Get available classes
app.get("/api/classes", async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// To show bookings for the logged in user
app.get("/api/userbookings", async (req, res) => {
  try {
    const userEmail = req.session.user?.email;
    if (!userEmail) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const bookings = await Booking.find({ email: userEmail })
      .sort({ date: -1 })
      .populate("packageId");

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Booking API - Ensure it properly saves to MongoDB
app.post("/api/bookings", async (req, res) => {
  try {
    const { packageId, userName, email, phone, seatsBooked, totalPrice } =
      req.body;

    if (
      !packageId ||
      !userName ||
      !email ||
      !phone ||
      !seatsBooked ||
      totalPrice === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const packageToBook = await Package.findById(packageId);
    if (!packageToBook) {
      return res.status(404).json({ message: "Package not found" });
    }

    if (packageToBook.availableSeats < seatsBooked) {
      return res.status(400).json({ message: "Not enough available seats." });
    }

    packageToBook.availableSeats -= seatsBooked;
    await packageToBook.save();

    const newBooking = new Booking({
      packageId,
      userName,
      email,
      phone,
      seatsBooked,
      pricePaid: totalPrice,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking confirmed successfully!" });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Get all reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/packages", async (req, res) => {
  try {
    const packages = await Package.find(
      {},
      { name: 1, price: 1, duration: 1, details: 1, availableSeats: 1 }
    );
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages" });
  }
});

// Get videos (data is fetched from the 'videos' collection in the database)
app.get("/api/videos", async (req, res) => {
  try {
    const videos = await mongoose.connection.db
      .collection("videos")
      .find()
      .toArray();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Protect the admin dashboard
app.get("/api/admin-dashboard", authenticateAdmin, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});

// Admin - Get all bookings
app.get("/api/admin/bookings", authenticateAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("packageId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin - Cancel a booking
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the booking
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Restore available seats in the package
    const packageToUpdate = await Package.findById(booking.packageId);
    if (packageToUpdate) {
      packageToUpdate.availableSeats += booking.seatsBooked;
      await packageToUpdate.save();
    }

    // Delete booking
    await Booking.findByIdAndDelete(id);
    res.json({ message: "Booking canceled successfully" });
  } catch (error) {
    console.error("Error canceling booking:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin - Add a new class
app.post("/api/admin/classes", authenticateAdmin, async (req, res) => {
  try {
    const { title, description, instructor, schedule, duration, category } =
      req.body;

    if (
      !title ||
      !description ||
      !instructor ||
      !schedule ||
      !duration ||
      !category
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newClass = new Class({
      title,
      description,
      instructor,
      schedule,
      duration,
      category,
    });
    await newClass.save();
    res.status(201).json({ message: "Class added successfully!" });
  } catch (error) {
    console.error("Error adding class:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin - Add a video
app.post("/api/admin/videos", authenticateAdmin, async (req, res) => {
  try {
    const { title, url, category } = req.body;

    if (!title || !url || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newVideo = new Video({ title, url, category });
    await newVideo.save();

    res.status(201).json({ message: "Video added successfully!" });
  } catch (error) {
    console.error("Error adding video:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all reviews on the Admin Dashboard
app.get("/api/admin/reviews", authenticateAdmin, async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a review on the Admin Dashboard
app.delete("/api/admin/reviews/:id", authenticateAdmin, async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
