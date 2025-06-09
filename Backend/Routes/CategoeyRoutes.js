import express from 'express';
import { getProductsByCategory } from '../Controller/Catgorycontroller.js';

const router = express.Router();

// GET /category/:category
router.get('/:category', getProductsByCategory);

export default router;
