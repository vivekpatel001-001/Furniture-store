import React, { useContext } from 'react';
import { WishlistContext } from '../../Watchlist/Watchlistcontact';

const ProfileWishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded shadow">
              <img src={product.imageUrl} alt={product.title} className="w-full h-40 object-cover mb-2 rounded" />
              <h3 className="font-bold">{product.title}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="mt-2 text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileWishlist;
