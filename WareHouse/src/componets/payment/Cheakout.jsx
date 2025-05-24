import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Cart/Cartcontext';
import loadRazorpayScript from '../../helper/RazoprpayScript';
import { toast } from 'react-toastify';

const CheckoutForm = ({ user = {} }) => {
  const { cart = [], fetchCartFromBackend } = useContext(CartContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const [loading, setLoading] = useState(false);

  // Fetch cart on mount
  useEffect(() => {
    fetchCartFromBackend();
  }, [fetchCartFromBackend]);

  // Redirect if cart empty
  useEffect(() => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add some products first.');
      navigate('/cart');
    }
  }, [cart, navigate]);

  // Calculate total price correctly using productId.price
  const calculateTotal = () =>
    cart.reduce((total, item) => {
      const price = Number(item.productId?.price) || 0;  // <-- updated here
      const quantity = Number(item.quantity) || 0;
      return total + price * quantity;
    }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    try {
      const { data: orderData } = await axios.post(
        'http://localhost:4000/razorpay/create-order',
        {
          cart,
          shippingAddress: formData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const options = {
        key: "rzp_test_g8mIpf9DuIbxWk",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Funtire Store",
        description: "Order Payment",
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              'http://localhost:4000/razorpay/verify-payment',
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              }
            );

            if (verifyRes.data.success) {
              toast.success(verifyRes.data.message);
              fetchCartFromBackend()
              navigate('/userorder')
            } else {
              toast.error(verifyRes.data.message);
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error(error);
            console.error("Verification error:", error);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#6366f1" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      toast.error(err);
    }

    setLoading(false);
  };


  return (
    <div className="max-w-5xl mx-auto py-10 px-4 md:px-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">Checkout</h1>

      <form
        className="grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-lg p-6"
        onSubmit={handlePayment}
      >
        {/* Shipping Form */}
        <div>
          <h2 className="text-2xl font-semibold text-indigo-700 border-b pb-2 mb-6">
            Shipping Address
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'Full Name', name: 'fullName' },
              { label: 'Email', name: 'email' },
              { label: 'Phone', name: 'phone' },
              { label: 'Address', name: 'address' },
              { label: 'City', name: 'city' },
              { label: 'State', name: 'state' },
              { label: 'Postal Code', name: 'postalCode' },
              { label: 'Country', name: 'country', optional: true },
            ].map(({ label, name, optional }) => (
              <div key={name}>
                <label className="block font-medium text-gray-700 mb-1">
                  {label} {optional ? '(optional)' : '*'}
                </label>
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  required={!optional}
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-700 border-b pb-2">
            Order Summary
          </h2>

          <div className="space-y-4 max-h-64 overflow-y-auto border rounded-md p-4 bg-gray-50">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.productId?.title} (x{item.quantity})</span>
                <span className="font-medium">₹{(item.productId?.price || 0) * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-bold border-t pt-4">
            <span>Total:</span>
            <span>₹{calculateTotal()}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded font-semibold ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {loading ? 'Processing Payment...' : 'Pay Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
