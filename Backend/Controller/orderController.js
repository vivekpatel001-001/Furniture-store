import Order from "../Model/OrderModel.js";
import User from "../Model/RegisterModel.js"

// GET user orders
export const getUserOrders = async (req, res) => {
  try {
    // Use req.user.id instead of req.userId
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('user', 'name email'); // Optional: populate user details

    res.status(200).json({ 
      success: true, 
      orders 
    });
  } catch (error) {
    console.error("Failed to get user orders:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch orders",
      error: error.message // Include error message for debugging
    });
  }
};

//Admin

// Get all orders (for admin)
export const getAllOrders = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Only admins can access all orders"
      });
    }

    // Get pagination parameters from query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get sorting parameters
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    // Get filter parameters
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.paymentStatus) filters.paymentStatus = req.query.paymentStatus;

    // Get total count for pagination
    const totalOrders = await Order.countDocuments(filters);

    // Get orders with pagination, sorting, and filtering
    const orders = await Order.find(filters)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name email') // Populate user details
      .lean();

    // Format response
    const response = {
      success: true,
      totalOrders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      orders: orders.map(order => ({
        ...order,
        user: order.user || { name: 'Guest User', email: 'N/A' } // Handle guest orders
      }))
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Admin: Failed to get all orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message
    });
  }
};

// Get order statistics (for admin dashboard)
export const getOrderStats = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Only admins can access order statistics"
      });
    }

    // Get counts for different statuses
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$paymentStatus", "completed"] }, 1, 0]
            }
          },
          pending: {
            $sum: {
              $cond: [{ $eq: ["$paymentStatus", "pending"] }, 1, 0]
            }
          },
          processing: {
            $sum: {
              $cond: [{ $eq: ["$status", "processing"] }, 1, 0]
            }
          },
          shipped: {
            $sum: {
              $cond: [{ $eq: ["$status", "shipped"] }, 1, 0]
            }
          },
          delivered: {
            $sum: {
              $cond: [{ $eq: ["$status", "delivered"] }, 1, 0]
            }
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: stats[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        completed: 0,
        pending: 0,
        processing: 0,
        shipped: 0,
        delivered: 0
      }
    });
  } catch (error) {
    console.error("Admin: Failed to get order statistics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order statistics",
      error: error.message
    });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Only admins can update order status"
      });
    }

    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['processing', 'shipped', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    // Update order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder
    });

  } catch (error) {
    console.error("Admin: Failed to update order status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message
    });
  }
};