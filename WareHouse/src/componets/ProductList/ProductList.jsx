import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

export default function CategoryProducts() {

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);  // wishlist product IDs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  const token = localStorage.getItem("token");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://furniture-store-backend-29c0.onrender.com/products/getData");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);


  // Fetch wishlist from backend if logged in, else from localStorage
  useEffect(() => {
    const fetchWishlist = async () => {
      if (token) {
        try {
          const res = await axios.get("https://furniture-store-backend-29c0.onrender.com/wislist/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Store wishlist product IDs for quick lookup
          const wishlistIds = res.data.wishlist.map((item) => item._id);
          setWishlist(wishlistIds);
        } catch (error) {
          console.error("Failed to fetch wishlist", error);
        }
      } else {
        // Get wishlist from localStorage
        const localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const localWishlistIds = localWishlist.map((item) => item._id);
        setWishlist(localWishlistIds);
      }
    };
    fetchWishlist();
  }, [token]);

  // Handle add to cart
  const handleAddToCart = async (product) => {
    if (token) {
      try {
        const response = await fetch("https://furniture-store-backend-29c0.onrender.com/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product._id,
            quantity: 1,
          }),
        });
        const data = await response.json();
        alert(data.message || "Added to cart!");
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Error adding to cart");
      }
    } else {
      let localCart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = localCart.find((item) => item._id === product._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        localCart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(localCart));
      alert("Added to cart (local)");
    }
  };

  // Handle toggle wishlist add/remove
  const handleToggleWishlist = async (product) => {
    if (token) {
      try {
        if (wishlist.includes(product._id)) {
          // Remove from wishlist
          await axios.delete(`https://furniture-store-backend-29c0.onrender.com/wislist/remove/${product._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setWishlist((prev) => prev.filter((id) => id !== product._id));
          alert("Removed from wishlist");
        } else {
          // Add to wishlist
          await axios.post(
            "https://furniture-store-backend-29c0.onrender.com/wislist/add",
            { productId: product._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setWishlist((prev) => [...prev, product._id]);
          alert("Added to wishlist");
        }
      } catch (error) {
        console.error("Wishlist update error:", error);
        alert("Failed to update wishlist");
      }
    } else {
      // LocalStorage handling
      let localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (wishlist.includes(product._id)) {
        localWishlist = localWishlist.filter((item) => item._id !== product._id);
        setWishlist((prev) => prev.filter((id) => id !== product._id));
        alert("Removed from wishlist (local)");
      } else {
        localWishlist.push(product);
        setWishlist((prev) => [...prev, product._id]);
        alert("Added to wishlist (local)");
      }
      localStorage.setItem("wishlist", JSON.stringify(localWishlist));
    }
  };

  if (loading) return <div className="text-center text-lg py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-6 capitalize text-center">{category} Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white group border p-2 shadow-md relative overflow-hidden transition duration-300 rounded-md"
          >
            {/* Wishlist Icon */}
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={() => handleToggleWishlist(p)}
                className="bg-white rounded-full p-2 shadow transition"
                aria-label={wishlist.includes(p._id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  size={20}
                  fill={wishlist.includes(p._id) ? "red" : "none"}
                  color={wishlist.includes(p._id) ? "red" : "black"}
                />
              </button>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src={p.image}
                alt={p.title}
                className="h-120 w-full object-cover transition-transform duration-300"
              />

              {/* Price fixed inside image bottom */}
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 group-hover:opacity-0 transition-opacity duration-300">
                ₹{p.price}
              </div>

              {/* Add to Cart button (on hover bottom only) */}
              <div className="absolute bottom-6 left-0 w-full flex justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <button
                  className="bg-white text-black px-4 py-1 p-2 rounded flex items-center gap-1 text-sm shadow hover:bg-black hover:text-white"
                  onClick={() => handleAddToCart(p)} // <-- Fix here: send single product p
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
