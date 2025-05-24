import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';

export default function App() {
  return (
    <div className="w-full h-full">
      <Swiper
        navigation={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        className="w-full h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/6418036693074a75cb3801f5/slide2-1920x750.jpg"
              alt="Slide 1"
              className="w-full h-[60vh] md:h-[80vh] object-cover"
            />
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center w-[90%] md:w-auto">
              <p className="text-lg md:text-2xl text-gray-500 mb-2">70% Off</p>
              <p className="text-3xl md:text-5xl font-bold uppercase mb-2">Spring Sale</p>
              <p className="text-lg md:text-2xl text-gray-500 mb-4">No time to Blink</p>
              <button className="bg-transparent border border-black hover:bg-black hover:text-white transition px-6 py-2 text-sm md:text-base uppercase rounded-full">
                Shop Me
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://demo-vue-furniture.storehippo.com/s/641185736319bb2bbd152d5a/64195d7fbc759b7a475889bc/slide2-1920x750.jpg"
              alt="Slide 2"
              className="w-full h-[60vh] md:h-[80vh] object-cover"
            />
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center w-[90%] md:w-auto">
              <p className="text-lg md:text-2xl text-gray-500 mb-2">Flat 15% Off</p>
              <p className="text-2xl md:text-5xl font-bold uppercase mb-2">
                Simple & Modern <br className="hidden md:block" /> Furniture
              </p>
              <p className="text-lg md:text-2xl text-gray-500 mb-4">No time to Blink</p>
              <button className="bg-transparent border border-black hover:bg-black hover:text-white transition px-6 py-2 text-sm md:text-base uppercase rounded-full">
                Shop Me
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
