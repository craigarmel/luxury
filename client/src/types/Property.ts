import { JSX } from "react"

export interface Property {
  type: PropertyType
  _id: string
  hostId: string
  host?: string
  title: string
  description: string
  propertyType: PropertyType
  roomType: RoomType
  location: PropertyLocation
  capacity: PropertyCapacity
  amenities: Array<string>
  images: PropertyImage[]
  highlights?: { icon: JSX.Element; title: string; desc: string }[]
  reviews?: { user: string; date: string; content: string }[]
  pricing: PropertyPricing
  availability: PropertyAvailability
  houseRules: HouseRules
  status: PropertyStatus
  verificationStatus: VerificationStatus
  featuredUntil?: string
  checkInDate?: string
  checkOutDate?: string
  stats: PropertyStats
  badge?: PropertyBadge
  createdAt: string
  updatedAt: string
}

export interface PropertyBadge {
  type: 'gold' | 'white'
  text: string
}
export interface PropertyLocation {
  address: string
  city: string
  state: string
  country: string
  zipCode: string
  neighborhood?: string
  coordinates: {
    latitude: number
    longitude: number
  }
  isExactLocation: boolean
}

export interface PropertyCapacity {
  guests: number
  bedrooms: number
  beds: number
  bathrooms: number
}

export interface PropertyImage {
  showButton: JSX.Element
  url: string
  caption: string
  isPrimary: boolean
  order: number
}

export interface PropertyPricing {
  basePrice: number
  currency: string
  cleaningFee: number
  serviceFee: number
  securityDeposit: number
  extraGuestFee: number
  weeklyDiscount?: number
  monthlyDiscount?: number
  seasonalPricing?: SeasonalPricing[]
}

export interface SeasonalPricing {
  startDate: string
  endDate: string
  price: number
  name?: string
}

export interface PropertyAvailability {
  minStay: number
  maxStay: number
  advanceNotice: number
  preparationTime: number
  checkInTime: {
    from: string
    to: string
  }
  checkOutTime: string
  instantBook: boolean
}

export interface HouseRules {
  smokingAllowed: boolean
  petsAllowed: boolean
  partiesAllowed: boolean
  quietHours?: {
    from: string
    to: string
  }
  additionalRules?: string[]
}

export type PropertyStatus = 'active' | 'inactive'
export type VerificationStatus = 'pending' | 'approved' | 'rejected'

export interface PropertyStats {
  totalBookings: number
  rating: PropertyRating
  viewCount: number
}

export interface PropertyRating {
  overall: number
  cleanliness: number
  accuracy: number
  communication: number
  location: number
  checkIn: number
  value: number
  reviewCount: number
}

export enum PropertyType {
  VILLA = 'villa',
  APARTMENT = 'apartment',
  HOUSE = 'house',
  CHALET = 'chalet',
  PENTHOUSE = 'penthouse',
  CABIN = 'cabin'
}

export enum RoomType {
  ENTIRE_PLACE = 'entire_place',
  PRIVATE_ROOM = 'private_room',
  SHARED_ROOM = 'shared_room'
}