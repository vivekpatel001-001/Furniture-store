import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]); // ✅ Empty array default

  const token = localStorage.getItem('token'); // JWT Token

  const fetchWishlist = async () => {
    try {
      const res = await axios.get('http://localhost:4000/wislist/wishlist', {
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
        'http://localhost:4000/wislist/wishlist',
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
      await axios.delete(`http://localhost:4000/wislist/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchWishlist();    
        toast.success("this items removed  succefuly")

    } catch (error) {
      console.error('Failed to remove from wishlist', error);
    }
  };

  useEffect(() => {
    if (token) fetchWishlist();
  }, [token]);

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
