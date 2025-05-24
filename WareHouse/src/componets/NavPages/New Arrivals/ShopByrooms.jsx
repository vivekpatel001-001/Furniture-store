import React from 'react';

const ThreeImageSection = () => {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Modern Furniture',
      title: 'Modern Design',
      description: 'Sleek and contemporary furniture pieces for your home'
    },
    {
      src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Comfortable Sofa',
      title: 'Premium Comfort',
      description: 'Ergonomic designs for ultimate relaxation'
    },
    {
      src: 'https://ik.imagekit.io/durian1985/Durian/durian/CategoryBanner/800x800/category_banner_20250502053805.jpg?tr=q-50',
      alt: 'Elegant Chair',
      title: 'Elegant Style',
      description: 'Timeless pieces that elevate your space'
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Our Featured Collections
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Larger image container */}
              <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              
              {/* Text overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
                  <p className="text-base opacity-90">{image.description}</p>
                </div>
              </div>
              
              {/* Larger view button */}
              <button className="absolute top-6 right-6 bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                View Collection
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeImageSection;