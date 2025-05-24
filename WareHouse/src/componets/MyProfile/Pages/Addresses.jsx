import React, { useState } from 'react';

const Addresses = () => {
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saved Address:', address);
    alert("Address saved successfully!");
    // 👇 Later: call API here
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-teal-700">Add Shipping Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={address.fullName}
            onChange={handleChange}
            className="p-3 border rounded w-full"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={address.phone}
            onChange={handleChange}
            className="p-3 border rounded w-full"
            required
          />
        </div>

        <input
          type="text"
          name="addressLine1"
          placeholder="Address Line 1"
          value={address.addressLine1}
          onChange={handleChange}
          className="p-3 border rounded w-full"
          required
        />
        <input
          type="text"
          name="addressLine2"
          placeholder="Address Line 2 (Optional)"
          value={address.addressLine2}
          onChange={handleChange}
          className="p-3 border rounded w-full"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            className="p-3 border rounded w-full"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
            className="p-3 border rounded w-full"
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={handleChange}
            className="p-3 border rounded w-full"
            required
          />
        </div>

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={address.country}
          onChange={handleChange}
          className="p-3 border rounded w-full"
          required
        />

        <label className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            name="isDefault"
            checked={address.isDefault}
            onChange={handleChange}
            className="accent-teal-600"
          />
          <span>Make this my default address</span>
        </label>

        <button
          type="submit"
          className="mt-4 bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-all"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default Addresses;
