import ProductModel from '../Model/ProductModel.js';

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    
    // Validate search query
    if (!q || typeof q !== 'string' || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid search term'
      });
    }

    // Clean and prepare search term
    const searchTerm = q.trim();
    const escapedTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    // Build search query with proper error handling
    const searchQuery = {
      $or: [
        { title: { $regex: escapedTerm, $options: 'i' } },
        { description: { $regex: escapedTerm, $options: 'i' } },
        { category: { $regex: escapedTerm, $options: 'i' } }
      ]
    };

    // Execute search with proper error handling
    const results = await ProductModel.find(searchQuery)
      .select('_id title description price category imageUrl stock')
      .limit(50)
      .lean()
      .catch(err => {
        throw new Error(`Database query failed: ${err.message}`);
      });

    // Format results consistently
    const formattedResults = results.map(product => ({
      _id: product._id,
      title: product.title || 'No title',
      description: product.description || 'No description',
      price: product.price || '0',
      category: product.category || 'Uncategorized',
      imageUrl: product.imageUrl || '/placeholder-product.jpg',
      stock: product.stock || 0
    }));

    return res.json({
      success: true,
      count: formattedResults.length,
      data: formattedResults
    });

  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({
      success: false,
      message: 'Search operation failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};