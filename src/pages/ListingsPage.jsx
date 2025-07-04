import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import ListingCard from '../components/listings/ListingCard';
import FilterSidebar from '../components/listings/FilterSidebar';

const { FiFilter, FiGrid, FiList, FiX } = FiIcons;

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from API
  const mockListings = [
    {
      id: 1,
      title: '2023 BMW M4 Competition',
      price: 85000,
      location: 'Los Angeles, CA',
      year: 2023,
      mileage: 2500,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
      type: 'car',
      category: 'sports',
      brand: 'BMW',
      model: 'M4',
      featured: true,
      views: 1250,
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      title: '2022 Ducati Panigale V4',
      price: 28500,
      location: 'Miami, FL',
      year: 2022,
      mileage: 1200,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop',
      type: 'motorcycle',
      category: 'sport-bike',
      brand: 'Ducati',
      model: 'Panigale V4',
      featured: true,
      views: 890,
      createdAt: '2024-01-14',
    },
    {
      id: 3,
      title: '2021 Tesla Model S Plaid',
      price: 95000,
      location: 'San Francisco, CA',
      year: 2021,
      mileage: 8500,
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop',
      type: 'car',
      category: 'sedan',
      brand: 'Tesla',
      model: 'Model S',
      featured: true,
      views: 2100,
      createdAt: '2024-01-13',
    },
    {
      id: 4,
      title: '2023 Harley-Davidson Street Glide',
      price: 32000,
      location: 'Austin, TX',
      year: 2023,
      mileage: 500,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=400&fit=crop',
      type: 'motorcycle',
      category: 'cruiser',
      brand: 'Harley-Davidson',
      model: 'Street Glide',
      featured: false,
      views: 650,
      createdAt: '2024-01-12',
    },
    {
      id: 5,
      title: '2022 Porsche 911 Turbo S',
      price: 220000,
      location: 'New York, NY',
      year: 2022,
      mileage: 3200,
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
      type: 'car',
      category: 'sports',
      brand: 'Porsche',
      model: '911',
      featured: false,
      views: 1800,
      createdAt: '2024-01-11',
    },
    {
      id: 6,
      title: '2023 Honda Civic Type R',
      price: 45000,
      location: 'Chicago, IL',
      year: 2023,
      mileage: 1500,
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop',
      type: 'car',
      category: 'sports',
      brand: 'Honda',
      model: 'Civic',
      featured: false,
      views: 920,
      createdAt: '2024-01-10',
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setListings(mockListings);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredListings = listings.filter(listing => {
    const searchTerm = searchParams.get('q')?.toLowerCase() || '';
    const vehicleType = searchParams.get('type');
    const category = searchParams.get('category');
    const location = searchParams.get('location')?.toLowerCase() || '';

    if (searchTerm && !listing.title.toLowerCase().includes(searchTerm)) return false;
    if (vehicleType && listing.type !== vehicleType) return false;
    if (category && listing.category !== category) return false;
    if (location && !listing.location.toLowerCase().includes(location)) return false;

    return true;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'year':
        return b.year - a.year;
      case 'mileage':
        return a.mileage - b.mileage;
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-gray-900 mb-2">
              Vehicle Listings
            </h1>
            <p className="text-gray-600">
              {sortedListings.length} vehicles found
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year">Year</option>
              <option value="mileage">Mileage</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-300'
                }`}
              >
                <SafeIcon icon={FiGrid} className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-300'
                }`}
              >
                <SafeIcon icon={FiList} className="h-4 w-4" />
              </button>
            </div>

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiFilter} className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
              <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <SafeIcon icon={FiX} className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4 overflow-y-auto">
                  <FilterSidebar />
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {sortedListings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <SafeIcon icon={FiIcons.FiSearch} className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings found</h3>
                <p className="text-gray-600">Try adjusting your search filters</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {sortedListings.map((listing, index) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ListingCard listing={listing} viewMode={viewMode} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;