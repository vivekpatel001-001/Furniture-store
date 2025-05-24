// wislistRoutes.js
import express from 'express';
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from '../Controller/WislistController.js';
import verifyToken from '../Middleware/authmiddleware.js';

const router = express.Router();

router.post('/wishlist', verifyToken, addToWishlist);
router.delete('/wishlist/:productId', verifyToken, removeFromWishlist);
router.get('/wishlist', verifyToken, getWishlist);

export default router;
