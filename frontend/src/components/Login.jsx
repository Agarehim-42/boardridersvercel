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
    <div className="flex justify-center items-center h-[100vh]">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login to your account"}
          </button>

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

          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
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
  );
};

export default Login;
