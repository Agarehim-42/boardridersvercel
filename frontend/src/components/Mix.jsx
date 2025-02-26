import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react"; // uyğun icon kitabxanasını idxal edin

const Mix = () => {
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const galleryItems = [
    { src: "/src/assets/images/mix/gallery-1.jpg", to: "/fashion/yellow-style" },
    { src: "/src/assets/images/mix/gallery-2.jpg", to: "/fashion/summer-vibes" },
    { src: "/src/assets/images/mix/gallery-3.jpg", to: "/fashion/elegant-look" },
    { src: "/src/assets/images/mix/gallery-4.jpg", to: "/fashion/casual-wear" },
    { src: "/src/assets/images/mix/gallery-5.jpg", to: "/fashion/formal-wear" },
    { src: "/src/assets/images/mix/gallery-6.jpg", to: "/fashion/street-style" },
    { src: "/src/assets/images/mix/gallery-7.jpg", to: "/fashion/red-theme" },
    { src: "/src/assets/images/mix/gallery-8.jpg", to: "/fashion/glamour" },
    { src: "/src/assets/images/mix/gallery-9.jpg", to: "/fashion/night-look" },
    { src: "/src/assets/images/mix/gallery-10.jpg", to: "/fashion/modern-style" },
    { src: "/src/assets/images/mix/gallery-11.jpg", to: "/fashion/winter-wear" },
    { src: "/src/assets/images/mix/gallery-12.jpg", to: "/fashion/spring-fashion" },
    { src: "/src/assets/images/mix/gallery-13.jpg", to: "/fashion/stylish-coats" },
    { src: "/src/assets/images/mix/gallery-14.jpg", to: "/fashion/denim-trend" },
    { src: "/src/assets/images/mix/gallery-15.jpg", to: "/fashion/classic-look" },
  ];

  return (
    <section className="bg-white py-12">
      {/* Başlıq */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#fe9034] uppercase tracking-wide">
          2025ci İlİn Modası 
        </h1>
        <p className="mt-2 text-gray-600">
          Pozitiv və cəlbedici dizaynla seçilən kolleksiyalar
        </p>
      </div>

      <div className="container mx-auto px-4 relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          autoplay={{ delay: 3000 }}
          loop={true}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevButtonRef.current;
            swiper.params.navigation.nextEl = nextButtonRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 25 },
            1280: { slidesPerView: 5, spaceBetween: 30 },
          }}
        >
          {galleryItems.map((item, index) => (
            <SwiperSlide key={index}>
              <a
                href={item.to}
                className="group relative block overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="aspect-[3/4] w-full">
                  <img
                    src={item.src || "/placeholder.svg"}
                    alt={`Moda qalereya şəkil ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Qaranlıq overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Yalnız hover olunan məhsul üçün görünən mətn */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="
                      opacity-0
                      transform translate-y-4
                      group-hover:opacity-100
                      group-hover:translate-y-0
                      transition-all duration-300
                      bg-[#fe9034]
                      text-white
                      font-medium
                      py-2
                      px-6
                      rounded-full
                    "
                  >
                    Kolleksiyani Gor
                  </span>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev və Next navigasiya düymələri */}
        <button
          ref={prevButtonRef}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#fe9034] p-3 rounded-full shadow-lg transition-all duration-300 text-[#fe9034] hover:bg-[#fe9034] hover:text-white"
        >
          <ChevronLeft className="w-6 h-6 text-current" />
        </button>
        <button
          ref={nextButtonRef}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#fe9034] p-3 rounded-full shadow-lg transition-all duration-300 text-[#fe9034] hover:bg-[#fe9034] hover:text-white"
        >
          <ChevronRight className="w-6 h-6 text-current" />
        </button>
      </div>
    </section>
  );
};

export default Mix;
