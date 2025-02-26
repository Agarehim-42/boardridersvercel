import React from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className=" text-white mt-10">
      <div>
        <img src="src/assets/images/footer/footer-bg.webp" alt="" />
      </div>
      {/* Üst qisim: link sütunları */}
      <div className="bg-black">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company info</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>About Temu</li>
              <li>Temu – Shop Like a Billionaire</li>
              <li>Affiliate &amp; Influencer: Earn Commission</li>
              <li>Contact us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Temu's Tree Planting Program</li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-lg font-bold mb-4">Customer service</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Return and refund policy</li>
              <li>Intellectual property policy</li>
              <li>Shipping info</li>
              <li>Report suspicious activity</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-bold mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Support center &amp; FAQ</li>
              <li>Safety center</li>
              <li>Temu purchase protection</li>
              <li>Sitemap</li>
              <li>Partner with Temu</li>
            </ul>
          </div>

          {/* Download the Temu App */}
          <div>
            <h3 className="text-lg font-bold mb-4">Download the Temu App</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Price-drop alerts</li>
              <li>Track orders any time</li>
              <li>Faster &amp; more secure checkout</li>
              <li>Low stock items alerts</li>
              <li>Exclusive offers</li>
              <li>Coupons &amp; offers alerts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sosial media ikonları */}
      <div className="border-t border-gray-700 py-8">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h4 className="text-md font-semibold mb-4">Connect with us</h4>
          <ul className="flex gap-4">
            {/* LinkedIn */}
            <li className="relative group">
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-700 relative overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                <div className="absolute inset-0 bg-[#0274b3] h-0 group-hover:h-full transition-all duration-300 ease-in-out"></div>
                <FaLinkedin className="relative z-10 text-xl group-hover:text-white" />
              </a>
            </li>

            {/* GitHub */}
            <li className="relative group">
              <a
                href="https://www.github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-700 relative overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                <div className="absolute inset-0 bg-gray-800 h-0 group-hover:h-full transition-all duration-300 ease-in-out"></div>
                <FaGithub className="relative z-10 text-xl group-hover:text-white" />
              </a>
            </li>

            {/* Instagram */}
            <li className="relative group">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-700 relative overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 h-0 group-hover:h-full transition-all duration-300 ease-in-out"></div>
                <FaInstagram className="relative z-10 text-xl group-hover:text-white" />
              </a>
            </li>

            {/* YouTube */}
            <li className="relative group">
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-700 relative overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                <div className="absolute inset-0 bg-red-600 h-0 group-hover:h-full transition-all duration-300 ease-in-out"></div>
                <FaYoutube className="relative z-10 text-xl group-hover:text-white" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Ödəniş kartları */}
      <div className="border-t border-gray-700 py-8">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Visa_2021.svg"
            alt="Visa"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.svg"
            alt="Mastercard"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            alt="Apple Pay"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Pay"
            className="h-8"
          />
        </div>
      </div>

      {/* Alt qisim: Copyright və linklər */}
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-400">© 2025 WhaleCo Inc.</p>
        <div className="text-sm text-gray-400 flex flex-wrap items-center gap-2 mt-3 md:mt-0">
          <a href="#" className="hover:underline">
            Terms of use
          </a>
          <span className="mx-1">|</span>
          <a href="#" className="hover:underline">
            Privacy policy
          </a>
          <span className="mx-1">|</span>
          <a href="#" className="hover:underline">
            Your privacy choices
          </a>
          <span className="mx-1">|</span>
          <a href="#" className="hover:underline">
            Ad Choices
          </a>
        </div>
      </div>
      </div>
     
    </footer>
  );
}

export default Footer;
