import React from 'react';
import Logo from './Logo';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const currentYear = new Date().getFullYear();

const footerSections = [
  {
    title: 'About Bizibyte',
    links: ['About Us', 'Careers', 'Blog', 'Press', 'Contact Us', 'Gift Cards']
  },
  {
    title: 'For Restaurants',
    links: ['Partner with Us', 'Restaurant Dashboard', 'Restaurant Resources', 'Success Stories']
  },
  {
    title: 'For Customers',
    links: ['How it Works', 'Delivery Areas', 'FAQ', 'Support', 'Promotions']
  },
  {
    title: 'Legal',
    links: ['Terms & Conditions', 'Privacy Policy', 'Cookie Policy', 'Accessibility']
  }
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'Youtube' }
];

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Logo variant="default" />
            <p className="mt-4 text-gray-600 max-w-md">
              Bizibyte connects you with the best local restaurants. Order your favorite meals for delivery or pickup, and enjoy the convenience of food at your fingertips.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600">
              © {currentYear} Bizibyte. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="transition-opacity hover:opacity-80">
                <img src="/app-store.svg" alt="Download on the App Store" className="h-10" />
              </a>
              <a href="#" className="transition-opacity hover:opacity-80">
                <img src="/google-play.svg" alt="Get it on Google Play" className="h-10" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
