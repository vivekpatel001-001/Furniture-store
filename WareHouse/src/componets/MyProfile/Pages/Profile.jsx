import React, { useEffect, useState } from 'react';
import AccountLayout from './AccountLayout';
import { jwtDecode } from 'jwt-decode';

const Myprofile = () => {
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
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);

  return (
    <div>
      {/* Profile Info Section */}
      <div className="p-6 bg-white shadow-md rounded mb-6">
        <h2 className="text-2xl font-bold mb-4 text-teal-700">👤 My Profile</h2>
        <p className="text-lg">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-lg">
          <strong>Phone:</strong> {user.phone}
        </p>
      </div>

      {/* Layout Section */}
    </div>
  );
};

export default Myprofile;
