import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Logo and Social Links */}
        <div className="mb-6">
          <Logo variant="white" />
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-white hover:text-orange-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-orange-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-orange-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03z" />
              </svg>
            </a>
          </div>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="border border-white rounded-md px-3 py-1.5 flex items-center text-white hover:bg-white/10">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.75 14.35c-2.35-.2-4.55-.2-6.9 0-.35.03-.7-.25-.75-.6v-5.5c.05-.35.4-.65.75-.6 2.35.2 4.55.2 6.9 0 .35-.05.7.25.75.6v5.5c-.05.35-.4.63-.75.6z" />
              </svg>
              App Store
            </a>
            <a href="#" className="border border-white rounded-md px-3 py-1.5 flex items-center text-white hover:bg-white/10">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.184l2.71-2.712 2.267 1.304a1 1 0 0 1 0 1.732l-2.267 1.304-2.71-2.712-.083-.083.083-.083z" />
              </svg>
              Google Play
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Get Help</h3>
            <ul className="space-y-1.5">
              <li><Link to="/gift-cards" className="text-gray-300 hover:text-white">Buy gift cards</Link></li>
              <li><Link to="/add-restaurant" className="text-gray-300 hover:text-white">Add your restaurant</Link></li>
              <li><Link to="/sign-up-deliver" className="text-gray-300 hover:text-white">Sign up to deliver</Link></li>
              <li><Link to="/first-order" className="text-gray-300 hover:text-white">Save on your first order</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Restaurants</h3>
            <ul className="space-y-1.5">
              <li><Link to="/nearby" className="text-gray-300 hover:text-white">Nearby restaurants</Link></li>
              <li><Link to="/cities" className="text-gray-300 hover:text-white">View all cities</Link></li>
              <li><Link to="/pickup" className="text-gray-300 hover:text-white">Pickup near me</Link></li>
              <li><LanguageSelector variant="footer" /></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <ul className="space-y-1.5">
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
              <li><Link to="/investors" className="text-gray-300 hover:text-white">Investors</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white">Company Blog</Link></li>
            </ul>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="border-t border-gray-800 pt-4">
          <div className="flex flex-wrap gap-4 mb-2">
            <Link to="/legal/privacy" className="text-sm text-gray-300 hover:text-white">Privacy Policy</Link>
            <Link to="/legal/terms" className="text-sm text-gray-300 hover:text-white">Terms</Link>
            <Link to="/legal/pricing" className="text-sm text-gray-300 hover:text-white">Pricing</Link>
            <Link to="/legal/do-not-sell" className="text-sm text-gray-300 hover:text-white">Do not sell or share my personal information</Link>
          </div>
          <div className="text-sm text-gray-300">
            <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
            <p className="mt-1">© {new Date().getFullYear()} Bizibyte Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
