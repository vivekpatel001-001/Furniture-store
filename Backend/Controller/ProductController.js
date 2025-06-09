// controllers/ProductController.js

import ProductModel from '../Model/ProductModel.js';

// ✅ Create Product
export const createProduct = async (req, res) => {
    try {
      const { title, description, price, category, imageUrl } = req.body;
  
      // वैलिडेशन
      if (!title || !price || !category || !imageUrl) {
        return res.status(400).json({ message: 'All flieds are requried ' });
      }
  
      const newProduct = new ProductModel({
        title,
        description,
        price,
        category,
        imageUrl,
        createdBy: req.user?._id,
      });
  
      await newProduct.save();
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: newProduct,
      });    } catch (error) {
      console.error('त्रुटि:', error);
      res.status(500).json({ message: ' servere error ' });
    }
}


// ✅ Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// ✅ Get Single Product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// ✅ Update Product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, category, imageUrl } = req.body;

  try {
    // Check if product exists
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product fields
    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.imageUrl = imageUrl || product.imageUrl;

    // Save updated product
    const updatedProduct = await product.save();

    // Respond with the updated product
    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product", error });
  }
}

// ✅ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// ✅ Get Products by Category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await ProductModel.find({ category });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found in this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category', error: error.message });
  }
};
// Total Count products
export const  totalproduct = async ( req , res) =>{
  try {
    const productCount  = await ProductModel.countDocuments(); // Count the total documents in the Product collection
    res.json({ count: productCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total product count', error: error.message });
  }
}
// serch 
