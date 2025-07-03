'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { useTheme } from '@/components/providers/ThemeProvider' // Assuming @/components/providers/ThemeProvider is used

interface PropertyCardProps {
  property: {
    id: string
    title: string
    location: string
    price: number
    rating: number
    image: string
    description: string
    badge?: {
      text: string
      type: 'white' | 'gold'
    }
  }
}

export function PropertyCard({ property }: PropertyCardProps) {
  const themeContext = useTheme()
  const theme = themeContext?.theme ?? 'light'

  const isDark = theme === 'dark'

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group
        ${isDark ? 'ziggla-bg-primary' : 'bg-white'}
      `}
    >
      {/* Image */}
      <div className={`h-64 relative overflow-hidden ${isDark ? 'bg-dark-700' : 'bg-gray-300'}`}>
        {property.badge && (
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium z-10 ${
            property.badge.type === 'white' 
              ? isDark 
                ? 'bg-white text-gray-900'
                : 'bg-white text-gray-900'
              : 'bg-gradient-to-r from-primary-500 to-gold-500 text-white'
          }`}>
            {property.badge.text}
          </div>
        )}
        
        {/* Placeholder image */}
        <div className={`w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700 ${
          isDark ? 'bg-dark-600' : 'bg-gray-200'
        }`}>
          <div className={`text-sm font-medium ${isDark ? 'text-dark-400' : 'text-gray-400'}`}>
            {property.title}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{property.location}</p>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-gold fill-current" />
            <span className={`text-sm font-medium ml-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{property.rating}</span>
          </div>
        </div>
        
        <h3 className={`text-xl font-serif font-bold mb-2 transition-colors ${
          isDark
            ? 'text-white group-hover:text-primary-400'
            : 'text-gray-900 group-hover:text-primary-600'
        }`}>
          {property.title}
        </h3>
        
        <p className={`mb-4 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {property.description}
        </p>
        
        <div className="flex justify-between items-center">
          <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="gradient-text">{formatPrice(property.price)}</span>
            <span className={`text-sm font-normal ${isDark ? 'text-gray-400' : 'text-gray-500'}`}> / night</span>
          </p>
          
          <Link href={`/properties/${property.id}`}>
            <Button 
              variant="outline" 
              size="sm"
              color={isDark ? 'ziggla-secondary' : 'secondary'}
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}