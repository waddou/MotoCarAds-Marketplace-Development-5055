import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../components/common/SafeIcon'
import toast from 'react-hot-toast'

const { FiHome, FiUsers, FiFileText, FiBarChart3, FiSettings, FiShield, FiLogOut, FiCheck, FiX } = FiIcons

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  const adminTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'users', label: 'Users', icon: FiUsers },
    { id: 'listings', label: 'Listings', icon: FiFileText },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart3 },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ]

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (user) {
        // Check if user has admin role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (profile?.role === 'admin' || user.email === 'admin@motocarads.com') {
          setUser(user)
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }
      } else {
        setIsAuthorized(false)
      }
    } catch (error) {
      console.error('Admin access check failed:', error)
      setIsAuthorized(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const signInAsDemo = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin@autotrader.com',
        password: 'admin123'
      })

      if (error) {
  if (error.message.includes('Invalid login credentials')) {
    // Account doesn't exist, attempt to create it
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: 'admin@motocarads.com',
      password: 'admin123456',
      options: {
        data: {
          full_name: 'Admin User',
          username: 'admin'
        }
      }
    });

    if (signupError) {
      console.error('Signup failed:', signupError.message);
      // Add more specific error handling here based on signupError.message or signupError.code
      if (signupError.message.includes('email_address_invalid')) {
        console.error('Reason: The email address provided is invalid or restricted by Supabase settings.');
        // Display a user-friendly message about email restrictions
      } else if (signupError.message.includes('User already registered')) {
        console.error('Reason: A user with this email address already exists.');
        // Handle case where user already exists but login failed for other reasons
      }
      // ... other signup error types
    } else if (signupData.user) {
      console.log('Admin user signed up successfully:', signupData.user);
      // Handle successful signup (e.g., redirect, show success message)
    } else {
      // This case might occur if signup was initiated but requires email confirmation
      console.log('Signup initiated, confirmation required:', signupData);
    }
  } else {
    console.error('Login failed for an unexpected reason:', error.message);
    // Handle other types of login errors
  }
}

          // Wait a moment for the profile to be created by the trigger
          await new Promise(resolve => setTimeout(resolve, 1000))

          // Update the profile to admin role
          await supabase
            .from('profiles')
            .update({ role: 'admin' })
            .eq('email', 'admin@motocarads.com')

          toast.success('Admin account created and signed in!')
        } else {
          throw error
        }
      } else {
        // Check if user has admin role, if not set it
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()

        if (profile?.role !== 'admin') {
          await supabase
            .from('profiles')
            .update({ role: 'admin' })
            .eq('id', data.user.id)
        }

        toast.success('Signed in as admin!')
      }

      checkAdminAccess()
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error('Failed to sign in: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center"
        >
          <SafeIcon icon={FiShield} className="h-16 w-16 text-primary-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h1>
          <p className="text-gray-600 mb-6">
            Please sign in with admin credentials to access the admin panel.
          </p>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={signInAsDemo}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Sign In as Admin
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Go to Homepage
            </motion.button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Demo Credentials:</strong><br />
              Email: admin@motocarads.com<br />
              Password: admin123456
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-600">MotoCarAds</p>
          </div>

          <nav className="p-4">
            <div className="space-y-2">
              {adminTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600">
                <SafeIcon icon={FiUsers} className="h-4 w-4" />
                <span>Logged in as:</span>
              </div>
              <div className="px-4 py-2">
                <p className="font-medium text-gray-900">{user?.user_metadata?.full_name || 'Admin User'}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full mt-4 flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiLogOut} className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <AdminDashboard />}
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'listings' && <ListingManagement />}
            {activeTab === 'analytics' && <AdminAnalytics />}
            {activeTab === 'settings' && <AdminSettings />}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Admin Dashboard Component
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    pendingListings: 0,
    activeListings: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [usersResult, listingsResult] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('listings').select('*')
      ])

      const users = usersResult.data || []
      const listings = listingsResult.data || []

      setStats({
        totalUsers: users.length,
        totalListings: listings.length,
        pendingListings: listings.filter(l => l.status === 'pending').length,
        activeListings: listings.filter(l => l.status === 'active').length
      })
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: FiUsers, color: 'bg-blue-500', change: '+12%' },
    { title: 'Active Listings', value: stats.activeListings, icon: FiFileText, color: 'bg-green-500', change: '+8%' },
    { title: 'Pending Review', value: stats.pendingListings, icon: FiShield, color: 'bg-yellow-500', change: '-5%' },
    { title: 'Total Listings', value: stats.totalListings, icon: FiBarChart3, color: 'bg-purple-500', change: '+15%' }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Platform overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <SafeIcon icon={stat.icon} className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm font-medium text-green-600">
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
            <SafeIcon icon={FiCheck} className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-primary-600">Review Listings</div>
          </button>
          <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <SafeIcon icon={FiUsers} className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-blue-600">Verify Users</div>
          </button>
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <SafeIcon icon={FiBarChart3} className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-green-600">View Analytics</div>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <SafeIcon icon={FiSettings} className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-purple-600">Manage Settings</div>
          </button>
        </div>
      </div>
    </div>
  )
}

// User Management Component
const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Failed to load users:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <SafeIcon icon={FiUsers} className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.full_name || user.username || 'Unknown'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.is_verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {users.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiUsers} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Users will appear here when they sign up</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Listing Management Component
const ListingManagement = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadListings()
  }, [])

  const loadListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          profiles (
            full_name,
            email
          ),
          vehicles (
            brand,
            model,
            year,
            price
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setListings(data || [])
    } catch (error) {
      console.error('Failed to load listings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Listing Management</h2>
      
      {listings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <SafeIcon icon={FiFileText} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings found</h3>
          <p className="text-gray-600">Listings will appear here when users post them</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{listing.title}</h3>
                <div className="text-xl font-bold text-primary-600 mb-2">
                  €{listing.vehicles?.price?.toLocaleString()}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    listing.status === 'active' ? 'bg-green-100 text-green-800' : 
                    listing.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {listing.status}
                  </span>
                  <div className="text-sm text-gray-500">
                    {listing.profiles?.full_name || 'Unknown'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Analytics Component
const AdminAnalytics = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Overview</h3>
        <div className="text-3xl font-bold text-primary-600 mb-2">12,345</div>
        <p className="text-sm text-gray-600">Monthly visitors</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue</h3>
        <div className="text-3xl font-bold text-green-600 mb-2">€45,678</div>
        <p className="text-sm text-gray-600">This month</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Rate</h3>
        <div className="text-3xl font-bold text-blue-600 mb-2">3.2%</div>
        <p className="text-sm text-gray-600">Listing to sale</p>
      </div>
    </div>
  </div>
)

// Settings Component
const AdminSettings = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Configuration</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Auto-approve listings</h4>
            <p className="text-sm text-gray-600">Automatically approve listings that pass validation</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Email notifications</h4>
            <p className="text-sm text-gray-600">Send email alerts for new listings</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
)

export default AdminPage
