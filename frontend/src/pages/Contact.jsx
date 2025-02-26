import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const fromElementi = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_i2aoln8",
        "template_5ydt9ts",
        fromElementi.current,
        { publicKey: "x5HEkmKZNmgk7_3e9" }
      )
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("Message sent successfully");
          fromElementi.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Mesaj göndərilmədi");
        }
      );
  };

  return (
    <section className="min-h-screen mt-20 bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Başlıq və Alt Başlıq */}
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#fe9034]">
            Bizimlə Əlaqə Saxlayın
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Suallarınız və təklifləriniz üçün bizimlə əlaqə saxlayın. Sizinlə
            əməkdaşlıq etməkdən məmnun olarıq.
          </p>
        </div>

        {/* Konteyner: 2 Sütun (Kontakt Məlumatları + Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-[#fe9034]/5 border border-[#fe9034]/20 p-8 rounded-xl shadow-lg">
          {/* Əlaqə Məlumatları */}
          <div className="lg:col-span-1 bg-white rounded-lg p-6 shadow-sm border border-[#fe9034]/20 space-y-8">
            <h3 className="text-2xl font-semibold text-[#fe9034]">
              Əlaqə Məlumatları
            </h3>

            {/* Telefon */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-[#fe9034]/10 rounded-full">
                <svg
                  className="w-6 h-6 text-[#fe9034]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Telefon</p>
                <p className="text-gray-500">+994 12 345 67 89</p>
              </div>
            </div>

            {/* E-poçt */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-[#fe9034]/10 rounded-full">
                <svg
                  className="w-6 h-6 text-[#fe9034]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">E-poçt</p>
                <p className="text-gray-500">info@example.com</p>
              </div>
            </div>

            {/* Ünvan */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-[#fe9034]/10 rounded-full">
                <svg
                  className="w-6 h-6 text-[#fe9034]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Ünvan</p>
                <p className="text-gray-500">Bakı, Azərbaycan</p>
              </div>
            </div>

            {/* Sosial Şəbəkələr */}
            <div className="pt-4 border-t border-[#fe9034]/20">
              <h4 className="text-lg font-semibold text-[#fe9034] mb-3">
                Sosial Şəbəkələr
              </h4>
              <div className="flex space-x-3">
                <button className="p-2 bg-[#fe9034]/10 hover:bg-[#fe9034]/20 rounded-full transition">
                  <svg
                    className="w-5 h-5 text-[#fe9034]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775..."></path>
                  </svg>
                </button>
                {/* Başqa sosial şəbəkə iconları... */}
              </div>
            </div>
          </div>

          {/* Form Hissəsi */}
          <form
            className="lg:col-span-2 space-y-6 bg-white rounded-lg p-6 border border-[#fe9034]/20 shadow-sm"
            onSubmit={sendEmail}
            ref={fromElementi}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Adınız */}
              <div>
                <label className="block text-sm font-medium text-[#fe9034] mb-1">
                  Adınız
                </label>
                <input
                  name="name"
                  type="text"
                  className="w-full px-4 py-3 bg-white border border-[#fe9034]/30 rounded focus:ring-2 focus:ring-[#fe9034] focus:border-transparent placeholder-gray-400 text-[#333] transition-all"
                  placeholder="Name"
                />
              </div>
              {/* E-poçt */}
              <div>
                <label className="block text-sm font-medium text-[#fe9034] mb-1">
                  E-poçt
                </label>
                <input
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 bg-white border border-[#fe9034]/30 rounded focus:ring-2 focus:ring-[#fe9034] focus:border-transparent placeholder-gray-400 text-[#333] transition-all"
                  placeholder="example@mail.com"
                />
              </div>
              {/* Telefon */}
              <div>
                <label className="block text-sm font-medium text-[#fe9034] mb-1">
                  Telefon
                </label>
                <input
                  name="telephone"
                  type="tel"
                  className="w-full px-4 py-3 bg-white border border-[#fe9034]/30 rounded focus:ring-2 focus:ring-[#fe9034] focus:border-transparent placeholder-gray-400 text-[#333] transition-all"
                  placeholder="+994 00 000 00 00"
                />
              </div>
              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-[#fe9034] mb-1">
                  Mövzu
                </label>
                <input
                  name="subject"
                  type="text"
                  className="w-full px-4 py-3 bg-white border border-[#fe9034]/30 rounded focus:ring-2 focus:ring-[#fe9034] focus:border-transparent placeholder-gray-400 text-[#333] transition-all"
                  placeholder="Subject"
                />
              </div>
            </div>

            {/* Mesaj */}
            <div>
              <label className="block text-sm font-medium text-[#fe9034] mb-1">
                Mesajınız
              </label>
              <textarea
                name="message"
                rows="5"
                className="w-full px-4 py-3 bg-white border border-[#fe9034]/30 rounded focus:ring-2 focus:ring-[#fe9034] focus:border-transparent placeholder-gray-400 text-[#333] transition-all resize-none"
                placeholder="Mesajınızı ətraflı şəkildə yazın..."
              ></textarea>
            </div>

            {/* Göndər Düyməsi */}
            <div className="pt-4 border-t border-[#fe9034]/20">
              <button
                type="submit"
                className="
                  w-full flex items-center justify-center gap-2
                  bg-[#fe9034] text-white font-bold py-3 rounded 
                  hover:bg-white hover:text-[#fe9034] border-2 border-[#fe9034]
                  transition-all duration-300 transform hover:scale-105
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Mesajı Göndər
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
