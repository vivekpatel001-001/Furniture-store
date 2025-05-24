import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/register', {
        name,
        email,
        phone,
        password,
      });

      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center py-4  px-4 bg-blue-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md mt-10 mb-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Signup with Store Title</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 text-sm"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 text-sm"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="flex mb-4">
          <span className="flex items-center px-3 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 text-sm">
            🇮🇳 +91
          </span>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="w-full p-2 border border-gray-300 rounded-r-md text-sm"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-green-500 text-sm transition"
        >
          Sign up
        </button>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default SignupForm;
