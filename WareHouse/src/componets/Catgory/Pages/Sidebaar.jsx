import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Category = ({ name, url, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  return (
    <div className="border-b border-gray-200 py-2">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <Link to={url} className="hover:text-amber-500 font-medium">{name}</Link>
        <button className="text-gray-400">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </div>
  );
};

const PriceFilter = () => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
        PRICE
        <ChevronUp size={16} className="text-gray-400" />
      </h3>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-4 w-4 rounded-full bg-green-500 cursor-pointer"></div>
        <div className="h-4 w-4 rounded-full bg-black cursor-pointer"></div>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <span>₹100</span>
        <span className="flex-grow text-center">-</span>
        <span>₹10,000</span>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <input 
          type="text" 
          placeholder="100" 
          className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
        />
        <span>-</span>
        <input 
          type="text" 
          placeholder="10000" 
          className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
        />
        <button className="bg-green-500 text-white px-4 py-1 rounded text-sm hover:bg-green-600">
          Go
        </button>
      </div>
    </div>
  );
}

const Sidebar = () => {
  const [showMore, setShowMore] = useState(false);
  
  const categories = [
    { name: 'Chairs', url: '/Catgory/Chairs' },
    { name: 'Dining', url: '/Catgory/Dining' },
    { name: 'Home Decor', url: '/Catgory/home-decor' },
    { name: 'Lamp', url: '/Catgory/Lamp' },
    { name: 'Beds', url: '/Catgory/Beds' },
    { name: 'Sofa Set', url: '/Catgory/Sofa-set' },
    { name: 'TV Units', url: '/Catgory/Tv-units' },
    { name: 'Bookshelves', url: '/Catgory/Bookshelves' },
    { name: 'Shoe Racks', url: '/Catgory/Shoe-racks' },
    { name: 'Wardrobes', url: '/Catgory/Wardrobes' },
    { name: 'study-tables', url: '/Catgory/Study-tables' },
    { name: 'recliners', url: '/Catgory/Recliners' },

  ];

  const visibleCategories = showMore ? categories : categories.slice(0, 10);

  return (
    <div className="w-64 p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
          CATEGORIES
          <ChevronUp size={16} className="text-gray-400" />
        </h3>
        <div className="space-y-1">
          {visibleCategories.map((category) => (
            <Category key={category.name} name={category.name} url={category.url} />
          ))}
          {!showMore && (
            <button 
              className="mt-2 text-green-500 font-medium flex items-center text-sm"
              onClick={() => setShowMore(true)}
            >
              <span className="mr-1">+</span> Show More
            </button>
          )}
        </div>
      </div>
      <PriceFilter />
    </div>
  );
};

export default Sidebar;