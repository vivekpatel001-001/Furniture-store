import Cart from "../Model/CartModel.js";

// Add to Cart Controller
// Add to Cart Controller
export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existing = cart.products.find((item) => item.productId.toString() === productId);
    if (existing) {
      return res.status(400).json({ message: "Product already in cart" }); // ❌ Don't add again
    }

    cart.products.push({ productId, quantity });
    await cart.save();
    res.status(200).json({ message: "Added to cart successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error while adding to cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({ message: "Missing productId" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const updatedProducts = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.products = updatedProducts;
    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateQuantity = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  if (!productId || quantity < 1) return res.status(400).json({ message: "Invalid quantity" });

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.products.find((item) => item.productId.toString() === productId);
    if (item) item.quantity = quantity;

    await cart.save();
    res.status(200).json({ message: "Quantity updated", cart });
  } catch (err) {
    res.status(500).json({ message: "Error updating quantity" });
  }
};
// Get User Cart Controller
export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
    res.status(200).json({ items: cart ? cart.products : [] });
  } catch (err) {
    res.status(500).json({ message: "Failed to load cart" });
  }
};


