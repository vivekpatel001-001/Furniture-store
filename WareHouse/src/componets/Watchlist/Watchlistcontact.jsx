// watchlistcontext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const token = localStorage.getItem('token');

  const fetchWishlist = async () => {
    try {
      const res = await axios.get('https://furniture-store-backend-29c0.onrender.com/wislist/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistItems(res.data.wishlist || []);
    } catch (error) {
      console.error('Failed to fetch wishlist', error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await axios.post(
        'https://furniture-store-backend-29c0.onrender.com/wislist/wishlist',
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchWishlist();
    } catch (error) {
      console.error('Failed to add to wishlist', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`https://furniture-store-backend-29c0.onrender.com/wislist/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchWishlist();
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error('Failed to remove from wishlist', error);
    }
  };

  const toggleWishlist = async (productId) => {
    const alreadyInWishlist = wishlistItems.some(item => item._id === productId);
    if (alreadyInWishlist) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
      toast.success("Item added to wishlist");
    }
  };

  useEffect(() => {
    if (token) fetchWishlist();
  }, [token]);

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
