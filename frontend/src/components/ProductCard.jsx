import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from "react-star-ratings";
import { Heart, Scale } from 'lucide-react';

const ProductCard = ({ mehsul }) => {
  // Məhsulun mövcudluğunu yoxla
  if (!mehsul) return null;

  // Default / Placeholder şəkil
  const defaultImageUrl = "https://via.placeholder.com/300";
  const imageUrl = mehsul.images && mehsul.images[0]
    ? mehsul.images[0].url
    : defaultImageUrl;

  // Rotasiya olunan mətn (ölçü, ad, satıcı)
  const textArray = [
    mehsul.name || "Ad yoxdur",
    mehsul.seller || "Satıcı yoxdur",
    mehsul.size || "Ölçü yoxdur",
   
  ];
  const [displayIndex, setDisplayIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let fadeTimeout;
    const interval = setInterval(() => {
      setFadeOut(true);
      fadeTimeout = setTimeout(() => {
        setDisplayIndex((prevIndex) => (prevIndex + 1) % textArray.length);
        setFadeOut(false);
      }, 500);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, [textArray.length]);

  // Manat → Dollar keçidi (nümunəvi məzənnə: 1 AZN = 0.59 USD)
  const [isManat, setIsManat] = useState(true);
  const exchangeRate = 0.59;
  const numericPrice = mehsul.price || 0;
  const displayedPrice = isManat
    ? numericPrice
    : (numericPrice * exchangeRate).toFixed(2);
  const currencySymbol = isManat ? "₼" : "$";

  return (
    <Link to={`/product/${mehsul._id}`} className="block">
      <div
        className="
          w-full max-w-xs sm:max-w-none mx-auto sm:mx-0
          p-2 sm:p-4 bg-white rounded-md shadow hover:shadow-lg
          transition-shadow duration-200 flex flex-col justify-between
        "
      >
        {/* Şəkil Konteyneri */}
        <div className="relative mb-2 sm:mb-3 aspect-square overflow-hidden rounded-md">
          <img
            src={imageUrl}
            alt={mehsul.name || "Məhsul"}
            className="
              w-full h-full object-contain
              transition-transform duration-200 hover:scale-105
            "
          />
          {/* Ölçü və Bəyən düymələri */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-200">
              <Scale className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-200">
              <Heart className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Rotasiya olunan mətn (fade effect) */}
        <h3
          className={`
            font-semibold text-sm sm:text-base mb-2 text-gray-800
            transition-opacity duration-500
            ${fadeOut ? 'opacity-0' : 'opacity-100'}
          `}
        >
          {textArray[displayIndex]}
        </h3>

        {/* Reytinq */}
        <div className="flex items-center gap-4 mb-2">
          <div className="flex">
            <StarRatings
              rating={mehsul.ratings || 0}
              starRatedColor="red"
              numberOfStars={5}
              starDimension="16px"
              starSpacing="2px"
            />
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {mehsul.ratings || "Reytinq yoxdur"}
          </span>
        </div>

        {/* Qiymət & Səbət düyməsi */}
        <div className="flex items-center justify-between">
          <div className="text-base sm:text-lg font-bold text-gray-900">
            {numericPrice === 0 ? (
              "Qiymət yoxdur"
            ) : (
              <span
                className="cursor-pointer transition-transform duration-300 hover:scale-110"
                onClick={(e) => {
                  e.preventDefault();
                  setIsManat(!isManat);
                }}
              >
                {displayedPrice} {currencySymbol}
              </span>
            )}
          </div>
          <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors duration-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
