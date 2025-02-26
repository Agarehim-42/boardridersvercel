import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/userSlice";
import { useGetCartQuery, useGetFavoritesQuery } from "../redux/api/productsApi";

const Navbar1 = () => {
  const { isAuthenticated, user } = useSelector((state) => state.userSlice);
  console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
    }
    setShowSearch(false);
  };

  const { data: cartData, isLoading: cartLoading, error: cartError } = useGetCartQuery();

  const getCartItemCount = () => {
    if (cartError || cartLoading || !cartData?.cart) {
      return 0;
    }
    return cartData.cart.length;
  };

  const { data: favoriteData, isLoading: favoriteLoading, error: favoriteError } = useGetFavoritesQuery();

  const getFavoriteItemCount = () => {
    if (favoriteError || favoriteLoading || !favoriteData?.favorites) {
      return 0;
    }
    return favoriteData.favorites.length;
  };

  return (
    <nav className="sticky top-0 bg-gradient-to-r shadow-2xl border-b-2 bg-white z-50">
      {/* Fullscreen Search Panel */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center backdrop-blur-[10px]">
          <div className="w-full max-w-3xl px-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search haute couture, jewelry, watches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-xl font-light text-white bg-transparent border-2 border-gray-600 rounded-full focus:outline-none focus:border-yellow-400 placeholder-gray-400 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
          <button
            onClick={() => setShowSearch(false)}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              {isAuthenticated && user?.name ? (
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full text-2xl text-white font-semibold shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <img
                  className="h-12 w-auto"
                  src="https://res.cloudinary.com/dwdvr0oxa/image/upload/v1737639267/logo_wkss52.png"
                  alt="Logo"
                />
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black hover:text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-10">
              <Link
                to="/"
                className="text-black hover:text-gray-700 px-4 py-2 rounded-md text-lg font-semibold transition-all duration-300 hover:bg-gray-100"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-black hover:text-gray-700 px-4 py-2 rounded-md text-lg font-semibold transition-all duration-300 hover:bg-gray-100"
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="text-black hover:text-gray-700 px-4 py-2 rounded-md text-lg font-semibold transition-all duration-300 hover:bg-gray-100"
              >
                About
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-black hover:text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <Link
              to="/cart"
              className="relative p-2 text-black hover:text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 004 0z"
                />
              </svg>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {/* Favorites */}
            <Link
              to="/favori"
              className="relative p-2 text-black hover:text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {getFavoriteItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getFavoriteItemCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-black hover:text-gray-700 space-x-2"
                >
                  {user?.avatarUrl ? (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user?.avatarUrl}
                      alt="User Avatar"
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full text-black font-semibold">
                      {user?.user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-md py-2 z-50 border border-gray-200">
                    {user && (
                      <p className="text-black text-center">{user?.user?.name}</p>
                    )}

                    {user?.user?.role === "admin" && (
                      <>
                        <Link to="/admin/products" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-center">Admin Products</Link>
                        <Link to="/admin/product" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-center">Add Product</Link>
                        <button
          onClick={handleLogout}
          className="w-full text-center px-4 py-2 text-red-600 hover:bg-gray-100"
        >
          Logout
        </button>
                      </>
                      
                    )}

                    <button
                      onClick={handleLogout}
                      className="block w-full text-black hover:bg-gray-100 px-4 py-2 text-sm"
                    >
                      <i class="fa-solid fa-right-from-bracket text-red-700"></i>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-black hover:text-gray-700 font-semibold text-lg"
              >
                Login
              </Link>
            )}

          </div>
        </div>
      </div>

      {/* Mobile Menu (Hamburger) */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-white text-black border-t border-gray-200">
          <Link to="/" className="text-lg">Home</Link>
          <Link to="/shop" className="text-lg">Shop</Link>
          <Link to="/about" className="text-lg">About</Link>
          <Link to="/cart" className="text-lg">Cart</Link>
          <Link to="/favori" className="text-lg">Favorites</Link>
          <div className="flex flex-col items-center space-y-2">
            {isAuthenticated ? (
              <>
                <button onClick={handleLogout} className="w-full text-center text-lg text-red-500">Log Out</button>
              </>
            ) : (
              <Link to="/login" className="w-full text-center text-lg">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar1;