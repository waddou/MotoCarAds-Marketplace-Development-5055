import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMapPin, FiCalendar, FiEye, FiHeart, FiArrowRight } = FiIcons;

const FeaturedListings = () => {
  const featuredListings = [
    {
      id: 1,
      title: '2023 BMW M4 Competition',
      price: '$85,000',
      location: 'Los Angeles, CA',
      year: 2023,
      mileage: '2,500 miles',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
      type: 'car',
      featured: true,
      views: 1250,
    },
    {
      id: 2,
      title: '2022 Ducati Panigale V4',
      price: '$28,500',
      location: 'Miami, FL',
      year: 2022,
      mileage: '1,200 miles',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop',
      type: 'motorcycle',
      featured: true,
      views: 890,
    },
    {
      id: 3,
      title: '2021 Tesla Model S Plaid',
      price: '$95,000',
      location: 'San Francisco, CA',
      year: 2021,
      mileage: '8,500 miles',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop',
      type: 'car',
      featured: true,
      views: 2100,
    },
    {
      id: 4,
      title: '2023 Harley-Davidson Street Glide',
      price: '$32,000',
      location: 'Austin, TX',
      year: 2023,
      mileage: '500 miles',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=400&fit=crop',
      type: 'motorcycle',
      featured: true,
      views: 650,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
              Featured Listings
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked premium vehicles from our collection
            </p>
          </div>
          <Link to="/listings">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              <span>View All</span>
              <SafeIcon icon={FiArrowRight} className="h-4 w-4" />
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
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
                  {listing.price}
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiMapPin} className="h-4 w-4" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCalendar} className="h-4 w-4" />
                    <span>{listing.year} • {listing.mileage}</span>
                  </div>
                </div>
                <Link to={`/listing/${listing.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 bg-gray-100 text-gray-900 py-2 rounded-lg font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    View Details
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link to="/listings">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              View All Listings
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;