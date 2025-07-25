import { create } from 'zustand'
import axios from 'axios'
import {
    Property,
    PropertyType,
    RoomType,
    PropertyLocation,
    PropertyCapacity,
    PropertyPricing,
    PropertyAvailability,
    HouseRules,
    PropertyStatus,
    VerificationStatus,
    PropertyStats,
    SeasonalPricing,
    PropertyImage
} from '@/types/Property'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface SearchFilters {
    destination: string
    checkIn: string
    checkOut: string
    guests: number
    priceRange: [number, number]
    amenities: string[]
    propertyType?: PropertyType
    roomType?: RoomType
    location?: Partial<PropertyLocation>
}

interface PropertyState {
    property: Property | null
    properties: Property[]
    featuredProperties: Property[]
    searchResults: Property[]
    currentProperty: Property | null
    isLoading: boolean
    searchFilters: SearchFilters

    setProperties: (properties: Property[]) => void
    setFeaturedProperties: (properties: Property[]) => void
    setCurrentProperty: (property: Property | null) => void
    setSearchResults: (results: Property[]) => void
    setSearchFilters: (filters: Partial<SearchFilters>) => void
    fetchProperties: () => Promise<void>
    fetchMyProperties: () => Promise<void>
    searchProperties: () => Promise<void>
    getPropertyById: (id: string) => Promise<Property | null>
    createProperty: (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>

    // Additional methods for improved property management
    updatePropertyCapacity: (id: string, capacity: PropertyCapacity) => Promise<void>
    updatePropertyPricing: (id: string, pricing: PropertyPricing) => Promise<void>
    updatePropertyAvailability: (id: string, availability: PropertyAvailability) => Promise<void>
    updateHouseRules: (id: string, rules: HouseRules) => Promise<void>
    updatePropertyStatus: (id: string, status: PropertyStatus) => Promise<void>
    updateVerificationStatus: (id: string, status: VerificationStatus) => Promise<void>
    updatePropertyStats: (id: string, stats: PropertyStats) => Promise<void>
    updateSeasonalPricing: (id: string, seasonalPricing: SeasonalPricing[]) => Promise<void>
    addPropertyImage: (id: string, images: PropertyImage[]) => Promise<void>
    removePropertyImage: (id: string, imageId: string) => Promise<void>
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
    property: null,
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

    fetchProperties: async () => {
        set({ isLoading: true })
        try {
            const res = await axios.get<Property[]>(`${API_BASE_URL}/properties `, { withCredentials: true })
            set({ properties: res.data, isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.error(error)
        }
    },

    fetchMyProperties: async () => {
        set({ isLoading: true })
        try {
            const res = await axios.get<Property[]>(`${API_BASE_URL}/properties/my-properties`, { withCredentials: true })
            set({ properties: res.data, isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.error(error)
        }
    },

    searchProperties: async () => {
        set({ isLoading: true })
        try {
            const { searchFilters } = get()
            const params: Record<string, string | number | undefined> = {
                destination: searchFilters.destination,
                checkIn: searchFilters.checkIn,
                checkOut: searchFilters.checkOut,
                guests: searchFilters.guests,
                minPrice: searchFilters.priceRange[0],
                maxPrice: searchFilters.priceRange[1],
                amenities: searchFilters.amenities.join(',')
            }
            if (searchFilters.propertyType) params.propertyType = searchFilters.propertyType
            if (searchFilters.roomType) params.roomType = searchFilters.roomType
            if (searchFilters.location?.city) params.city = searchFilters.location.city
            if (searchFilters.location?.country) params.country = searchFilters.location.country

            const res = await axios.get<Property[]>(`${API_BASE_URL}`, { params })
            set({ searchResults: res.data, isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.error(error)
        }
    },

    getPropertyById: async (id) => {
        set({ isLoading: true, currentProperty: null });
        
        try {
            // Use your Next.js API route instead of external API
            const res = await axios.get(`${API_BASE_URL}/properties/${id}`);
            
            if (!res.data) {
                console.warn('Store: No property found for ID:', id);
                set({ isLoading: false, currentProperty: null });
                return null;
            }
            set({ 
            currentProperty: res.data, 
            isLoading: false 
            });
            
            return res.data;
        } catch (error) {
            console.error('Store: Error fetching property:', error);
            set({ isLoading: false, currentProperty: null });

            // Log more details about the error
            if (axios.isAxiosError(error)) {
            console.error('Store: Axios error details:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            }

            throw error; // Re-throw to be caught by the component
  }
},

    createProperty: async (propertyData) => {
        set({ isLoading: true })
        try {
            const res = await axios.post<Property>(`${API_BASE_URL}/properties`, propertyData, { withCredentials: true })
            set((state) => ({
                properties: [...state.properties, res.data],
                isLoading: false
            }))
        } catch (error) {
            set({ isLoading: false })
            console.error(error)
        }
    },

    // Improved methods for property details

    updatePropertyCapacity: async (id, capacity) => {
        set({ isLoading: true })
        try {
            await axios.patch(`${API_BASE_URL}/properties/${id}/capacity`, capacity, { withCredentials: true })
            await get().fetchProperties()
            set({ isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.error(error)
        }
    },

    updatePropertyPricing: async (id, pricing) => {
        set({ isLoading: true })
        try {
            await axios.patch(`${API_BASE_URL}/properties/${id}/pricing`, pricing, { withCredentials: true })
            await get().fetchProperties()
            set({ isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.error(error)
        }
    },

    updatePropertyAvailability: async (id, availability) => {
        set({ isLoading: true })
        try {
            await axios.patch(`${API_BASE_URL}/properties/${id}/availability`, availability, { withCredentials: true })
            await get().fetchProperties()
            set({ isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.error(error)
        }
    },

    updateHouseRules: async (id, rules) => {
        set({ isLoading: true })
        try {
            await axios.patch(`${API_BASE_URL}/properties/${id}/house-rules`, rules, { withCredentials: true })
            await get().fetchProperties()
            set({ isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.error(error)
        }
    },

    updatePropertyStatus: async (id, status) => {
        set({ isLoading: true })
        try {
            await axios.patch(`${API_BASE_URL}/properties/${id}/status`, { status }, { withCredentials: true })
            await get().fetchProperties()
            set({ isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.error(error)
        }
    },

    updateVerificationStatus: async (id, status) => {
        set({ isLoading: true })
        try {
            await axios.patch(`${API_BASE_URL}/properties/${id}/verification-status`, { status }, { withCredentials: true })
            await get().fetchProperties()
            set({ isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.error(error)
        }
    },

    updatePropertyStats: async (id, stats) => {
        set({ isLoading: true })
        try {
            await axios.patch(`${API_BASE_URL}/properties/${id}/stats`, stats, { withCredentials: true })
            await get().fetchProperties()
            set({ isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.error(error)
        }
    },

    updateSeasonalPricing: async (id, seasonalPricing) => {
        set({ isLoading: true })
        try {
            await axios.patch(`${API_BASE_URL}/properties/${id}/seasonal-pricing`, { seasonalPricing }, { withCredentials: true })
            await get().fetchProperties()
            set({ isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.error(error)
        }
    },

    addPropertyImage: async (id, images) => {
        set({ isLoading: true })
        try {
            await axios.post(`${API_BASE_URL}/properties/${id}/images`, { images }, { withCredentials: true })
            await get().fetchProperties()
            set({ isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.error(error)
        }
    },

    removePropertyImage: async (id, imageId) => {
        set({ isLoading: true })
        try {
            await axios.delete(`${API_BASE_URL}/properties/${id}/images/${imageId}`, { withCredentials: true })
            await get().fetchProperties()
            set({ isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.error(error)
        }
    }
}))
