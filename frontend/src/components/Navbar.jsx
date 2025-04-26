import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/userSlice";
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  Smartphone,
  Laptop,
  Camera,
  Headphones,
  Gamepad,
  Menu,
  X,
  Home,
  MessageCircle,
  Bell,
  Bookmark,
  FileText,
  List,
  ArrowLeft,
} from "lucide-react";
import {
  useGetCartQuery,
  useGetFavoritesQuery,
  useSearchProductsQuery,
} from "../redux/api/productsApi";

// Desktop üçün İstifadəçi Menyusu (admin linkləri daxil)
const UserMenu = ({ name, email, imageUrl, role, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#fe9034] focus:outline-none"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            width={40}
            height={40}
            className="h-full w-full object-cover rounded-full"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#fe9034] text-white rounded-full">
            {name && name.charAt(0).toUpperCase()}
          </div>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-12 w-[280px] rounded-lg bg-white py-3 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-4 pb-2">
            <p className="text-base font-medium text-[#333]">{name}</p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
          {/* Ümumi Menyu */}
          <div className="mt-2">
            <button className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-base text-[#333] transition-colors hover:bg-[#fe9034]/10">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                />
              </svg>
              Settings
            </button>
            <button className="w-full px-4 py-2.5 text-left text-base text-[#333] transition-colors hover:bg-[#fe9034]/10">
              Help
            </button>
            <button className="w-full px-4 py-2.5 text-left text-base text-[#333] transition-colors hover:bg-[#fe9034]/10">
              Suggest a feature
            </button>
          </div>
          {/* Yalnız adminlər üçün linklər */}
          {role === "admin" && (
            <div className="mt-2 border-t pt-2">
              <Link
                to="/admin/adminproducts"
                className="block px-4 py-2 text-[#333] hover:bg-[#fe9034]/10"
              >
                Admin Products
              </Link>
              <Link
                to="/admin/add-products"
                className="block px-4 py-2 text-[#333] hover:bg-[#fe9034]/10"
              >
                Add Product
              </Link>
              <Link
                to="/admin/edit-blogs/:id"
                className="block px-4 py-2 text-[#333] hover:bg-[#fe9034]/10"
              >
                Edit Blog
              </Link>
              <Link
                to="/admin/add-blog"
                className="block px-4 py-2 text-[#333] hover:bg-[#fe9034]/10"
              >
                Add Blogs
              </Link>
              <Link
                to="/admin/admin-blogs"
                className="block px-4 py-2 text-[#333] hover:bg-[#fe9034]/10"
              >
                Admin Blog
              </Link>
            </div>
          )}
          <div className="mt-2 border-t pt-2">
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-[#fe9034]/10"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Menü, kateqoriya və axtarış vəziyyətləri
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // RTK Query ilə dinamik axtarış
  const {
    data: searchResults,
    isLoading: searchLoading,
    isError: searchError,
  } = useSearchProductsQuery(
    { query: debouncedSearchQuery },
    { skip: debouncedSearchQuery.trim() === "" }
  );

  // Navbar-ın scroll ilə görünməsi
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Səbət və favorilər sorğuları
  const {
    data: cartData,
    isLoading: cartLoading,
    error: cartError,
  } = useGetCartQuery();
  const {
    data: favoriteData,
    isLoading: favoriteLoading,
    error: favoriteError,
  } = useGetFavoritesQuery();

  const getCartItemCount = () => {
    if (cartError || cartLoading || !cartData?.cart) return 0;
    return cartData.cart.length;
  };

  const getFavoriteItemCount = () => {
    if (favoriteError || favoriteLoading || !favoriteData?.favorites) return 0;
    return favoriteData.favorites.length;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
    }
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const defaultImageUrl = "https://via.placeholder.com/300";

  const renderSearchSuggestions = () => {
    if (debouncedSearchQuery.trim() === "") return null;
    return (
      <div className="absolute bg-white shadow-md w-full mt-1 max-h-60 overflow-y-auto z-50">
        {searchLoading ? (
          <div className="p-2 text-gray-500">Yüklənir...</div>
        ) : searchError ? (
          <div className="p-2 text-red-500">Xəta baş verdi</div>
        ) : searchResults &&
          searchResults.products &&
          searchResults.products.length > 0 ? (
          searchResults.products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="block p-2 hover:bg-[#fe9034]/10"
              onClick={() => {
                setSearchQuery("");
                setIsSearchOpen(false);
              }}
            >
              <div className="flex items-center">
                <img
                  src={product?.images?.[0]?.url || defaultImageUrl}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded mr-2"
                />
                <span className="text-[#333]">{product.name}</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-2 text-gray-500">Nəticə tapılmadı.</div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Header / Navbar */}
      <header
        className={`w-full bg-white shadow-md fixed top-0 left-0 right-0 z-50 transform transition-transform duration-700 ease-in-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Mobil Menü Açma Butonu */}
          <button
            className="md:hidden p-2 rounded-full border border-[#fe9034] text-[#fe9034] hover:bg-[#fe9034] hover:text-white transition"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/src/assets/images/header/logo.png"
              className="w-16 sm:w-20 md:w-28 lg:w-32 xl:w-40"
              alt="Logo"
            />
          </Link>

          {/* Masaüstü Axtarış Çubuğu */}
          <div className="hidden sm:flex items-center flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="search"
                placeholder="Search haute couture, jewelry, watches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none text-[#333]"
              />
              <button
                type="submit"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-[#fe9034] transition"
              >
                <Search className="h-5 w-5" />
              </button>
              {renderSearchSuggestions()}
            </form>
          </div>

          {/* Naviqasiya Linkləri (Masaüstü) */}
          <nav className="hidden md:flex items-center gap-6 text-[#333]">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact Us" },
              { to: "/blogs", label: "Blog" },
            ].map((navItem) => (
              <Link
                key={navItem.to}
                to={navItem.to}
                className="
                  relative group text-sm font-semibold 
                  after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
                  after:bg-[#fe9034] group-hover:after:w-full after:transition-all 
                  after:duration-300 pb-1
                "
              >
                {navItem.label}
              </Link>
            ))}
          </nav>

          {/* İstifadəçi Bölümü */}
          <div className="flex items-center gap-4">
            {/* Favorilər */}
            <Link to="/favorites" className="relative">
              <button className="p-2 rounded-full border border-transparent hover:bg-[#fe9034]/10 transition">
                <Heart className="h-5 w-5 text-[#333] hover:text-[#fe9034] transition" />
              </button>
              {getFavoriteItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getFavoriteItemCount()}
                </span>
              )}
            </Link>

            {/* Səbət */}
            <Link to="/shoppingcard" className="relative">
              <button className="p-2 rounded-full border border-transparent hover:bg-[#fe9034]/10 transition">
                <ShoppingCart className="h-5 w-5 text-[#333] hover:text-[#fe9034] transition" />
              </button>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {/* Desktop: İstifadəçi Menyusu */}
            {isAuthenticated && (
              <div className="hidden md:block">
                <UserMenu
                  name={user?.user?.name}
                  email={user?.user?.email}
                  imageUrl={user?.user?.avatar?.url}
                  role={user?.user?.role}
                  onLogout={handleLogout}
                />
              </div>
            )}

            {/* Giriş edilməyibsə: Login/Register */}
            {!isAuthenticated && (
              <div className="hidden md:flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2  bg-white text-[#fe9034] rounded-md border border-[#fe9034] hover:bg-[#fe9034] hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-[#fe9034] rounded-md border border-[#fe9034] hover:bg-[#fe9034] hover:text-white transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Masaüstü Kategoriyalar */}
        <div className="bg-[#fe9034] text-white">
          <div className="container mx-auto hidden md:flex items-center justify-center gap-8 py-4">
            <Link
              to="/clothes"
              className="
                relative group px-6 py-2 font-semibold rounded-full border-2 border-white
                hover:bg-white hover:text-[#fe9034] transition-transform duration-300 hover:scale-105
              "
            >
              MEN
            </Link>
            <Link
              to="/qadin"
              className="
                relative group px-6 py-2 font-semibold rounded-full border-2 border-white
                hover:bg-white hover:text-[#fe9034] transition-transform duration-300 hover:scale-105
              "
            >
              WOMEN
            </Link>
            <Link
              to="/usaq"
              className="
                relative group px-6 py-2 font-semibold rounded-full border-2 border-white
                hover:bg-white hover:text-[#fe9034] transition-transform duration-300 hover:scale-105
              "
            >
              CHILDREN
            </Link>
          </div>
        </div>
      </header>

      {/* Mobil Axtarış Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-[999] flex flex-col">
          <div className="flex items-center p-4 border-b fixed top-0 left-0 right-0 bg-white w-full">
            <button
              className="p-2 bg-[#fe9034]/10 rounded-full hover:bg-[#fe9034]/20 transition"
              onClick={() => setIsSearchOpen(false)}
            >
              <ArrowLeft className="h-6 w-6 text-[#fe9034]" />
            </button>
            <form onSubmit={handleSearch} className="relative flex-1 ml-4">
              <input
                type="search"
                placeholder="Search haute couture, jewelry, watches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none text-[#333]"
              />
              <button
                type="submit"
                className="absolute right-3 top-3 text-gray-400 hover:text-[#fe9034] transition"
              >
                <Search className="h-6 w-6" />
              </button>
              {renderSearchSuggestions()}
            </form>
          </div>
          <div className="mt-20"></div>
        </div>
      )}

      {/* Mobil Menü Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#fe9034]/20 z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Mobil Menü */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobil Sidebar Başlığı */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isAuthenticated && user?.user?.avatar?.url ? (
              <img
                src={user?.user?.avatar?.url}
                alt="Profile Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : !isAuthenticated ? (
              // isAuthenticated false olduqda mobil menu başlığında Login/Register düymələri
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-[#fe9034] text-white rounded-md border border-[#fe9034] hover:bg-white hover:text-[#fe9034] transition"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-[#fe9034] rounded-md border border-[#fe9034] hover:bg-[#fe9034] hover:text-white transition"
                  onClick={toggleMobileMenu}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex w-12 h-12 items-center justify-center bg-[#fe9034] text-white rounded-full">
                {user?.user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            {isAuthenticated && (
              <div className="flex flex-col">
                <h2 className="font-semibold text-[#333]">
                  {user?.user?.name}
                </h2>
                <p className="text-sm text-gray-600">{user?.user?.email}</p>
              </div>
            )}
          </div>
          <button
            className="p-2 border border-[#fe9034] text-[#fe9034] rounded-full hover:bg-[#fe9034] hover:text-white transition"
            onClick={toggleMobileMenu}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4">
          <div className="mb-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search"
                className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none cursor-pointer text-[#333]"
                onClick={() => setIsSearchOpen(true)}
              />
              <button
                onClick={() => setIsSearchOpen(true)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-[#fe9034] transition"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
          <ul className="space-y-2 text-[#333]">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#fe9034]/10 transition-colors"
                onClick={toggleMobileMenu}
              >
                <Home className="w-5 h-5" /> Home
              </Link>
            </li>
            <li>
              <div className="relative">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left hover:bg-[#fe9034]/10 transition-colors"
                >
                  <List className="w-5 h-5" /> Category
                </button>
                {isCategoryOpen && (
                  <ul className="pl-8 space-y-1">
                    <li>
                      <Link
                        to="/phone"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#fe9034]/10 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        <Smartphone className="w-5 h-5" /> Phones
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/computers"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#fe9034]/10 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        <Laptop className="w-5 h-5" /> Computers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/smart-watches"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#fe9034]/10 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        <User className="w-5 h-5" /> Smart Watches
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cameras"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#fe9034]/10 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        <Camera className="w-5 h-5" /> Cameras
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/headphones"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#fe9034]/10 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        <Headphones className="w-5 h-5" /> Headphones
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/gaming"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#fe9034]/10 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        <Gamepad className="w-5 h-5" /> Gaming
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <Link
                to="/topics"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#fe9034]/10 transition-colors"
                onClick={toggleMobileMenu}
              >
                <FileText className="w-5 h-5" /> Topics
              </Link>
            </li>
            <li>
              <Link
                to="/messages"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#fe9034]/10 transition-colors"
                onClick={toggleMobileMenu}
              >
                <MessageCircle className="w-5 h-5" /> Messages
              </Link>
            </li>
            <li>
              <Link
                to="/notifications"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#fe9034]/10 transition-colors"
                onClick={toggleMobileMenu}
              >
                <Bell className="w-5 h-5" /> Notifications
              </Link>
            </li>
            <li>
              <Link
                to="/bookmarks"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#fe9034]/10 transition-colors"
                onClick={toggleMobileMenu}
              >
                <Bookmark className="w-5 h-5" /> Bookmarks
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#fe9034]/10 transition-colors"
                onClick={toggleMobileMenu}
              >
                <User className="w-5 h-5" /> Profile
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobil Logout Butonu */}
        {isAuthenticated && (
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-[#fe9034]/10 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* İçəriklə Navbar üst-üstə düşməsin deyə boşluq */}
      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
