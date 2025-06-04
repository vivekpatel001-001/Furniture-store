import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi'; // Optional: search icon

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="flex w-full max-w-md mx-auto shadow-md rounded-full overflow-hidden border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-green-500 transition">
      <input
        type="text"
        placeholder="Search for products, categories..."
        className="flex-grow px-5 py-2 text-gray-700 focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button
        onClick={handleSearch}
        className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 flex items-center justify-center"
      >
        <FiSearch className="text-xl" />
      </button>
    </div>
  );
};

export default SearchBar;
