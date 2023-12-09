import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
const Footer = () => {
  return (
    <footer className="bg-blue-900  text-white p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="list-none">
              <li>
                <p  className="hover:text-gray-300">
                  My Posts
                </p>
              </li>
              <li>
                <p  className="hover:text-gray-300">
                  My Friends
                </p>
              </li>
              <li>
                <p className="hover:text-gray-300">
                  Liked Posts
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p>Email: info@example.com</p>
            <p>Phone: +1 123-456-7890</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex items-center space-x-2">
              <Facebook fontSize="large" className="hover:text-gray-300" />
              <Twitter fontSize="large" className="hover:text-gray-300" />
              <Instagram fontSize="large" className="hover:text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
