import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetFavoritesQuery, useRemoveFromFavoritesMutation } from "../redux/api/productsApi";
import { productApi } from "../redux/api/productsApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// Lucide icon
import { Heart } from "lucide-react";

const FavoriteButton = () => {
  const dispatch = useDispatch();
  const {
    data: favoriteData,
    isLoading,
    refetch,
  } = useGetFavoritesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [removeFromFavorites] = useRemoveFromFavoritesMutation();
  const [localFavorites, setLocalFavorites] = useState([]);

  // Favorit siyahısı dəyişdikcə localFavorites yenilənir
  useEffect(() => {
    if (favoriteData?.favorites) {
      setLocalFavorites(favoriteData.favorites);
    } else {
      setLocalFavorites([]);
    }
  }, [favoriteData]);

  // Favoritdən silmə əməliyyatı
  const handleRemoveFromFavorites = async (productId) => {
    try {
      await removeFromFavorites(productId).unwrap();
      setLocalFavorites((prev) => prev.filter((item) => item._id !== productId));
      toast.success("Məhsul favorilərdən silindi");

      // Cache-in yenilənməsi
      dispatch(productApi.util.invalidateTags(["Favorites"]));

      // Yenidən favoritləri fetch etmək
      await refetch();
    } catch (error) {
      toast.error("Məhsul silinərkən xəta baş verdi");
    }
  };

  // 1) Yüklənmə vəziyyəti
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#fe9034] to-[#f8b686]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mb-4"></div>
        <p className="text-white font-semibold text-xl">Yüklənir...</p>
      </div>
    );
  }

  // 2) Boş siyahı
  if (!localFavorites.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fe9034] to-[#f8b686] text-white py-12 px-4">
        <div className="text-center space-y-6 max-w-md">
          {/* Böyük Heart ikonu */}
          <Heart className="mx-auto w-32 h-32 text-white/70 mb-4" />

          <h2 className="text-3xl md:text-4xl font-extrabold">
            Favorilər Siyahınız Boşdur
          </h2>
          <p className="text-lg md:text-xl text-white/90">
            Burada sevdiyiniz məhsulları tapa bilərsiniz.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#fe9034] text-base font-semibold rounded-full border-2 border-white hover:border-[#fe9034] hover:bg-[#fe9034] hover:text-white transition-all duration-300"
          >
            Alış-verişə Başla
          </Link>
        </div>
      </div>
    );
  }

  // 3) Favoritlər siyahısı dolu olduqda
  return (
    <section className="min-h-screen mt-20 bg-gradient-to-b from-white to-[#ffe8d9] py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Başlıq */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#333] tracking-tight">
            Favori Məhsullarım
            <span className="ml-2 text-xl text-gray-600">
              ({localFavorites.length} məhsul)
            </span>
          </h2>
          <Link
            to="/"
            className="mt-4 md:mt-0 text-[#fe9034] hover:text-[#cc7220] font-medium flex items-center transform transition-all duration-300 hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.6}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Alış-verişə Davam Et
          </Link>
        </div>

        {/* Məhsul Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {localFavorites.map((product) => (
            <div
              key={product._id}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Şəkil və Silmə düyməsi */}
              <div className="relative overflow-hidden">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.images?.[0]?.url || "/default-product.jpg"}
                    alt={product.name || "Məhsul Şəkli"}
                    className="w-full h-80 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "/default-product.jpg";
                    }}
                  />
                </Link>
                {/* Favoritdən Silmə Düyməsi */}
                <button
                  onClick={() => handleRemoveFromFavorites(product._id)}
                  className="absolute top-4 right-4 p-3 bg-[#fe9034] text-white rounded-full shadow-lg hover:scale-110 hover:bg-[#ea7d2b] transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 13h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>

                {/* Stok Azaldıqda Bildiriş */}
                {product.stock < 5 && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full text-xs font-semibold shadow-md">
                    Son {product.stock} ədəd
                  </div>
                )}
              </div>

              {/* Məhsul Məlumatı */}
              <div className="p-6 bg-gradient-to-b from-white to-[#fff9f5] rounded-b-3xl">
                <Link to={`/product/${product._id}`}>
                  <h3 className="text-xl font-semibold text-[#333] mb-3 line-clamp-2 group-hover:text-[#fe9034] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-[#fe9034]">
                      {product.price.toFixed(2)} ₼
                    </p>
                    {product.oldPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        {product.oldPrice.toFixed(2)} ₼
                      </p>
                    )}
                  </div>
                  <Link
                    to={`/product/${product._id}`}
                    className="px-4 py-2 bg-[#fe9034] text-white rounded-full font-medium hover:bg-white hover:text-[#fe9034] border-2 border-[#fe9034] transition-all duration-300"
                  >
                    Ətraflı
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FavoriteButton;
