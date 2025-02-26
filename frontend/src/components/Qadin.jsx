import React, { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard"; 
import { useFilterProductsQuery } from "../redux/api/productsApi";
import { toast } from "react-hot-toast";

/*---------------------- Button Component ----------------------*/
const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-700 hover:bg-gray-100",
  };
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

/*---------------------- Slider Component ----------------------*/
const Slider = ({ min, max, step = 1, value: controlledValue, defaultValue = min, onChange }) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full h-6">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full transform -translate-y-1/2">
        <div
          className="absolute top-0 left-0 h-full bg-black rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div
        className="absolute top-1/2 w-4 h-4 bg-black rounded-full shadow transform -translate-y-1/2"
        style={{ left: `calc(${percentage}% - 8px)` }}
      />
    </div>
  );
};

/*---------------------- Main EcommerceApp Component ----------------------*/
const Qadin = () => {
  // Qiymət filter state‑ləri
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1299);
  // Seçilmiş ölçü üçün state
  const [selectedSize, setSelectedSize] = useState("");
  // Filter panelinin açılıb-bağlanması (mobil üçün)
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Backend‑də filter üçün "Women" kateqoriyası və qiymət aralığı göndərilir
  const { data, error, isError } = useFilterProductsQuery({
    category: "Women",
    price: `${priceMin}-${priceMax}`,
  });

  useEffect(() => {
    if (isError) {
      console.error(error);
      toast.error(error?.data?.message || "Bir xəta baş verdi!");
    }
  }, [isError, error]);

  // Dinamik ölçü siyahısını backend‑dən gələn məhsullardan hesablamaq
  const sizeObj = data?.products?.reduce((acc, product) => {
    const size = product.size;
    if (size) {
      acc[size] = (acc[size] || 0) + 1;
    }
    return acc;
  }, {});
  const dynamicSizes = sizeObj
    ? Object.entries(sizeObj).map(([size, count]) => ({ size, count }))
    : [];

  // Seçilmiş ölçü varsa, əlavə frontend filter tətbiq olunur
  const filteredProducts = selectedSize
    ? data?.products?.filter((product) => product.size === selectedSize)
    : data?.products;

  return (
    <div className="container mt-20 mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="#" className="text-gray-500 hover:text-gray-800">
              Home
            </a>
          </li>
          <li className="text-gray-500">/</li>
          <li>
            <a href="#" className="text-gray-500 hover:text-gray-800">
              Catalog
            </a>
          </li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-800">Women</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Panel (həm masaüstü, həm mobil üçün) */}
        <div
          className={`bg-white p-4 rounded-md shadow ${
            isFilterOpen ? "block" : "hidden"
          } lg:block w-full lg:w-64`}
        >
          <h3 className="font-semibold text-lg mb-4 border-b pb-2">Filtrlər</h3>
          {/* Ölçü Filter */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Ölçü</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Bütün Ölçülər</option>
              {dynamicSizes.map((item) => (
                <option key={item.size} value={item.size}>
                  {item.size} ({item.count})
                </option>
              ))}
            </select>
          </div>
          {/* Qiymət Filter */}
          <div>
            <label className="block mb-2 font-medium">Qiymət</label>
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={(e) => setPriceMin(Number(e.target.value))}
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <Slider min={0} max={2000} value={priceMax} onChange={setPriceMax} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobil Filter Toggle */}
          <div className="lg:hidden mb-4 flex justify-end">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              {isFilterOpen ? "Filtrləri Gizlət" : "Filtrləri Göstər"}
            </Button>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-bold">Məhsullar</h2>
            <p className="text-gray-600">
              Seçilmiş məhsullar: {filteredProducts?.length || 0}
            </p>
          </div>

          {/* Məhsul Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts?.map((product) => (
              <div
                key={product._id}
                className="
                  relative bg-white border border-gray-200 rounded-md 
                  overflow-hidden hover:shadow-lg hover:scale-105 transition-all
                "
              >
                {/* 40% Endirim Etiketi */}
                <span className="absolute top-2 left-2 bg-[#fe9034] text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-10">
                  40% Endirim
                </span>

                {/* Product Card İçeriyi */}
                <ProductCard mehsul={product} />
              </div>
            ))}
          </div>
          {/* Pagination və s. (ehtiyac varsa) */}
        </div>
      </div>
    </div>
  );
};

export default Qadin;
