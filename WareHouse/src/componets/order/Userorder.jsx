import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:4000/order/getorder", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
      toast.error(error.response?.data?.message || "Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Function to get status color and text
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'processing':
        return { bg: 'bg-blue-100', text: 'text-blue-800', display: 'Processing' };
      case 'shipped':
        return { bg: 'bg-purple-100', text: 'text-purple-800', display: 'Shipped' };
      case 'delivered':
        return { bg: 'bg-green-100', text: 'text-green-800', display: 'Delivered' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', display: status };
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">No orders found.</p>
          <button 
            onClick={() => window.location.href = '/products'}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusDisplay = getStatusDisplay(order.status);
            return (
              <div
                key={order._id}
                className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-800">
                      Order #: {order._id.substring(order._id.length - 6).toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Placed on: {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.paymentStatus === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentStatus.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusDisplay.bg} ${statusDisplay.text}`}>
                      {statusDisplay.display}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-semibold mb-2">Items:</p>
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/placeholder-product.png';
                            }}
                          />
                        )}
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                  <div className="text-sm">
                    <p className="font-medium">Shipping Address:</p>
                    <p>{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-bold text-lg">
                      Order Total: ₹{order.totalAmount.toFixed(2)}
                    </div>
                    {order.status === 'shipped' && (
                      <p className="text-sm text-purple-600 mt-1">
                        Your order is on the way!
                      </p>
                    )}
                    {order.status === 'delivered' && (
                      <p className="text-sm text-green-600 mt-1">
                        Delivered on {new Date(order.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserOrder;