import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './SafeIcon';

const { FiSearch, FiMapPin, FiSettings } = FiIcons;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicleType, setVehicleType] = useState('all');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (vehicleType !== 'all') params.set('type', vehicleType);
    if (location) params.set('location', location);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSearch}
      className="bg-white rounded-2xl shadow-xl p-2 flex flex-col md:flex-row gap-2 max-w-4xl mx-auto"
    >
      {/* Search Input */}
      <div className="flex-1 relative">
        <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search cars, motorcycles, brands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
        />
      </div>

      {/* Vehicle Type Select */}
      <div className="relative min-w-[150px]">
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="w-full px-4 py-4 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-gray-50 appearance-none cursor-pointer"
        >
          <option value="all">All Vehicles</option>
          <option value="car">Cars</option>
          <option value="motorcycle">Motorcycles</option>
        </select>
        <SafeIcon icon={FiSettings} className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>

      {/* Location Input */}
      <div className="relative min-w-[200px]">
        <SafeIcon icon={FiMapPin} className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-gray-50"
        />
      </div>

      {/* Search Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 min-w-[120px]"
      >
        <SafeIcon icon={FiSearch} className="h-5 w-5" />
        <span>Search</span>
      </motion.button>
    </motion.form>
  );
};

export default SearchBar;