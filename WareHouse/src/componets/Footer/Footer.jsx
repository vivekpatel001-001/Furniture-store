import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 shadow-inner mt-10">
      {/* Top Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Socials */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Furniture <span className="text-[#D79C89]">Store</span>{' '}
            <span className="inline-block transform rotate-90">🪑</span>
          </h2>
          <p className="text-sm mb-4">Your comfort, our priority.</p>
          <div className="flex space-x-4 text-lg text-gray-600">
            <a href="#" className="hover:text-[#1877f2] transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-[#1da1f2] transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-[#0077b5] transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-[#e1306c] transition">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Collections */}
        <div>
          <h3 className="text-2xl font-semibold text-teal-500   mb-4">Collections</h3>
          <ul className="space-y-2">
            <li className="hover:text-[#7AB6A7] cursor-pointer  font-bold  transition">Feature Products</li>
            <li>
              <Link to="/newarrivels" className="hover:text-[#7AB6A7] transition  font-bold ">
                New Arrivals
              </Link>
            </li>
             <li>
              <Link to="/trendingweek" className="hover:text-[#7AB6A7] transition  font-bold ">
              Trending Week
              </Link>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-2xl  text-teal-500  font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-[#7AB6A7] cursor-pointer font-bold transition">About Us</li>
            <li className="hover:text-[#7AB6A7] cursor-pointer   font-bold transition">Store Locator</li>
            <li className="hover:text-[#7AB6A7] cursor-pointer  font-bold transition">Contact Us</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl text-teal-500 font-semibold mb-4">Contact</h3>
          <div className="flex items-start gap-3 font-bold text-sm">
            <FaMapMarkerAlt className="mt-1 text-[#7AB6A7]  font-bold" />
            <p>
              Office No. Building Name, Street Name,
              <br />
              Gujarat, Surat 395004
              <br />
              India
            </p>
          </div>
          <div className="flex items-center gap-3 mt-3 text-sm font-bold ">
            <FaEnvelope className="text-[#7AB6A7]" />
            <p>dummy+demo-vue-furniture@storehippo.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#7AB6A7] text-white text-center py-4 text-sm">
        © 2023 <span className="font-semibold">StoreHippo.com</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
