import React, { createContext, useState, useEffect, useCallback, } from "react";
import { toast } from 'react-toastify'

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fetch cart from backend on login
  const fetchCartFromBackend = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:4000/cart/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setCart(data.items);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  }, []);

  useEffect(() => {
    fetchCartFromBackend();
  }, [fetchCartFromBackend]);

  // Add to cart
  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Add to cart failed");
      }
      if (res.ok) {
        toast.success(data.message)
         fetchCartFromBackend();
      }
     
    } catch (err) {
      console.error("Add to cart error:", err.message);
      toast.error(err.message); 
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");

    try {
      await fetch("http://localhost:4000/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      fetchCartFromBackend();
    } catch (err) {
      console.error("Remove from cart failed", err);
    }
  };

  // Update quantity
  const updateQuantity = async (productId, newQuantity) => {
    const token = localStorage.getItem("token");

    try {
      await fetch("http://localhost:4000/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      fetchCartFromBackend();
    } catch (err) {
      console.error("Update quantity failed", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        fetchCartFromBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
