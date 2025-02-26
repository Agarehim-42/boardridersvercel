import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../redux/api/productsApi";
import { toast } from "react-hot-toast";

const Products = () => {
  // Destructure isLoading along with other properties from RTK Query.
  const { data, error, isError, isLoading } = useGetProductsQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  // If loading, show a skeleton for the products.
  if (isLoading) {
    return (
      <div className="container my-[200px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#fe9034]">
          Günün Məhsulları
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-64 rounded border-2 border-[#fe9034] bg-[#fe9034] bg-opacity-20 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container my-[200px] mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#fe9034]">
        Günün Məhsulları
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {data?.products?.map((product) => (
          <ProductCard key={product._id} mehsul={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
