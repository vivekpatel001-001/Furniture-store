import React from 'react';

const categories = [
  { name: 'Chairs', icon: '/icons/chair.svg', link: 'Category/Chairs' },
  { name: 'Home Decor', icon: '/icons/home-decore.svg', link: 'Category/home-decor' },
  { name: 'Beds', icon: '/icons/bed-icon.svg', link: 'Category/Beds' },
  { name: 'TV Units', icon: '/icons/tv-unit.svg', link: 'Category/Tv-units' },
  { name: 'Shoe Racks', icon: '/icons/shoe.svg', link: 'Category/Shoe-racks' },
  { name: 'Dining', icon: '/icons/dining-icom.svg', link: 'Category/Dining' },
  { name: 'Lamp', icon: '/icons/lamp-icon.svg', link: 'Category/Lamp' },
  { name: 'Sofa Set', icon: '/icons/sofa-icon.svg', link: 'Category/Sofa-set' },
  { name: 'Bookshelves', icon: '/icons/sofa-icon.svg', link: 'Category/Bookshelves' },
  { name: 'Wardrobes', icon: '/icons/wardrobe-icon.svg', link: 'Category/Wardrobes' },
  { name: 'Study Tables', icon: '/icons/studying-.svg', link: 'Category/Study-tables' },
  { name: 'Recliners', icon: '/icons/recliner-120x120.png', link: 'Category/Recliners' },
];

const FurnitureCategories = () => {
  return (
    <div className="bg-gray-50 py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
        Explore Our Furniture
        <div className="w-24 h-1 bg-red-500 mx-auto mt-2"></div>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
        {categories.map((category) => (
          <a
            key={category.name}
            href={category.link}
            className="flex flex-col items-center justify-center border rounded-md bg-white p-6 shadow-sm hover:shadow-lg hover:bg-blue-200 text-center group"
          >
            <img
              src={category.icon}
              alt={category.name}
              className="h-12 w-12 mb-4 transition-transform duration-300 group-hover:scale-110"
            />
            <p className="text-gray-700 text-sm font-medium">{category.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FurnitureCategories;
