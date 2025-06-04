import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate(); // <-- Added

  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/serch/search', {
          params: { q: searchQuery }
        });
        setProducts(data.data || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [searchQuery]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate('/')}
        className="mb-4 bg-orange-500 hover:bg-green-500 text-white px-4 py-2 rounded"
      >
        ← Back to Home
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center uppercase">
        Search Results for: "<span className="text-green-700">{searchQuery}</span>"
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-red-500">No products found</p>
      ) : (
        <div className="space-y-6">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="flex items-center gap-4 border-b pb-4 hover:bg-gray-50 p-4 rounded transition duration-200 cursor-pointer">
                <img
                  src={product.imageUrl || '/placeholder-product.jpg'}
                  alt={product.title}
                  className="w-28 h-28 object-cover rounded-md"
                />
                <div className="flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-teal-500">{product.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  <span className="text-green-600 font-bold mt-2">₹{product.price}</span>
                  {product.category && (
                    <div className="text-xs bg-gray-200 px-2 py-1 rounded mt-1 inline-block w-fit">
                      {product.category}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
