import { create } from 'zustand'

interface Property {
  id: string
  title: string
  description: string
  location: string
  price: number
  rating: number
  images: string[]
  amenities: string[]
  bedrooms: number
  bathrooms: number
  maxGuests: number
  hostId: string
  createdAt: string
  updatedAt: string
}

interface PropertyState {
  properties: Property[]
  featuredProperties: Property[]
  searchResults: Property[]
  currentProperty: Property | null
  isLoading: boolean
  searchFilters: {
    destination: string
    checkIn: string
    checkOut: string
    guests: number
    priceRange: [number, number]
    amenities: string[]
  }
  
  // Actions
  setProperties: (properties: Property[]) => void
  setFeaturedProperties: (properties: Property[]) => void
  setCurrentProperty: (property: Property | null) => void
  setSearchResults: (results: Property[]) => void
  setSearchFilters: (filters: Partial<PropertyState['searchFilters']>) => void
  searchProperties: () => Promise<void>
  getPropertyById: (id: string) => Promise<Property | null>
  createProperty: (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  featuredProperties: [],
  searchResults: [],
  currentProperty: null,
  isLoading: false,
  searchFilters: {
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    priceRange: [0, 10000],
    amenities: []
  },

  setProperties: (properties) => set({ properties }),
  setFeaturedProperties: (properties) => set({ featuredProperties: properties }),
  setCurrentProperty: (property) => set({ currentProperty: property }),
  setSearchResults: (results) => set({ searchResults: results }),
  setSearchFilters: (filters) => set((state) => ({ 
    searchFilters: { ...state.searchFilters, ...filters } 
  })),

  searchProperties: async () => {
    set({ isLoading: true })
    try {
      const { searchFilters } = get()
      // Simulation d'appel API
      console.log('Searching with filters:', searchFilters)
      
      // Ici vous feriez l'appel à votre API
      // const results = await propertyAPI.search(searchFilters)
      
      set({ searchResults: [], isLoading: false })
    } catch (error) {
      console.error('Search failed:', error)
      set({ isLoading: false })
    }
  },

  getPropertyById: async (id) => {
    set({ isLoading: true })
    try {
      // const property = await propertyAPI.getById(id)
      // set({ currentProperty: property, isLoading: false })
      // return property
      
      set({ isLoading: false })
      return null
    } catch (error) {
      console.error('Failed to get property:', error)
      set({ isLoading: false })
      return null
    }
  },

  createProperty: async (propertyData) => {
    set({ isLoading: true })
    try {
      // const newProperty = await propertyAPI.create(propertyData)
      // const { properties } = get()
      // set({ 
      //   properties: [...properties, newProperty],
      //   isLoading: false 
      // })
      
      console.log('Creating property:', propertyData)
      set({ isLoading: false })
    } catch (error) {
      console.error('Failed to create property:', error)
      set({ isLoading: false })
    }
  }
}))