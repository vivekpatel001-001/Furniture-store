import React from 'react';
import { MapPin, Store } from 'lucide-react';

const VisitStoreSection = () => {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 relative inline-block after:content-[''] after:block after:w-24 after:h-0.5 after:bg-yellow-500 after:mx-auto after:mt-2">
          Visit A Durian Store
        </h2>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          {/* Left Image */}
          <div className="w-full lg:w-1/2 rounded-lg shadow-md overflow-hidden">
            <img
              src="https://images.durian.in/assets/images/home_page_store.jpg?tr=h-600"
              alt="Visit Durian Store"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">
              Visit One of Our 55+ Stores Today
            </h3>
            <p className="text-gray-600 mb-6">
              Experience our pieces to find your true style
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 hover:bg-gray-100 transition">
                <Store size={18} />
                Visit Your Nearest Durian Store
              </button>
              <button className="flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 hover:bg-gray-100 transition">
                <MapPin size={18} />
                View All Locations
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitStoreSection;
