import Wishlist from '../Model/WislistModel.js';

// Add product to wishlist
export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) return res.status(404).json({ success: false, message: 'Wishlist not found' });

    wishlist.products = wishlist.products.filter((p) => p.toString() !== productId);
    await wishlist.save();

    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user's wishlist
export const getWishlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate('products');
    res.status(200).json({ success: true, wishlist: wishlist?.products || [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
