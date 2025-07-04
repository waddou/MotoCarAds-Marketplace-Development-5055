import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { adminService } from '../../services/adminService'
import toast from 'react-hot-toast'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'

const { FiCheck, FiX, FiEdit, FiEye, FiFlag, FiUser, FiClock } = FiIcons

const ModerationDashboard = () => {
  const [pendingListings, setPendingListings] = useState([])
  const [pendingUsers, setPendingUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('listings')

  useEffect(() => {
    loadPendingItems()
  }, [])

  const loadPendingItems = async () => {
    try {
      const [listingsResult, usersResult] = await Promise.all([
        adminService.getPendingListings(),
        adminService.getPendingUsers()
      ])

      setPendingListings(listingsResult.listings || [])
      setPendingUsers(usersResult.users || [])
    } catch (error) {
      toast.error('Failed to load pending items')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveListing = async (listingId) => {
    try {
      await adminService.approveListing(listingId)
      toast.success('Listing approved successfully')
      loadPendingItems()
    } catch (error) {
      toast.error('Failed to approve listing')
    }
  }

  const handleRejectListing = async (listingId, reason) => {
    try {
      await adminService.rejectListing(listingId, reason)
      toast.success('Listing rejected')
      loadPendingItems()
    } catch (error) {
      toast.error('Failed to reject listing')
    }
  }

  const handleVerifyUser = async (userId) => {
    try {
      await adminService.verifyUser(userId)
      toast.success('User verified successfully')
      loadPendingItems()
    } catch (error) {
      toast.error('Failed to verify user')
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Moderation Dashboard</h1>
        <p className="text-gray-600">Review and moderate listings and user accounts</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('listings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'listings'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Pending Listings ({pendingListings.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Pending Users ({pendingUsers.length})
          </button>
        </nav>
      </div>

      {/* Listings Tab */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          {pendingListings.length === 0 ? (
            <div className="text-center py-12">
              <SafeIcon icon={FiCheck} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending listings</h3>
              <p className="text-gray-600">All listings have been reviewed</p>
            </div>
          ) : (
            pendingListings.map((listing) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/3">
                    <img
                      src={listing.images?.[0] || '/api/placeholder/400/300'}
                      alt={listing.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="lg:w-2/3">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {listing.title}
                        </h3>
                        <div className="text-2xl font-bold text-primary-600 mb-2">
                          {formatPrice(listing.price)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{listing.year} • {listing.brand} {listing.model}</span>
                          <span>{listing.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          listing.moderation_status === 'flagged'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {listing.moderation_status}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-500 text-xs mt-2">
                          <SafeIcon icon={FiClock} className="h-3 w-3" />
                          <span>{new Date(listing.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {listing.description}
                    </p>

                    {listing.moderation_flags?.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <SafeIcon icon={FiFlag} className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium text-red-800">Moderation Flags:</span>
                        </div>
                        <ul className="text-sm text-red-700 space-y-1">
                          {listing.moderation_flags.map((flag, index) => (
                            <li key={index}>• {flag}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <SafeIcon icon={FiUser} className="h-4 w-4" />
                        <span>
                          {listing.profiles_mca2024?.full_name}
                          {listing.profiles_mca2024?.is_verified && (
                            <span className="ml-1 text-green-600">✓</span>
                          )}
                        </span>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleRejectListing(listing.id, 'Violates content policy')}
                          className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-2"
                        >
                          <SafeIcon icon={FiX} className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                        
                        <button
                          onClick={() => handleApproveListing(listing.id)}
                          className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors flex items-center space-x-2"
                        >
                          <SafeIcon icon={FiCheck} className="h-4 w-4" />
                          <span>Approve</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {pendingUsers.length === 0 ? (
            <div className="text-center py-12">
              <SafeIcon icon={FiUser} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending users</h3>
              <p className="text-gray-600">All users have been verified</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingUsers.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <SafeIcon icon={FiUser} className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{user.full_name}</h3>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span>{user.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Joined:</span>
                      <span>{new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleVerifyUser(user.id)}
                    className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiCheck} className="h-4 w-4" />
                    <span>Verify User</span>
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ModerationDashboard