import { supabase } from '../lib/supabase'

export const adminService = {
  // Check if user has admin privileges
  async checkAdminStatus(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data?.role === 'admin'
    } catch (error) {
      console.error('Check admin status error:', error)
      return false
    }
  },

  // Get admin dashboard stats
  async getAdminStats() {
    try {
      const [usersResult, listingsResult] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('listings').select('*')
      ])

      const users = usersResult.data || []
      const listings = listingsResult.data || []

      return {
        totalUsers: users.length,
        verifiedUsers: users.filter(u => u.is_verified).length,
        pendingUsers: users.filter(u => !u.is_verified).length,
        totalListings: listings.length,
        activeListings: listings.filter(l => l.status === 'active').length,
        pendingListings: listings.filter(l => l.status === 'pending').length,
        totalViews: listings.reduce((sum, listing) => sum + (listing.view_count || 0), 0),
        monthlyRevenue: 45678 // This would come from payment processing
      }
    } catch (error) {
      console.error('Get admin stats error:', error)
      throw error
    }
  },

  // Get all users for management
  async getAllUsers() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { success: true, users: data }
    } catch (error) {
      console.error('Get all users error:', error)
      throw error
    }
  },

  // Get all listings for management
  async getAllListings() {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          profiles (
            full_name,
            email,
            is_verified
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
      return { success: true, listings: data }
    } catch (error) {
      console.error('Get all listings error:', error)
      throw error
    }
  },

  // Delete listing
  async deleteListing(listingId) {
    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', listingId)

      if (error) throw error
      return { success: true, message: 'Listing deleted successfully' }
    } catch (error) {
      console.error('Delete listing error:', error)
      throw error
    }
  },

  // Suspend user
  async suspendUser(userId) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          is_verified: false,
          updated_at: new Date().toISOString() 
        })
        .eq('id', userId)

      if (error) throw error
      return { success: true, message: 'User suspended successfully' }
    } catch (error) {
      console.error('Suspend user error:', error)
      throw error
    }
  },

  // Get pending listings for review
  async getPendingListings() {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          profiles (
            full_name,
            email,
            is_verified
          ),
          vehicles (
            brand,
            model,
            year,
            price
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: true })

      if (error) throw error
      return { success: true, listings: data }
    } catch (error) {
      console.error('Get pending listings error:', error)
      throw error
    }
  },

  // Approve listing
  async approveListing(listingId, modifications = {}) {
    try {
      const updateData = {
        status: 'active',
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('listings')
        .update(updateData)
        .eq('id', listingId)

      if (error) throw error
      return { success: true, message: 'Listing approved successfully' }
    } catch (error) {
      console.error('Approve listing error:', error)
      throw error
    }
  },

  // Reject listing
  async rejectListing(listingId, reason) {
    try {
      const { error } = await supabase
        .from('listings')
        .update({
          status: 'expired',
          updated_at: new Date().toISOString()
        })
        .eq('id', listingId)

      if (error) throw error
      return { success: true, message: 'Listing rejected' }
    } catch (error) {
      console.error('Reject listing error:', error)
      throw error
    }
  },

  // Get user profiles for verification
  async getPendingUsers() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_verified', false)
        .order('created_at', { ascending: true })

      if (error) throw error
      return { success: true, users: data }
    } catch (error) {
      console.error('Get pending users error:', error)
      throw error
    }
  },

  // Verify user
  async verifyUser(userId) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          is_verified: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (error) throw error
      return { success: true, message: 'User verified successfully' }
    } catch (error) {
      console.error('Verify user error:', error)
      throw error
    }
  }
}