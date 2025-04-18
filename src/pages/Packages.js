import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Packages.css";
import "../styles/GlobalTitle.css";

const Packages = ({ currentUser }) => {
  const [packages, setPackages] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    seatsBooked: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    fetchPackages();
    fetchClasses();
  }, []);

  const fetchPackages = () => {
    axios
      .get("http://localhost:5000/api/packages")
      .then((response) => setPackages(response.data))
      .catch((error) => console.log("Error fetching packages:", error));
  };

  const fetchClasses = () => {
    axios
      .get("http://localhost:5000/api/classes")
      .then((response) => setClasses(response.data))
      .catch((error) => console.log("Error fetching classes:", error));
  };

  const getClassesForPackage = (pkg) => {
    const lowerName = pkg.name.trim().toLowerCase();
    if (lowerName.includes("yoga")) {
      return classes
        .filter((cls) => cls.category.trim().toLowerCase() === "yoga")
        .slice(0, 3);
    } else if (lowerName.includes("fitness")) {
      return classes
        .filter((cls) => cls.category.trim().toLowerCase() === "fitness")
        .slice(0, 5);
    } else {
      return classes;
    }
    //return [];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };

    if (name === "seatsBooked") {
      const seats = parseInt(value, 10);
      if (seats > selectedPackage.availableSeats) {
        setError(`Only ${selectedPackage.availableSeats} seats are available.`);
      } else {
        setError(null);
      }

      // Calculate discount and price
      const baseTotal = seats * selectedPackage.price;
      let discountRate = 0;
      if (seats > 50) discountRate = 0.5;
      else if (seats > 20) discountRate = 0.2;

      const discountedPrice = baseTotal - baseTotal * discountRate;
      setDiscount(discountRate * 100);
      setTotalPrice(discountedPrice);
    }

    setFormData(newFormData);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedPackage) return;

    const seats = parseInt(formData.seatsBooked, 10);
    if (seats > selectedPackage.availableSeats) {
      setError(`Only ${selectedPackage.availableSeats} seats are available.`);
      return;
    }

    const baseTotal = seats * selectedPackage.price;
    let discountRate = 0;
    if (seats > 50) discountRate = 0.5;
    else if (seats > 20) discountRate = 0.2;
    const finalTotal = baseTotal - baseTotal * discountRate;

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        packageId: selectedPackage._id,
        userName: formData.userName,
        email: formData.email,
        phone: formData.phone,
        seatsBooked: formData.seatsBooked,
        totalPrice: finalTotal,
        discountPercent: discountRate * 100,
      });

      // Show receipt
      setShowModal(false);
      setReceiptData({
        packageName: selectedPackage.name,
        userName: formData.userName,
        email: formData.email,
        phone: formData.phone,
        seats: formData.seatsBooked,
        total: finalTotal,
        discountPercent: discountRate * 100,
      });

      fetchPackages();
    } catch (error) {
      setMessage({ type: "error", text: "Error booking package. Try again." });
    }
  };

  const handleOpenModal = (pkg) => {
    if (!currentUser) {
      alert("Please login to book a package.");
      return;
    }
    setSelectedPackage(pkg);
    setFormData({
      userName: currentUser.username,
      email: currentUser.email,
      phone: "",
      seatsBooked: "",
    });
    setShowModal(true);
  };

  return (
    <div className="fade-in packages-section">
      <h1 className="page-title">Choose the Best Package for Your Wellness</h1>
      <div id="dislbl">
        Book more than <span className="seats">20 seats</span> to avail{" "}
        <span className="discnt">20% discount</span> and more than{" "}
        <span className="seats">50 seats</span> to avail{" "}
        <span className="discnt">50% discount</span>.
      </div>
      <div className="packages-container">
        {packages.map((pkg) => {
          const relevantClasses = getClassesForPackage(pkg);
          return (
            <div key={pkg._id} className="package-card">
              <h2 id="pkgname">{pkg.name}</h2>
              <p>
                <strong>Duration:</strong> {pkg.duration}
              </p>
              <p>
                <strong>Details:</strong> {pkg.details}
              </p>
              <p>
                <strong>Seats Available:</strong>{" "}
                <span className="seat-count">
                  {pkg.availableSeats > 0
                    ? pkg.availableSeats
                    : "All seats filled"}
                </span>
              </p>
              <p>
                <strong>Price:</strong>{" "}
                <span className="package-price">₹{pkg.price}</span>
              </p>

              <div className="class-list">
                <h4 id="clstitle">Included Classes</h4>
                {relevantClasses.length === 0 ? (
                  <p>No classes available</p>
                ) : (
                  relevantClasses.map((cls) => (
                    <div key={cls._id} className="class-item">
                      <ul>
                        <li>
                          <strong>{cls.title} - </strong>
                          <strong>{cls.duration}</strong>
                        </li>
                      </ul>
                    </div>
                  ))
                )}
              </div>

              <button
                className="buy-button"
                onClick={() => handleOpenModal(pkg)}
                disabled={pkg.availableSeats === 0}
              >
                {pkg.availableSeats > 0 ? "Book Now" : "Seat Full"}
              </button>
            </div>
          );
        })}
      </div>

      {showModal && selectedPackage && (
        <div className="booking-modal">
          <div className="modal-content">
            <h2 className="modal-title">Book {selectedPackage?.name}</h2>
            {message && (
              <pre
                className={
                  message.type === "success"
                    ? "success-message"
                    : "error-message"
                }
              >
                {message.text}
              </pre>
            )}
            <form onSubmit={handleBooking} className="booking-form">
              <div>
                <input
                  type="text"
                  name="username"
                  value={formData.userName}
                  readOnly
                />
              </div>
              <div>
                <input
                  type="text"
                  name="username"
                  value={formData.email}
                  readOnly
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Contact Number"
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="number"
                  name="seatsBooked"
                  placeholder="Seats"
                  min="1"
                  required
                  value={formData.seatsBooked}
                  onChange={handleInputChange}
                />
              </div>
              {error && <p className="error-message">{error}</p>}

              {formData.seatsBooked && !error && (
                <div className="price-summary">
                  <p>
                    <strong>No. of Persons:</strong> {formData.seatsBooked}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}{" "}
                    {discount > 0 && (
                      <span className="discount-note">
                        (after {discount}% discount)
                      </span>
                    )}
                  </p>
                </div>
              )}

              <div className="button-group">
                <button type="submit" className="confirm-btn">
                  Confirm Booking
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {receiptData && (
        <div className="receipt-screen">
          <div className="receipt-box">
            <h2>Booking Receipt</h2>
            <p>
              <strong>Package:</strong> {receiptData.packageName}
            </p>
            <p>
              <strong>Name:</strong> {receiptData.userName}
            </p>
            <p>
              <strong>Email:</strong> {receiptData.email}
            </p>
            <p>
              <strong>Phone:</strong> {receiptData.phone}
            </p>
            <p>
              <strong>Seats Booked:</strong> {receiptData.seats}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{receiptData.total.toFixed(2)}{" "}
              {receiptData.discountPercent > 0 && (
                <span>(after {receiptData.discountPercent}% discount)</span>
              )}
            </p>
            <button
              className="ok-btn"
              onClick={() => {
                setReceiptData(null);
                setFormData({
                  userName: "",
                  email: "",
                  phone: "",
                  seatsBooked: "",
                });
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;
