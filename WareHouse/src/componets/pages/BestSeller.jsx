import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { CartContext } from '../Cart/Cartcontext';
import { WishlistContext } from '../Watchlist/Watchlistcontact';
import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BestSeller() {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // First get all unique categories
        const categoriesResponse = await axios.get('https://furniture-store-backend-29c0.onrender.com/product/get');
        const allProducts = categoriesResponse.data;
        
        // Get unique categories
        const uniqueCategories = [...new Set(allProducts.map(product => product.category))];
        
        // Fetch one product from each category
        const categoryProducts = await Promise.all(
          uniqueCategories.map(async category => {
            const response = await axios.get(`https://furniture-store-backend-29c0.onrender.com/product/category/${category}`);
            return response.data[0]; // Get first product from each category
          })
        );
        
        setProducts(categoryProducts.filter(Boolean)); // Filter out any undefined/null values
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, []);

  const handleAddToCart = (product) => {
    const formattedProduct = {
      _id: product._id,
      title: product.title,
      image: product.imageUrl,
      price: Number(product.price.replace(/[₹\s]/g, "")),
      quantity: 1
    };
    addToCart(formattedProduct);
    toast.success(`${product.title} added to cart!`);
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some(item => item._id === product._id);
    const formattedProduct = {
      _id: product._id,
      title: product.title,
      image: product.imageUrl,
      price: Number(product.price.replace(/[₹\s]/g, "")),
      description: product.description
    };

    if (isInWishlist) {
      removeFromWishlist(product._id);
      toast.info(`${product.title} removed from wishlist`);
    } else {
      addToWishlist(formattedProduct);
      toast.success(`${product.title} added to wishlist!`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-10">
          Best Seller
          <div className="w-20 h-1 bg-red-500 mx-auto mt-2"></div>
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-10">
        Best Seller
        <div className="w-20 h-1 bg-red-500 mx-auto mt-2"></div>
      </h2>

      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isInWishlist = wishlistItems.some(item => item._id === product._id);
            
            return (
              <div 
                key={product._id} 
                className="relative group bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Wishlist Icon */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-2 right-2 z-10 p-2 rounded-full shadow transition ${
                    isInWishlist 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white hover:bg-red-100'
                  }`}
                >
                  {isInWishlist ? (
                    <FaHeart className="text-xl" />
                  ) : (
                    <FiHeart className="text-xl text-gray-700" />
                  )}
                </button>

                {/* Product Image */}
                <Link to={`/product/${product._id}`}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-64 object-cover"
                  />
                </Link>

                {/* Product Info */}
                <div className="p-4 text-center">
                  <Link to={`/product/${product._id}`}>
                    <p className="text-lg font-medium text-gray-800 hover:text-indigo-600">
                      {product.title}
                    </p>
                  </Link>
                  <p className="text-md text-[#7AB6A7] font-bold">₹{product.price}</p>
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                </div>

                {/* Add to Cart Button */}
                <div className="top-1/4">
                  <button
                    className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-4 py-2 rounded transition-opacity duration-300 ${
                      hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => handleAddToCart(product)}
                  >
                
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BestSeller;