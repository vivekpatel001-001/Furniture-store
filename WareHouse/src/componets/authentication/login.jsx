import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://furniture-store-backend-29c0.onrender.com/api/login', {
        email: email.toLowerCase().trim(), // Normalize email input
        password: password.trim(), // Trim whitespace
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        toast.success(response.data.message);
        navigate(response.data.user.role === 'admin' ? '/' : '/');
      }
    } catch (error) {
      console.error('Login error details:', {
        error: error.response?.data || error.message,
        request: { email, password }
      });

      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        'Login failed. Please try again.';

      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center py-6 px-4 bg-blue-100 min-h-[57vh]">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="text-right">
            <Link to="/forgetpassword" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-sm"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default LoginPage;
