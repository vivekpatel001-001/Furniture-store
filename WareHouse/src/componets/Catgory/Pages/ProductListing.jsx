import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Sidebar from './Sidebaar';
import { CartContext } from '../../Cart/Cartcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductListing = () => {
  const { category } = useParams(); // URL से category name
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const { addToCart } = useContext(CartContext);

  // 👉 Backend से category-wise product fetch
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/category/${category}`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [category]);

  const handleAdd = (product) => {
    const formattedProduct = {
      _id: product._id,
      title: product.title,
      image: product.imageUrl,
      price: Number(product.price),
    };
    addToCart(formattedProduct);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap">
        <div className="text-sm breadcrumbs mb-4">
          <ul className="flex items-center text-gray-500">
            <li><Link to="/" className="text-amber-500">Home</Link></li>
            <li className="mx-2">/</li>
            <li className="capitalize">{category}</li>
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 capitalize">{category}</h1>
        <p className="text-gray-600">Showing {products.length} products</p>
      </div>

      <div className="flex flex-col md:flex-row">
        <aside className="md:w-1/4">
          <Sidebar />
        </aside>

        <div className="md:w-3/4 md:pl-8">
          <div className="flex justify-end mb-6">
            <div className="relative w-48">
              <select
                className="appearance-none border border-gray-300 rounded w-full py-2 px-4 pr-8 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
  <Link to={`/product/${product._id}`} key={product._id}>
    <div className="bg-white rounded-lg shadow-md overflow-hidden group relative">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
        <button
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.preventDefault();
            handleAdd(product);
          }}
        >
          Add to Cart
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
        <div className="mt-2">
          <span className="text-amber-500 font-bold">₹{product.price}</span>
        </div>
      </div>
    </div>
  </Link>
))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
