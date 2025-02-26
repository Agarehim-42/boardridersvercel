import React from 'react';

const Collection = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container mx-auto px-4">

        {/* Başlıq və alt başlıq */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#fe9034] uppercase">
            Günün Kolleksiyası
          </h2>
          <p className="text-gray-600 mt-2">
            Seçilmiş brendlər və mövsümün ən son trendləri
          </p>
        </div>

        {/* Birinci sətir: 2 şəkil (998px və yuxarıda yan-yana görünür) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* DC Shoes */}
          <div className="relative group overflow-hidden">
            <img
              className="w-full h-auto object-cover"
              src="src/assets/images/Collection/destler1.png"
              alt="DC Shoes"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            {/* Mətn və düymə */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">DC Shoes</h3>
              <p className="text-sm">İsti ayaqqabı</p>
              <button className="mt-2 px-4 py-2 bg-[#fe9034] text-white font-semibold rounded-md hover:bg-white hover:text-[#fe9034] transition">
                Baxmaq
              </button>
            </div>
          </div>

          {/* Quiksilver Mercury */}
          <div className="relative group overflow-hidden">
            <img
              className="w-full h-auto object-cover"
              src="src/assets/images/Collection/destler2.png"
              alt="Quiksilver Mercury"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            {/* Mətn və düymə */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">Quiksilver Mercury</h3>
              <p className="text-sm">Kolleksiyası</p>
              <button className="mt-2 px-4 py-2 bg-[#fe9034] text-white font-semibold rounded-md hover:bg-white hover:text-[#fe9034] transition">
                Baxmaq
              </button>
            </div>
          </div>
        </div>

        {/* İkinci sətir: 3 şəkil (998px və yuxarıda yan-yana görünür) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 py-3">
          {/* Tolstovkalar və Hoodilər */}
          <div className="relative group overflow-hidden">
            <img
              className="w-full h-auto object-cover"
              src="src/assets/images/Collection/destler3.png"
              alt="Tolstovkalar və Hoodilər"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            {/* Mətn və düymə */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">Tolstovkalar &amp; Hoodilər</h3>
              <button className="mt-2 px-4 py-2 bg-[#fe9034] text-white font-semibold rounded-md hover:bg-white hover:text-[#fe9034] transition">
                Seçmək
              </button>
            </div>
          </div>

          {/* Qış ayaqqabıları */}
          <div className="relative group overflow-hidden">
            <img
              className="w-full h-auto object-cover"
              src="src/assets/images/Collection/destler4.png"
              alt="Qış ayaqqabıları"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            {/* Mətn və düymə */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">Qış Ayaqqabıları</h3>
              <button className="mt-2 px-4 py-2 bg-[#fe9034] text-white font-semibold rounded-md hover:bg-white hover:text-[#fe9034] transition">
                Seçmək
              </button>
            </div>
          </div>

          {/* Kurtkalar */}
          <div className="relative group overflow-hidden">
            <img
              className="w-full h-auto object-cover"
              src="src/assets/images/Collection/destler5.png"
              alt="Kurtkalar"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            {/* Mətn və düymə */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">Kurtkalar</h3>
              <button className="mt-2 px-4 py-2 bg-[#fe9034] text-white font-semibold rounded-md hover:bg-white hover:text-[#fe9034] transition">
                Seçmək
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
