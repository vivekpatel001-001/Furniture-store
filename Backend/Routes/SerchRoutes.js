import express from 'express';
import { searchProducts } from '../Controller/Serchcontroller.js';

const router = express.Router();

// Search route
router.get('/', searchProducts);

export default router;