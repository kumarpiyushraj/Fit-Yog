🧘‍♀️ Fit-Yog: Your Ultimate Wellness Platform 💪

Welcome to **Fit-Yog**, a modern, full-stack web application designed for health enthusiasts and administrators. Whether you're looking to explore a variety of yoga and fitness classes, subscribe to flexible packages, or manage the platform's content and bookings, Fit-Yog offers a seamless, stylish, and functional experience.

## ✨ Key Features

Fit-Yog is packed with features designed to provide a rich and intuitive experience for both users and administrators.

### 👤 For Users

  * **Secure Authentication**: Easy and secure sign-up and login functionality.
  * **Explore Classes**: Browse a comprehensive list of available yoga and fitness classes, complete with detailed information about instructors and schedules.
  * **Flexible Packages**: Choose from three curated subscription packages: **Basic**, **Advanced**, and **Premium**.
  * **Real-time Package Details**: Instantly see which classes are included in each package as you browse.
  * **Seamless Booking System**:
      * **Live Seat Availability**: Track the number of available seats for each class in real-time.
      * **Automatic Discounts**: Enjoy a **20% discount** if more than 20 seats are booked, and a **50% discount** for over 50 seats.
      * **Booking Confirmation**: Receive a detailed receipt with a summary of your booking and contact information.
  * **Engaging Content**:
      * **Embedded Videos**: Watch a curated collection of yoga and fitness videos directly from YouTube.
      * **User Reviews**: Read and contribute reviews for classes to help the community.

### 🧑‍💼 For Admins

  * **Dedicated Admin Dashboard**: A powerful and intuitive dashboard for managing the platform.
  * **Role-Based Access Control**: Secure access restricted to authorized administrators.
  * **Easy Navigation**: A clean sidebar for quick access to all management tools.
  * **Comprehensive Management**:
      * **Booking Management**: View and manage all user bookings.
      * **Class Management**: Add new classes to the platform with ease.
      * **Content Management**: Add or delete videos from the gallery.
      * **Review Moderation**: View and delete user reviews to maintain a positive community environment.

-----

## 🛠️ Tech Stack

Fit-Yog is built with a modern and robust technology stack to ensure a high-quality user experience.

| Category      | Technology                                                              |
| :------------ | :---------------------------------------------------------------------- |
| **Frontend** | `React`, `Framer Motion`                                                |
| **Backend** | `Node.js`, `Express`                                                    |
| **Database** | `MongoDB` with `Mongoose`                                               |
| **Auth** | Session-based authentication using `express-session`                    |

-----

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:

  * [Node.js](https://nodejs.org/en/)
  * [npm](https://www.npmjs.com/) (Node Package Manager)
  * [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/your-username/fit-yog.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd fit-yog
    ```
3.  **Install server dependencies**
    ```sh
    npm install
    ```
4.  **Navigate to the client directory and install dependencies**
    ```sh
    cd client
    npm install
    ```
5.  **Create a `.env` file** in the root directory and add the following environment variables:
    ```env
    MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
    PORT=<YOUR_DESIRED_PORT>
    SESSION_SECRET=<YOUR_SESSION_SECRET>
    ```

### Running the Application

1.  **Start the server** (from the root directory)
    ```sh
    npm start
    ```
2.  **Start the client** (from the `client` directory, in a separate terminal)
    ```sh
    npm start
    ```

The application should now be running on `http://localhost:3000` (or your configured port).

-----

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star\! Thanks again\!

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**
