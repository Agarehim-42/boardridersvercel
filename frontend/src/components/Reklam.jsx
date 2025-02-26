import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "src/assets/images/Reklam/int1.webp",
  "src/assets/images/Reklam/int2.webp",
  "src/assets/images/Reklam/int3.webp",
  "src/assets/images/Reklam/int4.webp",
  "src/assets/images/Reklam/int5.png",
  "src/assets/images/Reklam/int6.jpg",
  "src/assets/images/Reklam/int7.webp",
  "src/assets/images/Reklam/int8.webp",
  "src/assets/images/Reklam/int9.webp",
];

const Reklam = () => {
  return (
    <div className="relative w-full py-5 max-w-screen-lg mx-auto">
      <Swiper
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
     
        modules={[Autoplay, Navigation, ]}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 }, // Mobil
          768: { slidesPerView: 4, spaceBetween: 15 }, // Planşet
          1024: { slidesPerView: 8, spaceBetween: 20 }, // Desktop
        }}
        className="mySwiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center justify-center bg-white p-4 rounded-lg ">
              <img
                className="h-[100px] w-auto object-contain"
                src={src}
                alt={`slide-${index}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

     
    </div>
  );
};

export default Reklam;
