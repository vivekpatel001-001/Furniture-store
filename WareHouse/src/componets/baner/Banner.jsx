import React from 'react';

const categories = [
  {
    title: 'SPECIAL OFFER',
    subtitle: 'Recycled metal',
    bgImg: 'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/6417eee0df469a5e51c64c3d/banner6-640x640.jpg', // Example: light blue background with lamps
  },
  {
    title: 'TOP PICKS',
    subtitle: 'Custom woodwork',
    bgImg: 'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/6417ef44df469a5e51c64ee1/banner9-640x640.jpg', // Beige wood background
  },
  {
    title: 'MINIMAL DECOR',
    subtitle: 'Handmade Pottery',
    bgImg: 'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/6417ef5ddf469a5e51c64f9d/banner10-640x640.jpg', // Minimal gray background
  },
];

const CategoryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-8 max-w-7xl mx-auto">
      {categories.map((cat, index) => (
        <div
          key={index}
          className="relative rounded-lg overflow-hidden flex items-center justify-between p-6 h-56 bg-cover bg-center"
          style={{ backgroundImage: `url(${cat.bgImg})` }}
        >
          {/* Text Overlay */}
          <div className="z-10 text-white">
            <p className="uppercase text-sm opacity-90">{cat.title}</p>
            <h3 className="text-xl md:text-2xl font-semibold border-b border-white inline-block">
              {cat.subtitle}
            </h3>
          </div>

          
          <div className="absolute inset-0 bg-black/10 z-0"></div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;
