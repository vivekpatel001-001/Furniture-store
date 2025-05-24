import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaBox,
  FaMapMarkerAlt,
  FaHeart,
  FaArrowLeft,
  FaSignOutAlt,
} from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';

const menuItems = [
  { label: 'Profile', icon: <FaUser />, path: '/myprofile/profile' },
  { label: 'Orders', icon: <FaBox />, path: '/myprofile/orders' },
  { label: 'Addresses', icon: <FaMapMarkerAlt />, path: '/myprofile/addresses' },
  { label: 'Wishlist', icon: <FaHeart />, path: '/myprofile/wishlist' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          name: decoded.name,
          email: decoded.email,
          phone: decoded.phone,
        });
      } catch (error) {
        console.error('Token decode error:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="w-80 bg-white border-r p-6 flex flex-col min-h-screen">
      {/* User info */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg font-bold">
          👤
        </div>
        <div>
          <p className="font-bold">{user.name}</p>
          <p className="text-gray-500 text-md">{user.email}</p>
          <p className="text-gray-500 text-sm">{user.phone}</p>
        </div>
      </div>

      {/* Menu items + Buttons */}
      <div className="flex flex-col">
        {menuItems.map(({ label, icon, path }, idx) => (
          <NavLink
            key={idx}
            to={path}
            className={({ isActive }) =>
              `mb-4 flex items-center gap-3 p-2 cursor-pointer ${
                isActive ? 'bg-teal-100 rounded' : ''
              }`
            }
          >
            <span className="text-xl">{icon}</span>
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}

        {/* Back & Logout buttons right after Wishlist */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-700 hover:text-black mb-4 mt-2"
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-800"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
