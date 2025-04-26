import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../redux/api/authApi";
import toast from "react-hot-toast";

const Login = () => {
  // State-lər
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false); // Yeni state: "Şifrəni unuttum" üçün

  const navigate = useNavigate();

  // Redux mutation hook
  const [login, { isLoading, error }] = useLoginMutation();

  // Redux state-dən məlumat əldə etmək
  const { isAuthenticated } = useSelector((state) => state.userSlice);

  // Əgər istifadəçi artıq daxil olubsa, başqa yerə yönləndir
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Form submit funksiyası
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // API çağırışı - unwrap() istifadə edərək cavabı əldə edirik
      await login({ email, password }).unwrap();
      toast.success("Login successful!");
      navigate("/"); // Login uğurlu olduqda ana səhifəyə yönləndirin
    } catch (err) {
      // Error handling
      handleError(err);
    }
  };

  // Error handler funksiyası
  const handleError = (err) => {
    console.error("Full error: ", err);

    if (err?.status === 404) {
      toast.error("API endpoint not found (404). Please check your API URL.");
    } else if (err?.status === 401) {
      setForgotPassword(true); // Şifrə səhv olduqda forgotPassword state-ni true et
      toast.error("Invalid credentials, please try again.");
    } else {
      const errorMessage = err?.data?.message || err?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto my-24">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto">
          {/* Üst hissədə logo/marka */}
          <div className="flex items-center space-x-5 justify-center mb-4">
            <h1 className="text-center text-3xl font-bold text-[#fe9034]">Welcome to Boardriders</h1>
          </div>

          {/* Form başlığı */}
          <h1 className="text-center text-xl font-semibold text-gray-900 mt-4">
            Sign in to your account
          </h1>

          <form className="mt-5" onSubmit={handleSubmit}>
            {/* E-mail sahəsi */}
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="email">
                Your email
              </label>
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#fe9034]"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="name@company.com"
                required
              />
            </div>
            {/* Şifrə sahəsi */}
            <div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">
                Your password
              </label>
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#fe9034]"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="password"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Login düyməsi */}
            <div className="mt-5">
              <button
                type="submit"
                disabled={isLoading}
                className="py-2 px-4 bg-[#fe9034] hover:bg-[#e6872e] focus:ring-[#fe9034] focus:ring-offset-[#fe9034] text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                {isLoading ? "Logging in..." : "Login to your account"}
              </button>
            </div>

            {/* Şifrəni unutduqdan sonra link */}
            {forgotPassword && (
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
                <span>Forgot your password? </span>
                <Link
                  to="/forgot-password"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Reset it here
                </Link>
              </div>
            )}

            {/* Kayıt olma linki */}
            <div className="text-sm font-medium py-5 text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <Link
                to="/register"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
