import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMapPin, FiCalendar, FiEye, FiHeart, FiClock } = FiIcons;

const ListingCard = ({ listing, viewMode = 'grid' }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div className="flex">
          <div className="relative w-80 h-48 flex-shrink-0">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {listing.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Featured
                </span>
              </div>
            )}
            <div className="absolute top-4 right-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/90 p-2 rounded-full backdrop-blur-sm hover:bg-white transition-colors"
              >
                <SafeIcon icon={FiHeart} className="h-4 w-4 text-gray-600" />
              </motion.button>
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                  {listing.title}
                </h3>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {formatPrice(listing.price)}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-gray-500 text-sm mb-1">
                  <SafeIcon icon={FiEye} className="h-3 w-3" />
                  <span>{listing.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500 text-sm">
                  <SafeIcon icon={FiClock} className="h-3 w-3" />
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <SafeIcon icon={FiMapPin} className="h-4 w-4" />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <SafeIcon icon={FiCalendar} className="h-4 w-4" />
                <span>{listing.year} • {formatMileage(listing.mileage)} miles</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                  {listing.type}
                </span>
                <span className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm capitalize">
                  {listing.category.replace('-', ' ')}
                </span>
              </div>
              <Link to={`/listing/${listing.id}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  View Details
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {listing.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/90 p-2 rounded-full backdrop-blur-sm hover:bg-white transition-colors"
          >
            <SafeIcon icon={FiHeart} className="h-4 w-4 text-gray-600" />
          </motion.button>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center space-x-1 text-white text-xs">
          <SafeIcon icon={FiEye} className="h-3 w-3" />
          <span>{listing.views.toLocaleString()} views</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {listing.title}
        </h3>
        <div className="text-2xl font-bold text-primary-600 mb-3">
          {formatPrice(listing.price)}
        </div>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiMapPin} className="h-4 w-4" />
            <span>{listing.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiCalendar} className="h-4 w-4" />
            <span>{listing.year} • {formatMileage(listing.mileage)} miles</span>
          </div>
        </div>
        <div className="flex space-x-2 mb-4">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
            {listing.type}
          </span>
          <span className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm capitalize">
            {listing.category.replace('-', ' ')}
          </span>
        </div>
        <Link to={`/listing/${listing.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gray-100 text-gray-900 py-2 rounded-lg font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors"
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ListingCard;