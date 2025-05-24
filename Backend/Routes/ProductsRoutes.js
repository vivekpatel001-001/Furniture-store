import express from 'express';
// import upload from '../Middleware/Milter.js';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  totalproduct,
} from '../Controller/ProductController.js';

const router = express.Router();

router.post('/add', createProduct);
router.get('/get', getProducts);
router.get('/:id', getProductById);
router.put('/update/:id',updateProduct);
router.delete('/:id', deleteProduct);
router.get('/category/:category', getProductsByCategory);
router.get('/totalproduct',totalproduct);
export default router;