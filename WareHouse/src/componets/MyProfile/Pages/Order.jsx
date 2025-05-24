import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:4000/order/getorder', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-teal-50 to-white min-h-screen">
      <h2 className="text-3xl font-extrabold text-teal-600 mb-6">🛍 Your Orders</h2>

      {loading ? (
        <p className="text-gray-600 text-lg">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">You have no orders yet.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl p-6 bg-white shadow-md hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-lg font-bold text-gray-800">🧾 Order ID: {order._id}</div>
                  <div className="text-sm text-gray-500">
                    Placed on: {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-600'
                        : order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center bg-teal-50 p-3 rounded-lg border border-teal-100"
                  >
                  
                    <div>
                      <div className="font-semibold text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        ₹{item.price} × {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-gray-700 text-sm mt-2">
                <p>
                  <strong>Shipping To:</strong>{' '}
                  {order.shippingAddress.fullName}, {order.shippingAddress.address},{' '}
                  {order.shippingAddress.city}, {order.shippingAddress.state},{' '}
                  {order.shippingAddress.postalCode}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <strong>Payment:</strong> {order.paymentStatus}
                </div>
                <div className="text-lg font-bold text-teal-600">
                  Total: ₹{order.totalAmount}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
