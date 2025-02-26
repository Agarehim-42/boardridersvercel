import React, { useState, useEffect } from "react";
import { Sun, Moon, Globe, MessageSquare, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const SupportButton = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

  // Dark mode qlobal olaraq aktivləşdirilir
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleChatClick = () => {
    // Chat funksionallığını buraya əlavə edin
    alert("Chat funksionallığı yaxın gələcəkdə əlavə olunacaq!");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Əsas support buttonu */}
      <button
        onClick={() => setOpen(!open)}
        className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg focus:outline-none"
      >
        {open ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
      </button>

      {open && (
        <div className="mt-2 flex flex-col items-end space-y-2">
          {/* Dark/Light mod toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow hover:bg-[#e65900] hover:text-white transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          {/* Dil Seçimi */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow hover:bg-[#e65900] hover:text-white transition-colors">
            <Globe className="w-5 h-5" />
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300"
            >
              <option value="en">EN</option>
              <option value="az">AZ</option>
              <option value="ru">RU</option>
            </select>
          </div>
          {/* Chat Düyməsi */}
          <button
            onClick={handleChatClick}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow hover:bg-[#e65900] hover:text-white transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default SupportButton;
