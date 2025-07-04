import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';

const { 
  FiMapPin, FiCalendar, FiEye, FiHeart, FiPhone, FiMail, FiUser, 
  FiChevronLeft, FiChevronRight, FiShare2, FiFlag, FiCheck, FiX 
} = FiIcons;

const ListingDetailPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showContactInfo, setShowContactInfo] = useState(false);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    setTimeout(() => {
      setListing({
        id: 1,
        title: '2023 BMW M4 Competition',
        price: 85000,
        location: 'Los Angeles, CA',
        year: 2023,
        mileage: 2500,
        images: [
          'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
        ],
        type: 'car',
        category: 'sports',
        brand: 'BMW',
        model: 'M4',
        featured: true,
        views: 1250,
        createdAt: '2024-01-15',
        description: 'Immaculate 2023 BMW M4 Competition with only 2,500 miles. This stunning sports car features the powerful twin-turbo inline-6 engine, producing 503 horsepower. The vehicle has been meticulously maintained and comes with all original documentation. Features include carbon fiber interior trim, M Performance exhaust, and premium sound system.',
        condition: 'Excellent',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        color: 'Alpine White',
        vin: 'WBS8M9C09NCE12345',
        features: [
          'Leather Seats',
          'Sunroof',
          'Navigation System',
          'Bluetooth',
          'Backup Camera',
          'Heated Seats',
          'Premium Sound System',
          'Keyless Entry',
          'Alloy Wheels',
          'Parking Sensors'
        ],
        seller: {
          name: 'John Smith',
          phone: '(555) 123-4567',
          email: 'john@example.com',
          memberSince: '2020',
          verified: true,
          rating: 4.8,
          totalListings: 12
        }
      });
      setLoading(false);
    }, 1000);
  }, [id]);

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Listing Not Found</h1>
          <p className="text-gray-600 mb-4">The listing you're looking for doesn't exist.</p>
          <Link to="/listings" className="text-primary-600 hover:text-primary-700">
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/listings" className="text-primary-600 hover:text-primary-700 flex items-center">
            <SafeIcon icon={FiChevronLeft} className="h-4 w-4 mr-1" />
            Back to Listings
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={listing.images[currentImageIndex]}
                  alt={listing.title}
                  className="w-full h-96 object-cover"
                />
                
                {/* Image Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <SafeIcon icon={FiChevronLeft} className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <SafeIcon icon={FiChevronRight} className="h-5 w-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {listing.images.length}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/90 p-2 rounded-full backdrop-blur-sm hover:bg-white transition-colors">
                    <SafeIcon icon={FiHeart} className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="bg-white/90 p-2 rounded-full backdrop-blur-sm hover:bg-white transition-colors">
                    <SafeIcon icon={FiShare2} className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-primary-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${listing.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiMapPin} className="h-4 w-4" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiEye} className="h-4 w-4" />
                      <span>{listing.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {formatPrice(listing.price)}
                  </div>
                  <button className="text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                    <SafeIcon icon={FiFlag} className="h-4 w-4" />
                    <span>Report</span>
                  </button>
                </div>
              </div>

              {/* Key Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Year</div>
                  <div className="font-semibold text-gray-900">{listing.year}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Mileage</div>
                  <div className="font-semibold text-gray-900">{formatMileage(listing.mileage)} miles</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Condition</div>
                  <div className="font-semibold text-gray-900">{listing.condition}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Fuel Type</div>
                  <div className="font-semibold text-gray-900">{listing.fuelType}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{listing.description}</p>
              </div>

              {/* Vehicle Details */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Brand</span>
                    <span className="font-medium">{listing.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Model</span>
                    <span className="font-medium">{listing.model}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Transmission</span>
                    <span className="font-medium">{listing.transmission}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Color</span>
                    <span className="font-medium">{listing.color}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">VIN</span>
                    <span className="font-medium font-mono text-sm">{listing.vin}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {listing.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Seller Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiUser} className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <span>{listing.seller.name}</span>
                    {listing.seller.verified && (
                      <SafeIcon icon={FiCheck} className="h-4 w-4 text-green-500" />
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">Member since {listing.seller.memberSince}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{listing.seller.rating}</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{listing.seller.totalListings}</div>
                  <div className="text-xs text-gray-600">Listings</div>
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowContactInfo(!showContactInfo)}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiPhone} className="h-4 w-4" />
                  <span>Show Contact Info</span>
                </motion.button>
                
                {showContactInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2 text-gray-700">
                      <SafeIcon icon={FiPhone} className="h-4 w-4" />
                      <span>{listing.seller.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <SafeIcon icon={FiMail} className="h-4 w-4" />
                      <span>{listing.seller.email}</span>
                    </div>
                  </motion.div>
                )}
                
                <button className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                  <SafeIcon icon={FiMail} className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center space-x-2">
                  <SafeIcon icon={FiHeart} className="h-4 w-4" />
                  <span>Save to Favorites</span>
                </button>
                <button className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2">
                  <SafeIcon icon={FiShare2} className="h-4 w-4" />
                  <span>Share Listing</span>
                </button>
                <button className="w-full bg-yellow-50 text-yellow-600 py-2 rounded-lg hover:bg-yellow-100 transition-colors flex items-center justify-center space-x-2">
                  <SafeIcon icon={FiFlag} className="h-4 w-4" />
                  <span>Report Issue</span>
                </button>
              </div>
            </div>

            {/* Similar Listings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Similar Listings</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex space-x-3">
                    <img
                      src={`https://images.unsplash.com/photo-1555215695-3004980ad54e?w=80&h=60&fit=crop&auto=format`}
                      alt="Similar vehicle"
                      className="w-20 h-15 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">2022 BMW M3 Competition</h4>
                      <p className="text-primary-600 font-semibold text-sm">$78,000</p>
                      <p className="text-gray-600 text-xs">Los Angeles, CA</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/listings" className="block text-center text-primary-600 hover:text-primary-700 mt-4 text-sm">
                View All Similar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;