import ProductModel from '../Model/ProductModel.js';

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    
    const results = await ProductModel.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    }).limit(50); // Limit results

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Search failed'
    });
  }
};