import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const searchQuery = new URLSearchParams(location.search).get('q');

  const fetchResults = async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!query?.trim()) {
        setProducts([]);
        return;
      }

      const { data } = await axios.get('https://furniture-store-backend-29c0.onrender.com/search', {
        params: { q: query },
        timeout: 10000
      });

      if (!data?.success) {
        throw new Error(data?.message || 'Invalid server response');
      }

      setProducts(data.data || []);
    } catch (err) {
      console.error("Search error:", {
        error: err,
        response: err.response,
        query: query
      });
      
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to load search results. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce the search to avoid rapid API calls
    const timer = setTimeout(() => {
      fetchResults(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleRetry = () => {
    fetchResults(searchQuery);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <span className="mr-1">←</span> Back
        </button>
        <h1 className="text-2xl font-bold">
          Results for: <span className="text-green-600">"{searchQuery}"</span>
        </h1>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={handleRetry}
                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Retry Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
          <p className="text-gray-600">Searching for "{searchQuery}"...</p>
        </div>
      )}

      {/* Results Display */}
      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">Try different search terms or check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <Link to={`/product/${product._id}`} className="block">
                    <div className="relative pb-2/3 h-48">
                      <img
                        src={product.imageUrl || '/placeholder-product.jpg'}
                        alt={product.title}
                        className="absolute h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder-product.jpg';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.title}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-green-600 font-bold">₹{product.price}</span>
                        {product.stock > 0 ? (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">In Stock</span>
                        ) : (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;