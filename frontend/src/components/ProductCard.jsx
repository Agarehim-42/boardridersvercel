import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductCard = ({ mehsul }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 100ms sonra skeleton gizlənəcək
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  if (isLoading) { // Burada `loading` yox, `isLoading` istifadə et
    return (
      <div className="w-full flex flex-col justify-between max-w-[998px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
        <Skeleton height={200} width="100%" />
        <Skeleton height={35} width="120px" className="mt-5" />
        <div className='kartinKonturu'>
          <Skeleton height={35} width="120px" className="mt-[30px]" />
          <Skeleton height={35} width="120px" className="mt-[30px]" />
        </div>
      </div>
    );
  }

  if (!mehsul) {
    return null;
  }

  return (
    <Link to={`/product/${mehsul?._id}`}>
      <div className="w-full flex flex-col justify-between max-w-[998px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {isLoading ? (
          <Skeleton height={200} />
        ) : (
          <img
            className="p-8 rounded-t-lg w-100 mx-auto h-[200px]"
            src={mehsul.images && mehsul.images[0]?.url ? mehsul.images[0].url : ""}
            alt="product image"
          />
        )}
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {isLoading ? <Skeleton width={150} /> : mehsul.name}
          </h5>
          <div className="flex items-center mt-2.5 mb-5">
            {/* Burada rating olacaq */}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLoading ? <Skeleton width={50} /> : "$599"}
            </span>
            <a
              href="#"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? <Skeleton width={80} height={30} /> : "Add to cart"}
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
