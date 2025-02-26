import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

const Card = ({ image, title, description, button, to }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden w-[350px] md:w-[400px] lg:w-[450px] p-6 transform transition-all duration-300 hover:scale-95 hover:shadow-2xl hover:rounded-3xl flex flex-col items-center">
        <div className="w-full h-[280px] md:h-[320px] lg:h-[350px]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mt-4">{title}</h3>
        <p className="text-gray-600 text-center mt-2">{description}</p>
        <Link
          to={to}
          className="mt-4 bg-[#fe9034] text-white font-medium py-2 px-6 rounded-full border border-[#fe9034] transition-all duration-300 hover:bg-white hover:text-[#fe9034]"
        >
          {button}
        </Link>
      </div>
    </div>
  );
};

const Woman = () => {
  const swiperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.params.navigation.prevEl = prevButtonRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = nextButtonRef.current;
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

  return (
    <div
      className="relative w-full py-12 bg-cover bg-center group"
      style={{ backgroundImage: `url('src/assets/images/woman/woman1.webp')` }}
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            998: { slidesPerView: 2 },
          }}
        >
          <SwiperSlide>
            <Card
              image="src/assets/images/woman/woman2.webp"
              title="Zövqlü Geyim"
              description="Kişi modasında ən son trendlər."
              button="KİŞİLƏR"
              to="/clothes"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              image="src/assets/images/woman/woman3.webp"
              title="Əlverişli Qiymətlər"
              description="Qadın modasında ən son trendlər."
              button="QADINLAR"
              to="/qadin"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              image="src/assets/images/woman/woman4.webp"
              title="İndi Alış-veriş et"
              description="Ən son kolleksiyamızı araşdırın."
              button="UŞAQLAR"
              to="/usaq"
            />
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          ref={prevButtonRef}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#fe9034] p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-[#fe9034] hover:text-white"
        >
          <ChevronLeft className="w-6 h-6 text-current" />
        </button>
        <button
          ref={nextButtonRef}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#fe9034] p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-[#fe9034] hover:text-white"
        >
          <ChevronRight className="w-6 h-6 text-current" />
        </button>
      </div>
    </div>
  );
};

export default Woman;
