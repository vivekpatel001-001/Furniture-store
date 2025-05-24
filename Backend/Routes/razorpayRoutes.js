import express from 'express';
import { createOrder, verifyPayment } from '../Controller/razorpayController.js';
import  isAuthenticated  from '../Middleware/authmiddleware.js';

const router = express.Router();

router.post('/create-order', isAuthenticated, createOrder);
router.post('/verify-payment', isAuthenticated, verifyPayment)

export default router;
