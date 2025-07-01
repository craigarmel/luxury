export interface Property {
  id: string
  title: string
  description: string
  location: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  price: number
  currency: string
  rating: number
  reviewCount: number
  images: PropertyImage[]
  amenities: string[]
  bedrooms: number
  bathrooms: number
  maxGuests: number
  propertyType: PropertyType
  host: {
    id: string
    name: string
    avatar?: string
    isVerified: boolean
  }
  availability: DateRange[]
  policies: {
    checkIn: string
    checkOut: string
    cancellation: string
    houseRules: string[]
  }
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export interface PropertyImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
}

export enum PropertyType {
  VILLA = 'villa',
  APARTMENT = 'apartment',
  HOUSE = 'house',
  CHALET = 'chalet',
  PENTHOUSE = 'penthouse',
  CABIN = 'cabin'
}

export interface SearchFilters {
  destination?: string
  checkIn?: string
  checkOut?: string
  guests?: number
  bedrooms?: number
  bathrooms?: number
  priceRange?: [number, number]
  propertyType?: PropertyType[]
  amenities?: string[]
  rating?: number
}

export interface DateRange {
  start: string
  end: string
}