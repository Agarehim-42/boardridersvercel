
import { Link } from "react-router-dom"
 import { ShoppingCart, Search, User, Heart } from "lucide-react"

const Navbar = () => {
  return (
    <div className="w-full">
      {/* Top bar */}
      <div className="w-full bg-black text-white text-sm py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span>Ваш регион доставки:</span>
              <button className="hover:underline">Москва</button>
            </div>
            <Link to="/stores" className="hover:underline">
              Магазины
            </Link>
            <Link to="/help" className="hover:underline">
              Помощь
            </Link>
            <Link to="/blog" className="hover:underline">
              Блоги
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span>Бесплатная доставка*</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Оплата при получении</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Возврат в течение 14 дней</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
              <span className="self-center text-2xl font-semibold">BOARDRIDERS</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Новинки
              </Link>
              <Link to="/snowboard" className="text-gray-700 hover:text-blue-600">
                Сноуборд
              </Link>
              <Link to="/ski" className="text-gray-700 hover:text-blue-600">
                Лыжи
              </Link>
              <Link to="/skate" className="text-gray-700 hover:text-blue-600">
                Скейт
              </Link>
              <Link to="/longboard" className="text-gray-700 hover:text-blue-600">
                Лонгборд
              </Link>
              <Link to="/wakeboard" className="text-gray-700 hover:text-blue-600">
                Вейкборд
              </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:text-blue-600">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/account" className="p-2 hover:text-blue-600">
                <User className="w-5 h-5" />
              </Link>
              <Link to="/favorites" className="p-2 hover:text-blue-600">
                <Heart className="w-5 h-5" />
              </Link>
              <Link to="/cart" className="p-2 hover:text-blue-600">
                <ShoppingCart className="w-5 h-5" />
              </Link>
              <Link to="/login" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
                Войти
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Category navigation */}
          <div className="hidden md:flex items-center justify-center space-x-8 py-4">
            <Link to="/men" className="text-gray-700 hover:text-blue-600">
              Мужчинам
            </Link>
            <Link to="/women" className="text-gray-700 hover:text-blue-600">
              Женщинам
            </Link>
            <Link to="/kids" className="text-gray-700 hover:text-blue-600">
              Детям
            </Link>
            <Link to="/clothes" className="text-gray-700 hover:text-blue-600">
              Одежда
            </Link>
            <Link to="/shoes" className="text-gray-700 hover:text-blue-600">
              Обувь
            </Link>
            <Link to="/accessories" className="text-gray-700 hover:text-blue-600">
              Аксессуары
            </Link>
            <Link to="/brands" className="text-gray-700 hover:text-blue-600">
              Бренды
            </Link>
            <Link to="/sale" className="text-red-600 hover:text-red-700">
              Распродажа
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

