import React, { useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await axios.post('http://localhost:4000/mailer/contact', formData);
      setStatus(response.data.message);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message.');
    }
  };

  return (
    <section className="px-6 md:px-16 py-12 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          <div className="flex items-start mb-6">
            <span className="text-2xl mr-3">✉️</span>
            <div>
              <p>
                For any queries and assistance please contact us at{" "}
                <a href="mailto:vivekpatel001001@gmail.com" className="text-green-600 underline">
                  vivekpatel001001@gmail.com
                </a>{" "}
                / +918010117117
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-3">📍</span>
            <div>
              <p className="font-semibold">grocerycart</p>
              <p>Office No. Building Name Street Name Delhi, Delhi, IN110085</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Drop us a line</h3>
          <p className="text-sm mb-6">Have a question or comment? Use the form below to send us a message</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border border-gray-300 p-2 rounded"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-2 rounded"
              required
              onChange={handleChange}
              value={formData.email}
            />
            <div className="flex border border-gray-300 rounded overflow-hidden">
              <span className="bg-gray-100 px-3 flex items-center">🇮🇳 +91</span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-2 outline-none"
                required
                onChange={handleChange}
                value={formData.phone}
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full border border-gray-300 p-2 rounded"
              required
              onChange={handleChange}
              value={formData.subject}
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="w-full bg-green-400 text-white py-3 rounded hover:bg-orange-500 transition">
              SUBMIT
            </button>
            {status && <p className="text-sm mt-2">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
