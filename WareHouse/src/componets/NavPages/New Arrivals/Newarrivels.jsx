import React from 'react'
import { IoArrowBackCircle } from "react-icons/io5";
import Newarrivel from '../../pages/Newarrivel';

function Newarrivels() {

  const products = [
    {
      id: 1,
      title: 'Elegant Comfort Sofa',
      description: 'A modern sofa with clean lines and exceptional comfort, perfect for any living room.',
      price: '$899',
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25',
    },
    {
      id: 2,
      title: 'Mid-Century Lounge Chair',
      description: 'Inspired by mid-century design, this lounge chair offers both style and support.',
      price: '$349',
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237',
    },
    {
      id: 3,
      title: 'Sculptural Table Lamp',
      description: 'An artistic table lamp that serves as both a light source and decor piece.',
      price: '$129',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
    },
  ];
  return (
    <>

      <section
        className="relative bg-cover bg-center h-[80vh] flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1950&q=80')", // Replace with your sofa image
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-white px-6 md:px-20 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">New Arrivals</h1>
          <p className="text-lg md:text-xl mb-6">
            Discover our latest collection of designer furniture pieces
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-black font-medium px-6 py-2 rounded hover:bg-gray-200 transition">
              Shop Now
            </button>
            <button className=" w-24 h-[44px] rounded text-5xl"><IoArrowBackCircle /></button> {/* Placeholder */}
          </div>
        </div>
      </section>

      <div className="container mx-auto mt-10 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* Image Section */}
          <div className="h-[350px] overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1540574163026-643ea20ade25"
              alt="Luxury Sofa"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded-2xl"
            />
          </div>

          {/* Content Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Luxury Sofas Collection</h2>
            <p className="text-lg text-gray-500 mb-2">
              Elegant and comfortable designs for your living space.
            </p>
            <p className="text-base md:text-lg mb-4">
              A modern sofa with clean lines and exceptional comfort, <br />
              perfect for contemporary living spaces.
            </p>
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Shop Sofas
            </button>
          </div>

        </div>



      </div>

      <section className="bg-gray-50 py-12 text-center">
        <h2 className="text-3xl font-bold mb-2">New Arrivals Collection</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Discover our latest furniture pieces designed to elevate your home’s aesthetic and comfort
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="relative">
                <img src={product.image} alt={product.title} className="w-full h-64 object-cover shadow-lg
 p-2 " />
                <span className="absolute top-2 right-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                  NEW
                </span>
              </div>
              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-md font-bold">{product.price}</span>
                  <button className="bg-gray-100 text-gray-800 text-sm px-4 py-1 rounded hover:bg-gray-200">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-10 bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
          View All New Arrivals
        </button>
      </section>

      <div className="container mx-auto mt-10 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* Image Section */}


          {/* Content Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">            Stylish Chair Selection

            </h2>
            <p className="text-lg text-gray-500 mb-2">              Discover our range of designer chairs for every room
            </p>
            <p className="text-base md:text-lg mb-4">
              Inspired by mid-century design, this lounge chair offers both style and comfort.

            </p>
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Shop Sofas
            </button>
          </div>
          <div className="h-[350px] overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237" alt="Luxury Sofa"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded-2xl"
            />
          </div>

        </div>
        <div>
          <Newarrivel />

        </div>
      </div>

    </>
  )
}

export default Newarrivels