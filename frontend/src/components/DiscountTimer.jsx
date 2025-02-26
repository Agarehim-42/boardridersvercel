import React, { useEffect, useState } from "react";

const DiscountTimer = () => {
  // Endirim üçün sabit tarix (ilk dəfə başladıqda yadda saxlanır)
  const getStoredTargetDate = () => {
    const storedDate = localStorage.getItem("discountTargetDate");
    if (storedDate) {
      return parseInt(storedDate, 10); // Stringi sayıya çevir
    }

    // Əgər tarix yoxdursa, 1 ay sonrakı tarixi yaradıb yadda saxla
    const now = new Date();
    now.setMonth(now.getMonth() + 1);
    const newTargetTime = now.getTime();
    localStorage.setItem("discountTargetDate", newTargetTime);
    return newTargetTime;
  };

  const [targetTime] = useState(getStoredTargetDate());
  const [timeLeft, setTimeLeft] = useState(targetTime - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetTime - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  // Gün, saat, dəqiqə, saniyə hesabla
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Vaxt bitəndə endirim bölməsini gizlət və localStorage təmizlə
  if (timeLeft <= 0) {
    localStorage.removeItem("discountTargetDate");
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10 px-4 sm:px-6 md:px-10 rounded-lg shadow-lg w-full max-w-3xl mx-auto my-10">
      {/* Endirim Başlıq */}
      <div className="flex flex-col items-center text-center">
        {/* Responsiv font ölçüləri */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 animate-pulse">
          ⚡ 60% Endirim! ⚡
        </h2>
        <p className="text-base sm:text-lg md:text-xl font-medium mb-6">
          Bu fürsət yalnız məhdud müddət üçündür!
        </p>

        {/* Geri sayım timeri (grid layout) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/20 rounded-lg flex flex-col items-center justify-center shadow-md py-4">
            <span className="text-2xl sm:text-3xl font-bold">{days}</span>
            <span className="text-xs sm:text-sm uppercase">Gün</span>
          </div>
          <div className="bg-white/20 rounded-lg flex flex-col items-center justify-center shadow-md py-4">
            <span className="text-2xl sm:text-3xl font-bold">{hours}</span>
            <span className="text-xs sm:text-sm uppercase">Saat</span>
          </div>
          <div className="bg-white/20 rounded-lg flex flex-col items-center justify-center shadow-md py-4">
            <span className="text-2xl sm:text-3xl font-bold">{minutes}</span>
            <span className="text-xs sm:text-sm uppercase">Dəq</span>
          </div>
          <div className="bg-white/20 rounded-lg flex flex-col items-center justify-center shadow-md py-4">
            <span className="text-2xl sm:text-3xl font-bold">{seconds}</span>
            <span className="text-xs sm:text-sm uppercase">San</span>
          </div>
        </div>

        {/* Alış-verişə keçid düyməsi */}
        <a
          href="/shop"
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold shadow-md hover:bg-blue-100 transition duration-300"
        >
          İndi Alış-Veriş Et
        </a>
      </div>
    </div>
  );
};

export default DiscountTimer;
