import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export const listingService = {
  // Submit new listing with validation
  async submitListing(listingData, images) {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('You must be logged in to post a listing')

      // Validate listing data
      const validationResult = this.validateListingData(listingData)
      if (!validationResult.isValid) {
        throw new Error(validationResult.errors.join(', '))
      }

      // Upload images
      const uploadedImages = await this.uploadImages(images, user.id)

      // First create the vehicle
      const { data: vehicle, error: vehicleError } = await supabase
        .from('vehicles')
        .insert([
          {
            user_id: user.id,
            category: listingData.vehicleType === 'car' ? 'voitures' : 'motos',
            brand: listingData.brand,
            model: listingData.model,
            year: parseInt(listingData.year),
            mileage: parseInt(listingData.mileage),
            price: parseFloat(listingData.price),
            condition: this.mapCondition(listingData.condition),
            fuel_type: this.mapFuelType(listingData.fuelType),
            transmission: this.mapTransmission(listingData.transmission),
            color: listingData.color,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()

      if (vehicleError) throw vehicleError

      // Then create the listing
      const { data: listing, error: listingError } = await supabase
        .from('listings')
        .insert([
          {
            vehicle_id: vehicle[0].id,
            user_id: user.id,
            title: listingData.title,
            description: listingData.description,
            status: 'pending',
            location: listingData.location,
            contact_name: listingData.contactName,
            contact_phone: listingData.phone,
            contact_email: listingData.email,
            is_negotiable: true,
            test_drive_available: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()

      if (listingError) throw listingError

      // Create photo records
      if (uploadedImages.length > 0) {
        const photoRecords = uploadedImages.map((url, index) => ({
          listing_id: listing[0].id,
          user_id: user.id,
          storage_path: url,
          position: index
        }))

        await supabase
          .from('photos')
          .insert(photoRecords)
      }

      return {
        success: true,
        message: 'Listing submitted successfully! It will be reviewed before going live.',
        listing: listing[0]
      }
    } catch (error) {
      console.error('Submit listing error:', error)
      throw error
    }
  },

  // Map condition values to enum
  mapCondition(condition) {
    const conditionMap = {
      'excellent': 'excellent',
      'good': 'bon',
      'fair': 'correct',
      'poor': 'a-renover'
    }
    return conditionMap[condition] || 'bon'
  },

  // Map fuel type to enum
  mapFuelType(fuelType) {
    const fuelMap = {
      'gasoline': 'essence',
      'diesel': 'diesel',
      'electric': 'electrique',
      'hybrid': 'hybride'
    }
    return fuelMap[fuelType] || 'essence'
  },

  // Map transmission to enum
  mapTransmission(transmission) {
    const transmissionMap = {
      'manual': 'manuelle',
      'automatic': 'automatique',
      'cvt': 'cvt'
    }
    return transmissionMap[transmission] || 'manuelle'
  },

  // Validate listing data
  validateListingData(data) {
    const errors = []

    // Required fields
    if (!data.title || data.title.trim().length < 10) {
      errors.push('Title must be at least 10 characters long')
    }
    if (!data.description || data.description.trim().length < 50) {
      errors.push('Description must be at least 50 characters long')
    }
    if (!data.vehicleType) {
      errors.push('Vehicle type is required')
    }
    if (!data.brand || data.brand.trim().length < 2) {
      errors.push('Brand is required')
    }
    if (!data.model || data.model.trim().length < 2) {
      errors.push('Model is required')
    }
    if (!data.year || data.year < 1900 || data.year > new Date().getFullYear() + 1) {
      errors.push('Please enter a valid year')
    }
    if (!data.mileage || data.mileage < 0) {
      errors.push('Please enter a valid mileage')
    }
    if (!data.price || data.price <= 0) {
      errors.push('Please enter a valid price')
    }
    if (!data.condition) {
      errors.push('Vehicle condition is required')
    }
    if (!data.location || data.location.trim().length < 3) {
      errors.push('Location is required')
    }
    if (!data.contactName || data.contactName.trim().length < 2) {
      errors.push('Contact name is required')
    }
    if (!data.phone || !this.validatePhone(data.phone)) {
      errors.push('Please enter a valid phone number')
    }
    if (!data.email || !this.validateEmail(data.email)) {
      errors.push('Please enter a valid email address')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // Upload images
  async uploadImages(images, userId) {
    try {
      const uploadedUrls = []

      for (let i = 0; i < images.length; i++) {
        const image = images[i]
        const fileExt = image.file.name.split('.').pop()
        const fileName = `${userId}/${Date.now()}_${i}.${fileExt}`

        const { data, error } = await supabase.storage
          .from('listing-images')
          .upload(fileName, image.file)

        if (error) throw error

        const { data: { publicUrl } } = supabase.storage
          .from('listing-images')
          .getPublicUrl(fileName)

        uploadedUrls.push(publicUrl)
      }

      return uploadedUrls
    } catch (error) {
      console.error('Image upload error:', error)
      throw error
    }
  },

  // Get listings with filters
  async getListings(filters = {}) {
    try {
      let query = supabase
        .from('listings')
        .select(`
          *,
          profiles (
            full_name,
            is_verified
          ),
          vehicles (
            *
          ),
          photos (
            storage_path,
            position
          )
        `)
        .eq('status', 'active')

      // Apply filters
      if (filters.vehicleType) {
        const category = filters.vehicleType === 'car' ? 'voitures' : 'motos'
        query = query.eq('vehicles.category', category)
      }

      if (filters.minPrice) {
        query = query.gte('vehicles.price', filters.minPrice)
      }

      if (filters.maxPrice) {
        query = query.lte('vehicles.price', filters.maxPrice)
      }

      if (filters.brand) {
        query = query.ilike('vehicles.brand', `%${filters.brand}%`)
      }

      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`)
      }

      // Sort by created_at desc
      query = query.order('created_at', { ascending: false })

      const { data, error } = await query

      if (error) throw error

      return { success: true, listings: data }
    } catch (error) {
      console.error('Get listings error:', error)
      throw error
    }
  },

  // Get single listing
  async getListing(id) {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          profiles (
            full_name,
            phone,
            is_verified,
            created_at
          ),
          vehicles (
            *
          ),
          photos (
            storage_path,
            position
          )
        `)
        .eq('id', id)
        .eq('status', 'active')
        .single()

      if (error) throw error

      // Increment view count
      await supabase.rpc('increment_view_count', { listing_id: id })

      return { success: true, listing: data }
    } catch (error) {
      console.error('Get listing error:', error)
      throw error
    }
  },

  // Helper functions
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  validatePhone(phone) {
    const phoneRegex = /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/
    return phoneRegex.test(phone)
  }
}