import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export const authService = {
  // User registration
  async signUp(userData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.fullName,
            username: userData.fullName.toLowerCase().replace(/\s+/g, ''),
            phone: userData.phone,
            location: userData.location
          }
        }
      })

      if (error) throw error

      return {
        success: true,
        message: 'Account created successfully!',
        user: data.user
      }
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  },

  // User login
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      return {
        success: true,
        message: 'Signed in successfully!',
        user: data.user
      }
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      return {
        success: true,
        message: 'Signed out successfully!'
      }
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }
}