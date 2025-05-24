import razorpay from '../Model/Razozrpay.js';
import crypto from 'crypto';
import Order from '../Model/OrderModel.js';
import CartModel from '../Model/CartModel.js';

export const createOrder = async (req, res) => {
  try {
    console.log("Incoming request to /create-order");

    const { shippingAddress } = req.body;
    
    const userId = req.user.id;  // decoded.id
    const userCart = await CartModel.findOne({ userId }).populate('products.productId');

    if (!userCart || userCart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalAmount = userCart.products.reduce((total, item) => {
      const price = item.productId.price || 0;
      return total + price * item.quantity;
    }, 0);

    console.log("Total amount:", totalAmount);

    const options = {
      amount: totalAmount * 100,
      currency: 'INR',
      receipt: `order_rcptid_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);
    console.log("Razorpay order:", razorpayOrder);

    const newOrder = new Order({
      user: req.user.id,
      items: userCart.products.map(item => ({
        productId: item.productId._id,
        name: item.productId.title,
        price: item.productId.price,
        quantity: item.quantity,
        image: item.productId.image,
      })),
      totalAmount,
      shippingAddress,
      razorpayOrderId: razorpayOrder.id,
    });

    console.log("User placing order:", req.user);

    await newOrder.save();

    res.status(201).json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error("Razorpay Order Creation Failed:", error);
    res.status(500).json({ message: 'Failed to create Razorpay order', error });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // 1. Verify the signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'IO1HN8ng0vHN8eM4AHR1OpXD');
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // 2. Update the order with payment details
    const updatedOrder = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paymentStatus: "completed",
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await CartModel.findOneAndDelete({ userId: updatedOrder.user });

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order: updatedOrder,
    });

  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during payment verification",
    });
  }
};



