import React, { useState } from 'react';

// AccordionItem komponenti
const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 p">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 focus:outline-none flex justify-between items-center"
      >
        <span className="font-medium text-lg">{title}</span>
        <span className="text-2xl">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="p-4 text-gray-700 border-t border-gray-100">
          {content}
        </div>
      )}
    </div>
  );
};

const About = () => {
  return (
    <>
    <div className="max-w-7xl mx-auto p-4 py-32">
      {/* 1. Bölmə: Giriş / Hero */}
      <section className="bg-white py-16 px-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center text-[#fe9034]">
          Boardriders Dünyasına Xoş Gəldiniz!
        </h1>
        <p className="text-lg text-gray-700 text-center">
          Ən yeni və keyfiyyətli paltarlar, ayaqqabılar və aksessuarlar burada!
        </p>
      </section>

      {/* 2. Bölmə: Missiya və Vizyon */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-[#fe9034]">Missiyamız və Vizyonumuz</h2>
        <p className="text-gray-700 leading-relaxed">
          Məqsədimiz, müştərilərimizə ən keyfiyyətli və rahat paltarları təqdim edərək, onların tərzini mükəmməlləşdirməkdir. Hər kəsin zövqünə uyğun modelləri əlverişli qiymətə əldə etməsi bizim prioritetimizdir.
        </p>
      </section>

      {/* 3. Bölmə: Niyə Bizim Mağazamızı Seçməlisiniz? */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-[#fe9034]">
          Niyə Biz?
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Yüksək keyfiyyət və rahatlıq</li>
          <li>Ən son moda tələblərinə uyğun dizaynlar</li>
          <li>Müştəri məmnuniyyətinə önəmli xidmət</li>
          <li>Tez və təhlükəsiz çatdırılma</li>
          <li>Əlverişli qiymətlər və mövcud kampaniyalar</li>
        </ul>
      </section>

      {/* 4. Bölmə: Zəmanət və Təhlükəsizlik */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-[#fe9034]">
          Zəmanət və Təhlükəsizlik
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Bütün məhsullarımız üçün zəmanət verilir. Məhsulun keyfiyyətinə güvənərək, müştərilərimizə ən yüksək xidmətləri təqdim edirik. SSL sertifikatlı saytımızla alış-veriş prosesiniz tam təhlükəsizdir.
        </p>
      </section>

      {/* 5. Bölmə: Məhsullarımız */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-[#fe9034]">
          Məhsullarımız
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-2">Paltarlar</h3>
            <p className="text-gray-700">
              Ən yeni modellər və ən gözəl paltarlar.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-2">Ayaqqabılar</h3>
            <p className="text-gray-700">
              Rahat və şık ayaqqabılar.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-2">Aksessuarlar</h3>
            <p className="text-gray-700">
              Hər paltarınıza uyğun aksessuarlar.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-2">Çantalar</h3>
            <p className="text-gray-700">
              Fərqli stillərlə çantalar.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 md:col-span-3">
            <h3 className="text-2xl font-semibold mb-2">Digər Məhsullar</h3>
            <p className="text-gray-700">
              Moda dünyasında hər kəsə uyğun məhsullar.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Bölmə: Tez-tez Verilən Suallar (Accordion) */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-[#fe9034]">
          Tez-tez Verilən Suallar
        </h2>
        <div className="bg-white shadow rounded-lg">
          <AccordionItem
            title="Sifariş necə verilir?"
            content="Məhsulu seçdikdən sonra səbətə əlavə edib, ödəniş prosesini izləyərək sifarişinizi tamamlaya bilərsiniz."
          />
          <AccordionItem
            title="Məhsulların zəmanət müddəti nə qədərdir?"
            content="Bütün məhsullarımız üçün ən azı 12 ay zəmanət təmin edirik."
          />
          <AccordionItem
            title="Çatdırılma nə qədər sürətli həyata keçirilir?"
            content="Ölkə daxilində sifarişlər 24-48 saat ərzində çatdırılır, beynəlxalq sifarişlərdə isə əlavə vaxt tələb oluna bilər."
          />
          <AccordionItem
            title="Əlaqə məlumatlarım necə qorunur?"
            content="Müştəri məlumatlarınız məxfi saxlanılır və heç bir üçüncü tərəfə ötürülmür."
          />
        </div>
      </section>

      {/* 7. Bölmə: Əlaqə */}
      <section className="bg-white py-16 px-8 rounded-lg mb-8">
        <h2 className="text-3xl font-bold mb-4 text-[#fe9034] text-center">
          Bizimlə Əlaqə Saxlayın
        </h2>
        <p className="text-gray-700 text-center mb-4">
          Əlavə məlumat almaq və ya suallarınızı vermək üçün bizimlə əlaqə saxlayın.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="mailto:info@paltardunyasi.com"
            className="text-blue-600 hover:underline"
          >
            info@infoCall.com
          </a>
          <a
            href="tel:+994123456789"
            className="text-blue-600 hover:underline"
          >
            +994 12 345 67 89
          </a>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;
