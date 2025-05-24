import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  // Step 1: Get token from Redux state
  const { token } = useSelector((state) => state.auth);

  // Step 2: If there's no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Step 3: Decode the JWT token
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const isAdmin = decodedToken.role === 'admin'; // Check if the role is 'admin'

    // Step 4: If the user is an admin, render the child components
    return isAdmin ? children : <Navigate to="/dashboard" replace />; // Redirect non-admins to dashboard
  } catch (error) {
    console.error('Token decoding failed:', error);
    return <Navigate to="/login" replace />; // In case of error, redirect to login
  }
};

export default AdminRoute;
