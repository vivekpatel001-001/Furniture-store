import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiHeart,FiShoppingCart } from 'react-icons/fi';



const productImages = [
  'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/641316711a9f7fb7bd30594a/p6-640x640.jpg',
  'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/64130321870348863f60e943/p1-640x640.jpg',
  'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/641448107cd80f6e8908b7a6/p11-640x640.jpg',
];

const NewArrivals = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % productImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className=" p-8 shadow-sm bg-white">
          <h2 className="text-3xl font-bold text-black mb-2">
            New <span className="border-b-4 border-[#D79C89]">Arrivals</span>
          </h2>
          <p className="text-gray-600 mt-4 mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim ut sem viverra aliquet eget sit amet. Nunc scelerisque viverra.
          </p>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-black text-black hover:bg-black hover:text-white transition">
            <FiArrowRight />
          </button>
        </div>

        {/* Right Product Card */}
        <div className="relative w-full h-[480px] overflow-hidden group shadow-lg rounded-md">
          {/* Discount Tag */}
          <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-2 py-1 z-10">
            -19%
          </div>

          {/* Heart Icon */}
          <div className="absolute top-3 right-3 z-10">
            <button className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:text-red-500 transition">
              <FiHeart />
            </button>
          </div>

          {/* Image */}
          <img
            src={productImages[currentImage]}
            alt="Hydraulic Bed"
            className="w-full h-full object-cover transition duration-700"
          />

          {/* Product Info */}
          <div className="absolute bottom-0 w-full bg-white bg-opacity-90 py-4 text-center z-10">
            <p className="text-gray-800 font-medium">BGDD Hydraulic Bed</p>
            <div className="flex justify-center items-center gap-3 mt-1 text-sm">
              <span className="line-through text-gray-400">₹89,720</span>
              <span className="text-[#7AB6A7] font-bold">₹88,650</span>
            </div>
          </div>

          {/* Add to Cart Button (slide in on hover) */}
          <div className="absolute bottom-[-60px] left-0 w-full flex justify-center transition-all duration-500 group-hover:bottom-24 z-20">
            <button className="bg-black text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition">
              <FiShoppingCart />
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Right Image Card */}
        <div className="relative w-full h-[480px] overflow-hidden group shadow-lg">
          {/* Discount Tag */}
          <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-2 py-1 z-10">
            -19%
          </div>

          {/* Heart Icon */}
          <div className="absolute top-3 right-3 z-10">
            <button className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:text-red-500 transition">
              <FiHeart />
            </button>
          </div>

          {/* Image */}
          <img
            src={productImages[currentImage]}
            alt="Hydraulic Bed"
            className="w-full h-full object-cover transition duration-700"
          />

          {/* Product Info Box */}
          <div className="absolute bottom-0 w-full bg-white bg-opacity-90 py-4 text-center">
            <p className="text-gray-800 font-medium">BGDD Hydraulic Bed</p>
            <div className="flex justify-center items-center gap-3 mt-1 text-sm">
              <span className="line-through text-gray-400">₹89,720</span>
              <span className="text-[#7AB6A7] font-bold">₹88,650</span>
            </div>
          </div>
        </div>

        {/* Left Content */}
        <div className=" p-8 shadow-sm bg-white">
          <h2 className="text-3xl font-bold text-black mb-2">
            New <span className="border-b-4 border-[#D79C89]">Arrivals</span>
          </h2>
          <p className="text-gray-600 mt-4 mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim ut sem viverra aliquet eget sit amet. Nunc scelerisque viverra.
          </p>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-black text-black hover:bg-black hover:text-white transition">
            <FiArrowRight />
          </button>
        </div>



      </section>
    </>





















  );
};

export default NewArrivals;
