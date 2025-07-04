import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTruck, FiZap, FiWind, FiTarget, FiChevronsUp, FiMapPin } = FiIcons;

const CategoryGrid = () => {
  const categories = [
    {
      id: 'sports-cars',
      name: 'Sports Cars',
      icon: FiZap,
      count: '2,450',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
      gradient: 'from-red-500 to-orange-500',
    },
    {
      id: 'suvs',
      name: 'SUVs',
      icon: FiTruck,
      count: '3,200',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'sedans',
      name: 'Sedans',
      icon: FiTarget,
      count: '1,800',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'sport-bikes',
      name: 'Sport Bikes',
      icon: FiWind,
      count: '950',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      id: 'cruisers',
      name: 'Cruisers',
      icon: FiChevronsUp,
      count: '720',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'touring',
      name: 'Touring',
      icon: FiMapPin,
      count: '540',
      image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=300&fit=crop',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find exactly what you're looking for in our specialized categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={`/listings?category=${category.id}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80`}></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <SafeIcon icon={category.icon} className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        <p className="text-sm text-white/90">{category.count} listings</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;