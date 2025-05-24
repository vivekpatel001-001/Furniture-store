import express from "express";
import { getAllOrders, getOrderStats, getUserOrders, updateOrderStatus } from "../Controller/orderController.js";
import  authenticateUser  from "../Middleware/authmiddleware.js";

const router = express.Router();

// GET /orders/my
router.get("/getorder", authenticateUser, getUserOrders);
router.get('/orders', authenticateUser, getAllOrders);
router.get('/orders/status', authenticateUser, getOrderStats);
router.patch('/orders/:orderId/status', authenticateUser, updateOrderStatus);

export default router;