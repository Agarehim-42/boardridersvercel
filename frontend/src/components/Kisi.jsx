import React, { useEffect } from "react";
import ProductCard from "./ProductCard"; // Bu komponentin məhsul məlumatlarını göstərməsi lazımdır.
import { useGetProductsQuery } from "../redux/api/productsApi";
import { toast } from "react-hot-toast";

const Kisi = () => {
  const { data, error, isError } = useGetProductsQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Xəta baş verdi.");
    }
  }, [isError, error]);

  // Yalnız "Men" kateqoriyasına aid məhsulları filterləyirik
  const menProducts = data?.products?.filter((product) => product.category === "Men");

  return (
    <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {menProducts && menProducts.length > 0 ? (
        menProducts.map((product) => (
          <ProductCard key={product._id} mehsul={product} />
        ))
      ) : (
        <div className="text-center text-xl text-gray-600 col-span-full">
          Məhsul tapılmadı.
        </div>
      )}
    </div>
  );
};

export default Kisi;
