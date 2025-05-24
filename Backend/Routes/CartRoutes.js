import express from "express";
import authMiddleware from "../Middleware/authmiddleware.js";
import { addToCart, getUserCart ,removeFromCart,updateQuantity} from "../Controller/Cartcontroller.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/user", authMiddleware, getUserCart);
router.delete('/remove',authMiddleware,removeFromCart)
router.put('/update',authMiddleware,updateQuantity)
export default router;