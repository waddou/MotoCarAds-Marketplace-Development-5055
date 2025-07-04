import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCar, FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiShield } = FiIcons;

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Cars', path: '/listings?type=car' },
    { name: 'Browse Motorcycles', path: '/listings?type=motorcycle' },
    { name: 'Post Ad', path: '/post-ad' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin Panel', path: '/admin' },
  ];

  const categories = [
    { name: 'Sports Cars', path: '/listings?category=sports' },
    { name: 'SUVs', path: '/listings?category=suv' },
    { name: 'Sedans', path: '/listings?category=sedan' },
    { name: 'Sport Bikes', path: '/listings?category=sport-bike' },
    { name: 'Cruisers', path: '/listings?category=cruiser' },
    { name: 'Touring', path: '/listings?category=touring' },
  ];

  const socialLinks = [
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-xl"
              >
                <SafeIcon icon={FiCar} className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold font-display">MotoCarAds</h2>
                <p className="text-xs text-gray-400">Find Your Perfect Vehicle</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted platform for buying and selling motorcycles and cars. Connect with enthusiasts and find your perfect vehicle.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-secondary-800 p-2 rounded-lg hover:bg-primary-600 transition-colors"
                  aria-label={social.label}
                >
                  <SafeIcon icon={social.icon} className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-gray-400 hover:text-white transition-colors text-sm flex items-center space-x-2 ${
                      link.name === 'Admin Panel' ? 'font-medium' : ''
                    }`}
                  >
                    {link.name === 'Admin Panel' && (
                      <SafeIcon icon={FiShield} className="h-3 w-3" />
                    )}
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMapPin} className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400 text-sm">123 Auto Street, Car City, CC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiPhone} className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMail} className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400 text-sm">info@motocarads.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 MotoCarAds. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
            <Link to="/admin" className="text-gray-400 hover:text-primary-400 text-sm transition-colors font-medium">
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;