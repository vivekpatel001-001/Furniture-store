import React, { useContext } from 'react';
import { WishlistContext } from './Watchlistcontact';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="p-2 mt-10 container mx-auto max-w-6xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl shadow-lg">
      {/* Header section */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <Link
          to="/"
          className="text-sm text-white bg-teal-600 px-6 py-2 rounded-lg hover:bg-teal-800 transition duration-300"
        >
          ← Back to Home
        </Link>

        <h2 className="text-4xl font-extrabold text-white tracking-wide uppercase">
          💖 My Wishlist
        </h2>

        <div className="w-[110px]"></div>
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-200 text-lg">No items in wishlist.</p>
      ) : (
        wishlistItems.map((product) => (
          <div
            key={product._id}
            className="border p-4 mb-4 rounded-lg shadow-xl flex items-center gap-4 bg-white  transition duration-300"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-24 h-24 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1">
              <h3 className="font-bold text-sky-500 text-lg">{product.title}</h3>
              <p className="text-sm text-green-500">{product.description}</p>
              <p className="text-red-500 font-semibold">
                {product.price ? `₹${product.price}` : "Price not available"}
              </p>
            </div>
            <button
              onClick={() => removeFromWishlist(product._id)}
              className="text-red-600 font-bold px-4 py-2 rounded-full bg-white border-2 border-red-600 hover:bg-red-600 hover:text-white transition duration-300 ease-in-out"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default WishlistPage;
