import React from 'react';
import { jwtDecode } from 'jwt-decode';
const UserProfile = () => {
  const token = localStorage.getItem('token');

  let user = null;

  if (token) {
    try {
      user = jwtDecode(token);
      console.log("Decoded User:", user);
    } catch (error) {
      console.error('Invalid token');
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">👤 User Profile</h2>
      {user ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone :- </strong> {user.phone}</p>
        </div>
      ) : (
        <p className="text-red-500">User not logged in</p>
      )}
    </div>
  );
};

export default UserProfile;