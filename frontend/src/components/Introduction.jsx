import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Slider() {
  return (
    <>
      {/**
       * Daxili <style> ilə 320px - 500px aralığında "my-br" klası
       * üçün sətirsonu (\A) əlavə edirik.
       */}
      <style>
        {`
          @media screen and (max-width: 500px) {
            .my-br::after {
              content: '\\A';   /* Yeni sətr (\n) */
              white-space: pre; /* Sətirsonunu tətbiq etmək üçün */
            }
          }
        `}
      </style>

      <div className="container mx-auto py-4 relative group">
        <Swiper
          effect="fade"
          fadeEffect={{ crossFade: true }}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          className="mySwiper"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[80vh] flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:pl-16 overflow-hidden">
              {/* Mətni sol tərəfdə */}
              <div className="absolute lg:static z-10 text-center lg:text-left px-4 sm:px-0">
                <h2 className="text-endirim-mehsul text-2xl md:text-3xl font-bold uppercase text-white drop-shadow-lg">
                  Final Endirim
                </h2>
                {/**
                 * Burada "Məhsullarda" sözünü bir span-a qoyuruq,
                 * "my-br" klası sətirsonunu media query ilə idarə edəcək.
                 */}
                <h2 className="text-endirim-mehsul text-lg md:text-xl font-bold uppercase py-4 text-white">
                  Məhsullarda<span className="my-br"></span> 60%-dək endirim
                </h2>
                <Link to="/clothes">
                  <button className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base font-bold text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                    İndi Al
                  </button>
                </Link>
              </div>

              {/* Şəkil arxa planda */}
              <img
                src="src/assets/images/introduction/introduction.png"
                alt="Slayd 1"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[80vh] flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:pl-16 overflow-hidden">
              <div className="absolute lg:static z-10 text-center lg:text-left px-4 sm:px-0">
                <h2 className="text-endirim-mehsul text-2xl md:text-3xl font-bold uppercase text-white drop-shadow-lg">
                  Final Endirim
                </h2>
                <h2 className="text-endirim-mehsul text-lg md:text-xl font-bold uppercase py-4 text-white">
                  Məhsullarda<span className="my-br"></span> 60%-dək endirim
                </h2>
                <Link to="/clothes">
                  <button className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base font-bold text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                    İndi Al
                  </button>
                </Link>
              </div>
              <img
                src="src/assets/images/introduction/introduction1.png"
                alt="Slayd 2"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation Buttons (düzbucaqlı dizayn) */}
        <button
          className="
            custom-prev
            absolute left-4 top-1/2 -translate-y-1/2 z-20
            bg-white/80 backdrop-blur-sm
            w-14 h-10 flex items-center justify-center
            rounded-md shadow-lg
            transition-all duration-300
            opacity-0 group-hover:opacity-100
            hover:bg-white
          "
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
        <button
          className="
            custom-next
            absolute right-4 top-1/2 -translate-y-1/2 z-20
            bg-white/80 backdrop-blur-sm
            w-14 h-10 flex items-center justify-center
            rounded-md shadow-lg
            transition-all duration-300
            opacity-0 group-hover:opacity-100
            hover:bg-white
          "
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>
      </div>
    </>
  );
}

export default Slider;
