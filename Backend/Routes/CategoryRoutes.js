import express from 'express';
import { getProductsByCategory } from '../Controller/CategoryController.js';

const router = express.Router();

// GET /category/:category
router.get('/:category', getProductsByCategory);

export default router;
