🧘‍♀️ Fit‑Yoga: Your Ultimate Wellness Platform 💪
Welcome to Fit‑Yoga, a modern full-stack web application for health enthusiasts and admins alike! Whether you're here to explore yoga and fitness classes, subscribe to flexible packages, or manage bookings as an admin, this platform brings simplicity, style, and function together.

🔥 Live Preview
👉 Demo Coming Soon...

🛠️ Tech Stack

Frontend:
React, Framer Motion

Backend:
Node.js, Express

Database:
MongoDB + Mongoose

Auth:
Session-based (express-session)

🎯 Key Features
👤 User Experience
🔐 Secure Sign Up / Log In

📚 View available classes with instructor & schedule info

🧾 Choose from curated packages (Basic, Advanced, Premium)

🧘 See included classes per package in real-time

📆 Book packages with:

✅ Live seat tracking

💰 Auto discounts: 20% (>20 seats), 50% (>50 seats)

🧾 Booking receipt with summary & contact info

🎬 Browse embedded YouTube videos (Yoga, Fitness)

💬 Read & write reviews

🧑‍💼 Admin Dashboard
🧩 Sidebar for easy navigation

📌 View & manage bookings

➕ Add new classes

📹 Add/delete videos

✂️ View/delete user reviews

🚫 Only accessible via role-based session auth

🚀 Getting Started
📋 Prerequisites
Node.js v16+

MongoDB (local or MongoDB Atlas)

Git

📦 Installation
bash
Copy
Edit
git clone https://github.com/yourusername/fit-yoga-app.git
cd fit-yoga-app
Backend
bash
Copy
Edit
cd backend
npm install
Frontend
bash
Copy
Edit
cd ../frontend
npm install
🧾 Environment Setup
Create a .env file in the backend/ folder:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
PORT=5000
🏁 Run the App
Start the backend:

bash
Copy
Edit
cd backend
node server.js
Start the frontend:

bash
Copy
Edit
cd ../frontend
npm start
📍 Visit: http://localhost:3000

🧱 Project Structure
pgsql
Copy
Edit
fit-yoga-app/
├── backend/
│   ├── models/        → Mongoose schemas
│   ├── server.js      → Express routes & middleware
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/ → Navbar, Footer, UI Elements
│   │   ├── pages/      → Home, Classes, Packages, Admin Dashboard
│   │   └── App.js      → Route definitions
👣 How It Works
👥 User Flow
Register/Login

Explore classes & packages

Book a package:

Enter seats & contact number

See dynamic discount & price

Confirm or cancel booking

Get receipt 🎟️

View your bookings via “My Bookings” tab

🧑‍💻 Admin Flow
Log in with admin credentials

Access dashboard:

✅ View/Cancel Bookings

➕ Add Classes & Videos

✂️ Manage Reviews

All admin routes are protected via user.role === 'admin'

🔌 API Overview

Method	Endpoint	Description
POST	/api/register	Register a new user
POST	/api/login	Login a user
GET	/api/currentUser	Get current session user
GET	/api/classes	Fetch all classes
GET	/api/packages	Fetch all packages
POST	/api/bookings	Create a booking
GET	/api/userbookings	Get current user's bookings
GET	/api/admin/bookings	Admin: All bookings
POST	/api/admin/classes	Admin: Add a class
POST	/api/admin/videos	Admin: Add a video
DELETE	/api/bookings/:id	Cancel a booking
GET/POST/DELETE	/api/admin/reviews	Admin: Manage reviews
📸 Screenshots
(Add screenshots here for: Homepage, Packages page, Booking modal, Admin dashboard, etc.)

🤝 Contributing
We welcome contributions!

Fork the repo

Create your branch (git checkout -b feature/your-feature)

Commit changes (git commit -am 'Add something cool')

Push (git push origin feature/your-feature)

Open a Pull Request 🎉
