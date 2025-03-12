import React from "react";
import { Facebook, Twitter, Instagram, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-10">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-6">Bizibyte</h2>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="border border-white rounded-md px-4 py-2 flex items-center hover:bg-white/10 transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.75 14.35c-2.35-.2-4.55-.2-6.9 0-.35.03-.7-.25-.75-.6v-5.5c.05-.35.4-.65.75-.6 2.35.2 4.55.2 6.9 0 .35-.05.7.25.75.6v5.5c-.05.35-.4.63-.75.6z" />
                </svg>
                App Store
              </a>
              <a
                href="#"
                className="border border-white rounded-md px-4 py-2 flex items-center hover:bg-white/10 transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.184l2.71-2.712 2.267 1.304a1 1 0 0 1 0 1.732l-2.267 1.304-2.71-2.712-.083-.083.083-.083z" />
                </svg>
                Google Play
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Get Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-gray-300 hover:text-white">
                    Buy gift cards
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-300 hover:text-white">
                    Add your restaurant
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-300 hover:text-white">
                    Sign up to deliver
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-300 hover:text-white">
                    Save on your first order
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Restaurants</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-gray-300 hover:text-white">
                    Nearby restaurants
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-300 hover:text-white">
                    View all cities
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-300 hover:text-white">
                    Pickup near me
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-300 hover:text-white">
                    English
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-300 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-300 hover:text-white">
                    Investors
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-300 hover:text-white">
                    Company Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
              <Link to="#" className="text-sm text-gray-300 hover:text-white">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-gray-300 hover:text-white">
                Terms
              </Link>
              <Link to="#" className="text-sm text-gray-300 hover:text-white">
                Pricing
              </Link>
              <Link to="#" className="text-sm text-gray-300 hover:text-white">
                Do not sell or share my personal information
              </Link>
            </div>
            <div className="text-sm text-gray-300">
              <p>
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </p>
              <p className="mt-1">
                © {new Date().getFullYear()} Bizibyte Inc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
