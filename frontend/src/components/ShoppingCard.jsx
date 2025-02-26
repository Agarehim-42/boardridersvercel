import React, { useState } from "react";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
} from "../redux/api/productsApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SebetCart = () => {
  const { data: cartData, isLoading, error } = useGetCartQuery();
  console.log("Cart Data:", cartData);

  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateQuantity] = useUpdateCartQuantityMutation();

  // Endirim kodu üçün state
  const [discountCode, setDiscountCode] = useState("");

  // Səbətdəki bütün məhsulların cəmi (subtotal)
  const calculateTotal = () => {
    if (!cartData?.cart) return 0;
    return cartData.cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const subtotal = calculateTotal();
  const tax = Math.round(subtotal * 0.02); // Vergi 2%
  const shipping = 29; // Sabit göndəriş haqqı
  const total = subtotal + tax + shipping;

  const handleDiscountApply = () => {
    // Endirim məntiqinizi bura əlavə edə bilərsiniz
    toast.info(`${discountCode} endirim kodu tətbiq olundu!`);
  };

  const handleQuantityChange = async (productId, currentQuantity, stock, change) => {
    const newQuantity = currentQuantity + change;

    if (newQuantity < 1) {
      toast.error("Məhsul sayı 1-dən az ola bilməz");
      return;
    }

    if (newQuantity > stock) {
      toast.error("Kifayət qədər stok yoxdur");
      return;
    }

    try {
      await updateQuantity({ productId, quantity: newQuantity }).unwrap();
      toast.success("Məhsul sayı yeniləndi");
    } catch (error) {
      toast.error("Miqdar yenilənərkən xəta baş verdi");
    }
  };

  const handleRemoveFromCart = async (productId) => {
    const confirmed = window.confirm(
      "Bu məhsulu səbətdən silmək istədiyinizə əminsiniz?"
    );
    if (!confirmed) return;

    try {
      await removeFromCart(productId).unwrap();
      toast.success("Məhsul səbətdən silindi");
    } catch (error) {
      toast.error("Məhsul silinərkən xəta baş verdi");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="animate-pulse">
          <div className="h-24 w-24 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full shadow-glow animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-8">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border border-white/10 transform hover:scale-[1.02] transition-all duration-500">
          <div className="mb-8 animate-float">
            <svg
              className="w-24 h-24 mx-auto text-pink-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 mb-6 font-playfair">
            Favori Siyahınız Boşdur
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Hələ heç bir məhsul əlavə etməmisiniz.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-600 text-white px-8 py-4 rounded-xl hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold tracking-wide"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Alış-verişə Başla
          </Link>
        </div>
      </div>
    );
  }

  if (!cartData?.cart?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-8">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border border-white/10 transform hover:scale-[1.02] transition-all duration-500">
          <div className="mb-8 animate-float">
            <svg
              className="w-24 h-24 mx-auto text-pink-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 mb-6 font-playfair">
            Favori Siyahınız Boşdur
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Hələ heç bir məhsul əlavə etməmisiniz.
          </p>
          <Link
            to="/clothes"
            className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-600 text-white px-8 py-4 rounded-xl hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold tracking-wide"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Alış-verişə Başla
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shopping Cart */}
        <div>
          <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
          <div className="space-y-6">
            {cartData.cart.map((item) => (
              <div
                key={item.product._id}
                className="flex gap-4 p-4 border rounded-lg"
              >
                <div className="w-24 h-24">
                  <Link to={`/product/${item.product._id}`}>
                    <img
                      src={
                        item.product.images && item.product.images.length > 0
                          ? item.product.images[0]?.url
                          : "/placeholder.svg"
                      }
                      alt={item.product.name}
                      className="object-contain w-full h-full"
                    />
                  </Link>
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium">{item.product.name}</h3>
                  {item.product.sku && (
                    <p className="text-sm text-gray-500">
                      {item.product.sku}
                    </p>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product._id,
                            item.quantity,
                            item.product.stock,
                            -1
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product._id,
                            item.quantity,
                            item.product.stock,
                            1
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-medium">
                      {(item.product.price * item.quantity).toFixed(2)}₼
                    </span>
                    <button
                      onClick={() => handleRemoveFromCart(item.product._id)}
                      className="ml-auto text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="summary">
          <div className="border rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  Discount code / Promo code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded"
                  />
                  <button
                    onClick={handleDiscountApply}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)}₼</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (2%)</span>
                <span>{tax.toFixed(2)}₼</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping.toFixed(2)}₼</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total</span>
                <span>{total.toFixed(2)}₼</span>
              </div>
            </div>

            <button className="w-full py-3 bg-black text-white rounded hover:bg-gray-800">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SebetCart;
