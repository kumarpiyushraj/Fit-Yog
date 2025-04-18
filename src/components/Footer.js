import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <div className="footer">
      <p id="footer-text">&copy; {new Date().getFullYear()} Fit-Yog. All rights reserved.</p>
    </div>
  );
}

export default Footer;