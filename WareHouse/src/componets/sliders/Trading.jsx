import React, { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';   // outline heart icon

import { CartContext } from '../Cart/Cartcontext';
import { WishlistContext } from '../Watchlist/Watchlistcontact';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ✅ Add this

const Trading = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const allProductsResponse = await axios.get('https://furniture-store-backend-29c0.onrender.com/product/get');
        const allProducts = allProductsResponse.data;

        const uniqueCategories = [...new Set(allProducts.map(product => product.category))];

        const categoryProductsPromises = uniqueCategories.map(async category => {
          const response = await axios.get(`https://furniture-store-backend-29c0.onrender.com/product/category/${category}`);
          return response.data.slice(0, 2);
        });

        const categoryProducts = await Promise.all(categoryProductsPromises);
        const flattenedProducts = categoryProducts.flat();

        setProducts(flattenedProducts);
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
          Explore Our Furniture
          <div className="w-24 h-1 bg-red-500 mx-auto mt-2"></div>
        </h2>
      </div>

      <Swiper
        slidesPerView={5}
        spaceBetween={25}
        freeMode={true}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper px-4"
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {products.map((product) => {
          const isInWishlist = wishlistItems.some(item => item._id === product._id);
          return (
            <SwiperSlide key={product._id}>
              <div className="relative bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition">
                
                {/* Wishlist Icon */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-2 right-2 z-10 p-2 rounded-full shadow transition ${
                    isInWishlist 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white hover:bg-red-100'
                  }`}
                >
                  {isInWishlist ? <FaHeart className="text-xl" /> : <FiHeart className="text-xl text-gray-700" />}
                </button>

                {/* ✅  Product Image and Title Wrapped in Link */}
                <Link to={`/product/${product._id}`}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-60 object-cover mb-3"
                  />
                  <p className="text-lg font-medium text-gray-800 hover:text-indigo-600">
                    {product.title}
                  </p>
                </Link>

                <p className="text-md text-[#7AB6A7] font-bold">₹{product.price}</p>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Trading;
