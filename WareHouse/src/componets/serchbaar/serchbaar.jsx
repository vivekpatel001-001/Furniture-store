import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-full flex items-center justify-center"
      >
        <FiSearch className="text-xl" />
      </button>
    </form>
  );
};

export default SearchBar;