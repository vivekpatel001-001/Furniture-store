import React from 'react';

const DiscountPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400 rounded-2xl shadow-2xl w-[90%] max-w-2xl p-10 text-white relative transform transition duration-300 scale-100 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow-300 text-3xl font-bold"
          aria-label="Close popup"
        >
          &times;
        </button>

        <img
          src="https://cdn-icons-png.flaticon.com/512/4341/4341039.png"
          alt="Discount"
          className="w-24 h-24 mx-auto mb-6 animate-bounce"
        />

        <h2 className="text-4xl font-extrabold mb-4 text-center"> Vivek Patel Store </h2>
        <p className="mb-6 text-lg text-center">
          🎉 Use code <span className="font-bold text-yellow-300">SAVE20</span> and get <b>20% OFF</b> on your first purchase!
        </p>

        <button
          onClick={onClose}
          className="bg-white text-red-600 font-semibold text-lg px-6 py-3 rounded-full hover:bg-yellow-100 transition block mx-auto"
        >
          Claim Now
        </button>
      </div>
    </div>
  );
};

export default DiscountPopup;
