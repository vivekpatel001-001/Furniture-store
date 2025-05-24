import React, { useState } from "react";
import { Search } from "lucide-react";

// Sample Products List
const PRODUCTS = [
  {
    id: 1,
    name: 'Believable Trundle Bed',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVkfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    originalPrice: 56680,
    discountedPrice: 55650,
    discountPercentage: 1,
    category: 'beds',
    description: "Comfortable and stylish trundle bed perfect for space saving."

  },
  {
    id: 2,
    name: 'DHGG Chair',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    originalPrice: 6500,
    discountedPrice: 4500,
    discountPercentage: 30,
    category: 'chairs',
    description: "Modern and ergonomic chair ideal for long sitting hours."

  },
  {
    id: 3,
    name: 'Epic Chair',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZXJuJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    originalPrice: 6400,
    discountedPrice: 5600,
    discountPercentage: 12,
    category: 'chairs',
    description: "A sleek design chair to enhance any living space."

  },
  {
    id: 4,
    name: 'Ipsum Chair',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    originalPrice: 7560,
    discountedPrice: 5600,
    discountPercentage: 25,
    category: 'chairs',
    description: "Elegant chair with soft cushions and wooden frame."

  },
  {
    id: 5,
    name: 'Janes Chair with armrest',
    image: 'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/64131c9c1a9f7fb7bd30934e/p3-640x640.jpg',
    originalPrice: 6700,
    discountedPrice: 5600,
    discountPercentage: 16,
    category: 'chairs',
    description: "Comfortable armrest chair for dining or living area."

  },
  {
    id: 6,
    name: 'Office Chair',
    image: 'https://images.unsplash.com/photo-1589384267710-7a170981ca78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG9mZmljZSUyMGNoYWlyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    originalPrice: 7600,
    discountedPrice: 6500,
    discountPercentage: 14,
    category: 'chairs',
    description: "Adjustable office chair with lumbar support."

  },
  {
    id: 7,
    name: 'Turpiss Chair',
    image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRhYmxlJTIwYW5kJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    originalPrice: 7500,
    discountedPrice: 5600,
    discountPercentage: 25,
    category: 'chairs',
    description: "Classic design chair ideal for reading corners."

  },
  // नए होम डेकोर प्रोडक्ट्स जोड़ें
  {
    id: 8,
    name: 'Elegant Wall Art',
    image: 'https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdhbGwlMjBhcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    originalPrice: 3500,
    discountedPrice: 2800,
    discountPercentage: 20,
    category: 'home-decor',
    description: "Contemporary vase set perfect for living room decor."

  },
  {
    id: 9,
    name: 'Modern Vase Set',
    image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    originalPrice: 2500,
    discountedPrice: 2000,
    discountPercentage: 20,
    category: 'home-decor',
    description: "Contemporary vase set perfect for living room decor."

  },
  {
    id: 10,
    name: 'Decorative Cushions',
    image: 'https://media.istockphoto.com/id/1065832096/video/modern-apartment-living-room.jpg?b=1&s=640x640&k=20&c=skJUlW4qnvJO4jmHx3ABvIIXhrBtYgVVmftC8EiaTBU=',
    originalPrice: 1800,
    discountedPrice: 1200,
    discountPercentage: 33,
    category: 'home-decor',
    description: "Soft and colorful cushions to add cozy vibes."

  },
  {
    id: 11,
    name: 'Table Centerpiece',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVjb3JhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    originalPrice: 3200,
    discountedPrice: 2800,
    discountPercentage: 12,
    category: 'home-decor',
    description: "Stylish centerpiece that suits any table setting."

  },
  // नए डाइनिंग प्रोडक्ट्स जोड़ें
  {
    id: 12,
    name: 'Dining Table Set',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGluaW5nJTIwdGFibGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    originalPrice: 42000,
    discountedPrice: 38000,
    discountPercentage: 10,
    category: 'dining',
    description: "Elegant dining table set for family meals."

  },
  {
    id: 13,
    name: 'Modern Dining Chairs',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGluaW5nJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    originalPrice: 8500,
    discountedPrice: 7200,
    discountPercentage: 15,
    category: 'dining',
    description: "Minimalist dining chairs with comfortable padding."

  },
  {
    id: 14,
    name: 'Dining Storage Cabinet',
    image: 'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/641445cf7cd80f6e8908ada9/p14-640x640.jpg',
    originalPrice: 18500,
    discountedPrice: 16000,
    discountPercentage: 14,
    category: 'dining',
    description: "Spacious cabinet for storing dinnerware and cutlery."

  },
  {
    id: 15,
    name: 'Elegant Dinner Set',
    image: 'https://c4.wallpaperflare.com/wallpaper/9/496/896/interior-modern-modern-interior-wallpaper-preview.jpg',
    originalPrice: 12000,
    discountedPrice: 10000,
    discountPercentage: 17,
    category: 'dining',
    description: "Luxury dinner set for special family gatherings."

  },
  {
    id: 26,
    name: 'lampdestory ',
    image: 'https://c4.wallpaperflare.com/wallpaper/9/496/896/interior-modern-modern-interior-wallpaper-preview.jpg',
    originalPrice: 12000,
    discountedPrice: 10000,
    discountPercentage: 17,
    category: 'lamp',
    description: "Unique lamp design to light up your home stylishly."

  },
  {
    id: 16,
    name: 'Believable Trundle Bed',
    image: 'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/64131c9c1a9f7fb7bd30934e/p3-640x640.jpg',
    originalPrice: 56680,
    discountedPrice: 55650,
    discountPercentage: 1,
    category: 'beds',
    description: "Stylish trundle bed with hidden storage options."

  },
  {
    id: 17,
    name: 'Believable Trundle Bed',
    image: 'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/6413162a1a9f7fb7bd304e34/p5-640x640.jpg',
    originalPrice: 56680,
    discountedPrice: 55650,
    discountPercentage: 1,
    category: 'beds',
    description: "Elegant finish and extra comfort for everyday sleep."

  },
  {
    id: 18,
    name: 'Believable Trundle Bed',
    image: 'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/64130321870348863f60e943/p1-640x640.jpg',
    originalPrice: 56680,
    discountedPrice: 55650,
    discountPercentage: 1,
    category: 'beds',
    description: "Perfect solution for small rooms and guest beds."

  },
  {
    id: 19,
    name: 'Believable Trundle Bed',
    image: 'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/64130321870348863f60e943/p1-640x640.jpg',
    originalPrice: 56680,
    discountedPrice: 55650,
    discountPercentage: 1,
    category: 'sofa-set',
    description: "Multipurpose bed that fits both decor and comfort."

  },
  {
    id: 20,
    name: 'Believable Trundle Bed',
    image: 'https://media.istockphoto.com/id/157649770/photo/living-room.webp?a=1&b=1&s=612x612&w=0&k=20&c=XUPAmsVc44SPbttwh1T5CmsQxWEd07MNA47QEbsceLc=',
    originalPrice: 56680,
    discountedPrice: 55650,
    discountPercentage: 1,
    category: 'sofa-set',
    description: "Contemporary bed crafted with premium material."

  },
  {
    id: 21,
    name: 'Believable Trundle Bed',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29mYSUyMHNldHxlbnwwfHwwfHx8MA%3D%3D',
    originalPrice: 56680,
    discountedPrice: 55650,
    discountPercentage: 1,
    category: 'sofa-set',
    description: "Sophisticated style with durable wooden frame."

  },
  {
    id: 22,
    name: 'Believable Trundle Bed',
    image: 'https://images.unsplash.com/photo-1621431968395-aa88d785ef9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHYlMjB1bml0fGVufDB8fDB8fHww',
    originalPrice: 56680,
    discountedPrice: 55650,
    discountPercentage: 1,
    category: 'tv-units',
    description: "TV unit bed combo for smart space management."

  },
  {
    id: 23,
    name: 'Believable Trundle Bed',
    image: 'https://plus.unsplash.com/premium_photo-1675615667689-40378da89573?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHYlMjB1bml0fGVufDB8fDB8fHww',
    originalPrice: 56680,
    discountedPrice: 55650,
    discountPercentage: 1,
    category: 'tv-units',
    description: "Modern TV stand design with extra shelf space."

  },
  {
    id: 24,
    name: 'Believable Trundle Bed',
    image: 'https://png.pngtree.com/background/20250301/original/pngtree-stylish-beige-tv-unit-with-black-accents-and-retractable-tv-picture-image_13372395.jpg',
    originalPrice: 56680,
    discountedPrice: 55650,
    discountPercentage: 1,
    category: 'tv-units',
    description: "Beige TV unit with sleek and minimal features."

  },
  {
    id: 25,
    name: 'Believable Trundle Bed',
    image: 'https://png.pngtree.com/background/20250301/original/pngtree-stylish-beige-tv-unit-with-black-accents-and-retractable-tv-picture-image_13372395.jpg',
    originalPrice: 56680,
    discountedPrice: 55650,
    discountPercentage: 1,
    category: 'study-tables',
    description: "Study table with modern finish and drawers."

  }
];
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const matchedProduct = PRODUCTS.find((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );


  const handleSearch = (e) => {
    e.preventDefault();
    
    if (query.trim() === "") {
      setResults([]);
      setError("Please enter something to search.");
      return;
    }
    // Filter products based on query
    const filtered = PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex items-center border border-amber-500 rounded-2xl overflow-hidden shadow-sm bg-white"
      >
        {/* Dynamic Image on Left */}
       

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          className="w-full px-4 py-2 text-md focus:outline-none rounded-2xl"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="p-2 bg-orange-100 hover:bg-gray-200 mr-2 rounded-xl transition-colors"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button>
      </form>

      {/* Search Results with Image */}
      <div className="mt-4 bg-white rounded-xl shadow p-4">
        {results.length > 0 ? (
          <ul className="space-y-3">
            {results.map((product) => (
              <li key={product.id} className="flex items-center gap-4 border-b pb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <span className="text-gray-800 font-medium">{product.name}</span>
              </li>
            ))}
          </ul>
        ) : query !== "" ? (
          <p className="text-gray-500">No products found.</p>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;
