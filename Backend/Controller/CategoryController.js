import ProductModel from '../Model/ProductModel.js';

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await ProductModel.find({ category });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found in this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching products by category',
      error: error.message,
    });
  }
};
