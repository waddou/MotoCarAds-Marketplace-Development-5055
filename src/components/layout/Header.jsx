import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMenu, FiX, FiCar, FiUser, FiPlus, FiSearch, FiHeart, FiShield } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: FiIcons.FiHome },
    { name: 'Listings', path: '/listings', icon: FiSearch },
    { name: 'Post Ad', path: '/post-ad', icon: FiPlus },
    { name: 'About', path: '/about', icon: FiIcons.FiInfo },
    { name: 'Contact', path: '/contact', icon: FiIcons.FiMail },
    { name: 'Admin', path: '/admin', icon: FiShield },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-xl"
            >
              <SafeIcon icon={FiCar} className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold font-display bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                MotoCarAds
              </h1>
              <p className="text-xs text-gray-500">Find Your Perfect Vehicle</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                } ${item.name === 'Admin' ? 'border border-primary-200 bg-primary-25' : ''}`}
              >
                <SafeIcon icon={item.icon} className="h-4 w-4" />
                <span>{item.name}</span>
                {item.name === 'Admin' && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary-100 text-primary-700 rounded-full">
                    New
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-primary-600 rounded-lg hover:bg-gray-50"
            >
              <SafeIcon icon={FiHeart} className="h-5 w-5" />
            </motion.button>
            <Link to="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiUser} className="h-4 w-4" />
                <span>Profile</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-50"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4"
          >
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  } ${item.name === 'Admin' ? 'border border-primary-200' : ''}`}
                >
                  <SafeIcon icon={item.icon} className="h-5 w-5" />
                  <span>{item.name}</span>
                  {item.name === 'Admin' && (
                    <span className="ml-auto px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">
                      New
                    </span>
                  )}
                </Link>
              ))}
              <div className="flex items-center space-x-2 px-4 py-3">
                <Link to="/profile" className="flex-1">
                  <button className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Profile
                  </button>
                </Link>
                <button className="p-2 text-gray-600 hover:text-primary-600 rounded-lg hover:bg-gray-50">
                  <SafeIcon icon={FiHeart} className="h-5 w-5" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;