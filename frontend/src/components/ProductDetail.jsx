"use client";

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useAddToCartMutation,
  useAddToFavoritesMutation,
  // Rəy sistemi üçün əlavə edilən hook-lar
  useCreateOrUpdateReviewMutation,
  useGetProductReviewsQuery,
} from "../redux/api/productsApi";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import { ChatBubbleBottomCenterIcon, XMarkIcon } from "@heroicons/react/24/outline";

const ProductDetail = () => {
  const { id } = useParams();

  // Məhsul məlumatları
  const {
    data,
    isLoading,
    error,
  } = useGetProductDetailsQuery(id, { refetchOnMountOrArgChange: true });
  const product = data?.product;

  // Səbət və sevimlilərə əlavə etmək üçün mutation-lar
  const [addToCart] = useAddToCartMutation();
  const [addToFavorites] = useAddToFavoritesMutation();

  // Rəy sistemi üçün əlavə edilən mutation və query-lər
  const { data: reviewsData, isLoading: reviewsLoading, error: reviewsError } =
    useGetProductReviewsQuery(id, { refetchOnMountOrArgChange: true });
  const [createOrUpdateReview] = useCreateOrUpdateReviewMutation();

  // Cari seçilmiş əsas şəkil
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Məhsul ölçüsü seçimi
  const [selectedSize, setSelectedSize] = useState("");

  // Canlı çat modalı
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  // Rəy (rating) state-ləri
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  // Məhsulun şəkilləri
  const productImages = product?.images || [];
  const mainImageUrl =
    productImages[currentImageIndex]?.url ||
    "https://via.placeholder.com/600x600?text=No+Image";

  // Səbətə əlavə et
  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await addToCart({ productId: product._id, quantity: 1 }).unwrap();
      toast.success("Məhsul səbətə əlavə edildi!");
    } catch (error) {
      toast.error("Məhsulu səbətə əlavə edərkən xəta baş verdi!");
    }
  };

  // Sevimlilərə əlavə et
  const handleAddToFavorites = async () => {
    try {
      await addToFavorites(product._id).unwrap();
      toast.success("Məhsul sevimlilərə əlavə edildi!");
    } catch (err) {
      toast.error(
        err.data?.message || "Məhsulu sevimlilərə əlavə edərkən xəta baş verdi!"
      );
    }
  };

  // Çat mesajı göndər
  const handleSendChat = () => {
    if (chatMessage.trim() === "") {
      toast.error("Mesaj boş ola bilməz!");
      return;
    }
    toast.success("Mesaj göndərildi!");
    setChatMessage("");
    setIsChatOpen(false);
  };

  // Rəy formu göndərilməsi
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (reviewRating === 0) {
      toast.error("Zəhmət olmasa ulduzla rəy verin");
      return;
    }
    try {
      const response = await createOrUpdateReview({
        productId: product._id,
        rating: reviewRating,
        comment: reviewComment,
      }).unwrap();
      toast.success(response.message || "Rəy uğurla göndərildi");
    } catch (err) {
      toast.error(err.data?.message || "Rəy göndərilərkən xəta baş verdi");
    }
    setReviewRating(0);
    setReviewComment("");
  };

  // Yüklənmə və xəta vəziyyətləri
  if (isLoading) return <div>Yüklənir...</div>;
  if (error) return <div>Xəta baş verdi: {error.message}</div>;

  return (
    <section className="py-12 mt-24 bg-gray-50 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Şəkillər Bölməsi */}
          <div className="flex flex-col gap-4">
            {/* Əsas Şəkil */}
            <div
              className="
                border border-gray-200 
                rounded-lg 
                overflow-hidden 
                bg-white 
                flex items-center justify-center
                h-[400px] sm:h-[500px] md:h-[600px]
              "
            >
              <img
                src={mainImageUrl}
                alt={product?.name || "Məhsulun adı"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail-lar */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 border rounded-lg overflow-hidden flex-shrink-0 focus:outline-none transition-transform transform hover:scale-105 ${
                    currentImageIndex === index
                      ? "border-amber-500"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Məhsul Məlumatı Bölməsi */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name || "Məhsulun adı"}
            </h1>

            <div className="flex items-center gap-4">
              <p className="text-2xl font-bold text-amber-600">
                {product?.price || 0} ₼
              </p>
              <div className="flex items-center">
                <StarRatings
                  rating={product?.ratings || 0}
                  starRatedColor="#F59E0B"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="3px"
                />
                <span className="ml-2 text-sm text-amber-600">
                  ({product?.ratings || 0})
                </span>
              </div>
            </div>

            {/* Məhsul Ölçüsü Seçimi */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Ölçü Seçin</h2>
              <div className="flex gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md transition-colors ${
                      selectedSize === size
                        ? "bg-amber-500 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600"
              >
                Səbətə əlavə et
              </button>
              <button
                onClick={handleAddToFavorites}
                className="flex-1 px-6 py-3 border border-amber-500 text-amber-600 font-semibold rounded-lg hover:bg-amber-50"
              >
                Sevimlilərə əlavə et
              </button>
            </div>

            <div>
              <button
                onClick={() => setIsChatOpen(true)}
                className="flex items-center gap-2 px-6 py-3 border border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50"
              >
                <ChatBubbleBottomCenterIcon className="h-5 w-5" />
                Canlı dəstək
              </button>
            </div>

            <ul className="space-y-2 text-sm text-gray-600 mt-6 list-disc list-inside">
              <li>Məhsul mövcuddur (çatdırılma 2-3 gün)</li>
              <li>3000₼-dan yuxarı sifarişlərə pulsuz çatdırılma</li>
              <li>Kartla ödəniş (Visa, MasterCard, Mir)</li>
            </ul>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Məhsul Detalları</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
                <div>
                  <span className="font-semibold">Brend: </span>
                  {product?.name || "Məlumat yoxdur"}
                </div>
                <div>
                  <span className="font-semibold">Rəng: </span>
                  {product?.color || "Məlumat yoxdur"}
                </div>
                <div>
                  <span className="font-semibold">Material: </span>
                  {product?.material || "Məlumat yoxdur"}
                </div>
                <div>
                  <span className="font-semibold">Model: </span>
                  {product?.model || "Məlumat yoxdur"}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Açıqlama</h2>
              <p className="text-gray-700 leading-relaxed">
                {product?.description || "Burada məhsulun açıqlaması olacaq..."}
              </p>
            </div>

            {/* Rəy bölməsi - Rəy əlavə etmə formu */}
            <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Rəyinizi Yazın</h2>
              <form onSubmit={handleReviewSubmit}>
                <div className="flex items-center">
                  <StarRatings
                    rating={reviewRating}
                    changeRating={setReviewRating}
                    numberOfStars={5}
                    starRatedColor="#F59E0B"
                    starHoverColor="#F59E0B"
                    starDimension="24px"
                    starSpacing="4px"
                    isSelectable={true}
                  />
                  <span className="ml-3 text-sm text-gray-600">
                    {reviewRating} / 5
                  </span>
                </div>
                <div className="mt-4">
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Rəyinizi buraya yazın..."
                    className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    rows={4}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all duration-300"
                >
                  Rəyi Göndər
                </button>
              </form>
            </div>

            {/* Məhsulun rəyləri */}
            <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Məhsul Rəyləri</h2>
              {reviewsLoading ? (
                <p>Rəylər yüklənir...</p>
              ) : reviewsError ? (
                <p className="text-red-500">
                  Rəylər yüklənərkən xəta baş verdi.
                </p>
              ) : reviewsData && reviewsData.reviews && reviewsData.reviews.length > 0 ? (
                reviewsData.reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center">
                      <StarRatings
                        rating={review.rating}
                        starRatedColor="#F59E0B"
                        numberOfStars={5}
                        starDimension="16px"
                        starSpacing="2px"
                      />
                      <span className="ml-2 text-gray-800">
                        {review.rating} / 5
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>Bu məhsul üçün hələ rəy yoxdur.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Canlı Dəstək (Chat) Modalı */}
      {isChatOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h3 className="text-xl font-bold mb-4">Canlı Dəstək</h3>
            <textarea
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Mesajınızı yazın..."
              className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
            <button
              onClick={handleSendChat}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Göndər
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
