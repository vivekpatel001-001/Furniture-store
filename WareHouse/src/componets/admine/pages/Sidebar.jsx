// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, ShoppingCart, User } from 'lucide-react';
import { IoArrowBackCircleSharp } from "react-icons/io5";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/admin-panel/profile", name: "User Profile", icon: <User Profile size={20} /> },
    { path: "/admin-panel/products", name: "Product Management", icon: <Package size={20} /> },
    { path: "/admin-panel/orders", name: "Order Management", icon: <ShoppingCart size={20} /> },
    { path: "/admin-panel/user", name: "UserMangment ", icon: <User size={20} /> },
    { path: "/admin-panel/allproducts", name: "AllProducts ", icon: <User size={20} /> },


  ];

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-6 shadow-lg">
<Link
  to="/"
  className="group relative inline-flex items-center gap-2 text-white px-6 py-3 text-lg font-semibold border-2 border-transparent rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-2xl"
>
  <span className="text-2xl">
    <IoArrowBackCircleSharp className="transition-transform group-hover:-translate-x-1 duration-300" />
  </span>
  <span className="relative z-10">Back to Home</span>
  <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white transition-all duration-300 animate-pulse"></span>
</Link>      <h2 className="text-2xl font-bold mb-8 text-white">Admin Panel</h2>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`flex items-center gap-4 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300
                ${location.pathname === link.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700 text-gray-300"}`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
