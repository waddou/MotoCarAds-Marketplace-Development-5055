import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';

const { FiUser, FiSettings, FiHeart, FiEye, FiEdit, FiPlus, FiTrash2, FiStar, FiMapPin, FiCalendar } = FiIcons;

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('listings');

  const userProfile = {
    name: 'John Smith',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    location: 'Los Angeles, CA',
    memberSince: '2020',
    verified: true,
    rating: 4.8,
    totalListings: 12,
    successfulSales: 8,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  };

  const myListings = [
    {
      id: 1,
      title: '2023 BMW M4 Competition',
      price: 85000,
      location: 'Los Angeles, CA',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop',
      status: 'active',
      views: 1250,
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      title: '2021 Honda Civic Type R',
      price: 45000,
      location: 'Los Angeles, CA',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=300&h=200&fit=crop',
      status: 'sold',
      views: 890,
      createdAt: '2024-01-10',
    },
  ];

  const favorites = [
    {
      id: 3,
      title: '2022 Ducati Panigale V4',
      price: 28500,
      location: 'Miami, FL',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
      seller: 'Mike Rodriguez',
    },
    {
      id: 4,
      title: '2023 Tesla Model S Plaid',
      price: 95000,
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&h=200&fit=crop',
      seller: 'Sarah Johnson',
    },
  ];

  const tabs = [
    { id: 'listings', label: 'My Listings', icon: FiUser },
    { id: 'favorites', label: 'Favorites', icon: FiHeart },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              {userProfile.verified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1">
                  <SafeIcon icon={FiStar} className="h-4 w-4" />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{userProfile.name}</h1>
              <p className="text-gray-600 mb-1">{userProfile.email}</p>
              <p className="text-gray-600 mb-2">{userProfile.location}</p>
              <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-gray-500">
                <span>Member since {userProfile.memberSince}</span>
                <span>•</span>
                <span>{userProfile.rating} ⭐ rating</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiEdit} className="h-4 w-4" />
                <span>Edit Profile</span>
              </motion.button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{userProfile.totalListings}</div>
              <div className="text-gray-600">Total Listings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{userProfile.successfulSales}</div>
              <div className="text-gray-600">Successful Sales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{userProfile.rating}</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* My Listings Tab */}
            {activeTab === 'listings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Listings</h2>
                  <Link to="/post-ad">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                    >
                      <SafeIcon icon={FiPlus} className="h-4 w-4" />
                      <span>New Listing</span>
                    </motion.button>
                  </Link>
                </div>

                {myListings.length === 0 ? (
                  <div className="text-center py-12">
                    <SafeIcon icon={FiUser} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings yet</h3>
                    <p className="text-gray-600 mb-4">Start selling by creating your first listing</p>
                    <Link to="/post-ad">
                      <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Create Listing
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myListings.map((listing) => (
                      <motion.div
                        key={listing.id}
                        whileHover={{ y: -2 }}
                        className="bg-gray-50 rounded-xl overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              listing.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {listing.status === 'active' ? 'Active' : 'Sold'}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4 flex space-x-2">
                            <button className="bg-white/90 p-2 rounded-full backdrop-blur-sm hover:bg-white transition-colors">
                              <SafeIcon icon={FiEdit} className="h-4 w-4 text-gray-600" />
                            </button>
                            <button className="bg-white/90 p-2 rounded-full backdrop-blur-sm hover:bg-white transition-colors">
                              <SafeIcon icon={FiTrash2} className="h-4 w-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{listing.title}</h3>
                          <div className="text-xl font-bold text-primary-600 mb-3">
                            {formatPrice(listing.price)}
                          </div>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={FiMapPin} className="h-4 w-4" />
                              <span>{listing.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={FiEye} className="h-4 w-4" />
                              <span>{listing.views.toLocaleString()} views</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Favorite Listings</h2>
                
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <SafeIcon icon={FiHeart} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
                    <p className="text-gray-600 mb-4">Save listings you're interested in</p>
                    <Link to="/listings">
                      <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Browse Listings
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((listing) => (
                      <motion.div
                        key={listing.id}
                        whileHover={{ y: -2 }}
                        className="bg-gray-50 rounded-xl overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-4 right-4">
                            <button className="bg-white/90 p-2 rounded-full backdrop-blur-sm hover:bg-white transition-colors">
                              <SafeIcon icon={FiHeart} className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{listing.title}</h3>
                          <div className="text-xl font-bold text-primary-600 mb-3">
                            {formatPrice(listing.price)}
                          </div>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={FiMapPin} className="h-4 w-4" />
                              <span>{listing.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={FiUser} className="h-4 w-4" />
                              <span>by {listing.seller}</span>
                            </div>
                          </div>
                          <Link to={`/listing/${listing.id}`}>
                            <button className="w-full mt-4 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                              View Details
                            </button>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="space-y-8">
                  {/* Personal Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={userProfile.name}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={userProfile.email}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={userProfile.phone}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={userProfile.location}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Receive email updates about your listings and messages</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                          <p className="text-sm text-gray-600">Receive text messages for urgent updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
                    <div className="space-y-4">
                      <button className="w-full md:w-auto bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                        Change Password
                      </button>
                      <button className="w-full md:w-auto bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors ml-0 md:ml-4">
                        Deactivate Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;