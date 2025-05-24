import React from 'react';

function Poster() {
  return (
    <>
      {/* Top Poster Row */}
      <div className="container mx-auto flex flex-col md:flex-row mt-20 gap-6 p-4">
        {/* Poster Card */}
        {[
          {
            img: 'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/64144b9f80da0d77c3ffcbb8/banner-1-1024x1024.jpg',
            bg: 'bg-orange-200',
            text: 'Living room sets'
          },
          {
            img: 'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/6411ceb9dfb4ba9b043e8ed6/banner-2-1024x1024.jpg',
            bg: 'bg-blue-200',
            text: 'Living room sets'
          },
          {
            img: 'https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/64144acf0a5ce77571c41037/banner-3-1024x1024.jpg',
            bg: 'bg-orange-200',
            text: 'Living room sets'
          }
        ].map((item, index) => (
          <div key={index} className="w-full md:w-1/3">
            <div>
              <img src={item.img} alt="poster" className="w-full" />
            </div>
            <div className={`${item.bg} text-center py-4`}>
              <h2 className="text-2xl">Upto 35% off</h2>
              <p className="text-black text-3xl font-semibold">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Poster Section */}
      <div className="container mx-auto mt-10 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Poster */}
          <div className="relative w-full md:w-1/2">
            <img
              src="https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/6413f95324823ef0be65e103/banner7-1000x450.jpg"
              alt="left poster"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/3 left-5 bg-white/80 p-4 rounded">
              <h2 className="text-xl md:text-2xl text-black">Flat 20% Off</h2>
              <h2 className="text-2xl md:text-3xl text-black font-bold">Sofas & Stools</h2>
              <div className="w-20 h-1 bg-black mt-2"></div>
            </div>
          </div>

          {/* Right Poster */}
          <div className="relative w-full md:w-1/2">
            <img
              src="https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/6413f7fe24823ef0be65b46c/banner8-1000x450.jpg"
              alt="right poster"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/3 left-5 bg-white/80 p-4 rounded">
              <h2 className="text-xl md:text-2xl text-black">Flat 20% Off</h2>
              <h2 className="text-2xl md:text-3xl text-black font-bold">Sofas & Stools</h2>
              <div className="w-20 h-1 bg-black mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Poster;
