import React, { useContext } from "react";
import { CartContext } from "../Cart/Cartcontext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      toast.warning("Minimum quantity is 1");
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.productId.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const shipping = cart.length > 0 ? 100 : 0;
  const total = getSubtotal() + shipping;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">
          Your cart is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.productId._id}
                className="flex items-center gap-4 border rounded-xl p-4 shadow-md bg-white transition-transform hover:scale-[1.01]"
              >
                <img
                  src={item.productId.imageUrl}
                  alt={item.productId.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg text-teal-500 font-bold">
                    {item.productId.title}
                  </h3>
                  <p className="text-gray-600">₹{item.productId.price}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
                      onClick={() =>
                        handleQuantityChange(
                          item.productId._id,
                          item.quantity - 1
                        )
                      }
                    >
                      <FaMinus />
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
                      onClick={() =>
                        handleQuantityChange(
                          item.productId._id,
                          item.quantity + 1
                        )
                      }
                    >
                      <FaPlus />
                    </button>
                    <button
                      className="text-red-600 ml-4"
                      onClick={() => removeFromCart(item.productId._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 h-fit border">
            <h3 className="text-xl font-semibold mb-4 text-teal-500">
              Order Summary
            </h3>
            <div className="flex justify-between mb-2 text-orange-500">
              <span>Subtotal</span>
              <span>₹{getSubtotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2 text-orange-500">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={() => navigate("/check-out")}
              className="mt-6 w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-2 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              Proceed to Checkout
            </button>

            {/* Continue Shopping Button */}
            <button
              onClick={() => navigate("/")}
              className="mt-4 w-full border border-gray-300 bg-teal-500 text-white   py-2 rounded-full font-medium hover:bg-sky-500 hover:scale-105 transition-transform duration-300"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
