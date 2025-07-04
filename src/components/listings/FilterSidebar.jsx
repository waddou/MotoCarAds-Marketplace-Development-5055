import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiChevronDown, FiChevronUp } = FiIcons;

const FilterSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    vehicleType: true,
    priceRange: true,
    year: true,
    mileage: true,
    location: true,
    features: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = ({ title, section, children }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex justify-between items-center w-full text-left font-semibold text-gray-900 mb-3"
      >
        <span>{title}</span>
        <SafeIcon 
          icon={expandedSections[section] ? FiChevronUp : FiChevronDown} 
          className="h-4 w-4" 
        />
      </button>
      {expandedSections[section] && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold font-display text-gray-900 mb-6">Filters</h2>
      
      <FilterSection title="Vehicle Type" section="vehicleType">
        <div className="space-y-3">
          {['All', 'Cars', 'Motorcycles'].map(type => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="vehicleType"
                value={type.toLowerCase()}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-2 text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range" section="priceRange">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="number"
              placeholder="Max"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="space-y-2">
            {['Under $10,000', '$10,000 - $25,000', '$25,000 - $50,000', '$50,000 - $100,000', 'Over $100,000'].map(range => (
              <label key={range} className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-gray-700">{range}</span>
              </label>
            ))}
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Year" section="year">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="From"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="number"
              placeholder="To"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Mileage" section="mileage">
        <div className="space-y-2">
          {['Under 10,000', '10,000 - 25,000', '25,000 - 50,000', '50,000 - 100,000', 'Over 100,000'].map(range => (
            <label key={range} className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-gray-700">{range}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Location" section="location">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="City, State or ZIP"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="space-y-2">
            {['Within 25 miles', 'Within 50 miles', 'Within 100 miles', 'Within 200 miles'].map(distance => (
              <label key={distance} className="flex items-center">
                <input
                  type="radio"
                  name="distance"
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-gray-700">{distance}</span>
              </label>
            ))}
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Features" section="features">
        <div className="space-y-2">
          {['Leather Seats', 'Sunroof', 'Navigation', 'Bluetooth', 'Backup Camera', 'Heated Seats'].map(feature => (
            <label key={feature} className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <div className="flex space-x-3 mt-6">
        <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
          Apply Filters
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;