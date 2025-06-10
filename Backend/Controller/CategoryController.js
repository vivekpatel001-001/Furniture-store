import ProductModel from '../Model/ProductModel.js';

export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') } // case-insensitive
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Category fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};