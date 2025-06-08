import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <a href="/" className="hover:text-blue-400">
            Home
          </a>
          <a href="#destinations" className="hover:text-blue-400">
            Destinations
          </a>
          <a href="about" className="hover:text-blue-400">
            About Us
          </a>
          <a href="contact" className="hover:text-blue-400">
            Contact
          </a>
        </div>
        <div className="text-sm mb-4">
          <p>&copy; 2024 FlightApp. All rights reserved.</p>
        </div>
        <div className="text-sm">
          <p>Follow us on:</p>
          <div className="flex justify-center space-x-4">
            <a href="https://www.facebook.com" className="hover:text-blue-400">
              Facebook
            </a>
            <a href="https://www.twitter.com" className="hover:text-blue-400">
              Twitter
            </a>
            <a href="https://www.instagram.com" className="hover:text-blue-400">
              Instagram
            </a>

            <Link to="/admin"><p className="hover:text-blue-400">Admin</p></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
