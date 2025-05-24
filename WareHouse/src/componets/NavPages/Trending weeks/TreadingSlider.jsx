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
        className="w-full h-150"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://images.durian.in/Durian/durian/CategoryBanner/800x800/category_banner_20250502054146.jpg"
              alt="Slide 1"
              className="w-full h-[60vh] md:h-[80vh] object-cover"
            />
         
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://images.durian.in/Durian/durian/CategoryBanner/800x800/category_banner_20250502054151.jpg"
              alt="Slide 2"
              className="w-full h-[60vh] md:h-[80vh] object-cover"
            />
        
          </div>
        </SwiperSlide>

  
      </Swiper>
    </div>
  );
}
