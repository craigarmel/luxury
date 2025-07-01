import Link from 'next/link'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'

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
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
      {/* Image */}
      <div className="h-64 bg-gray-300 dark:bg-dark-700 relative overflow-hidden">
        {property.badge && (
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium z-10 ${
            property.badge.type === 'white' 
              ? 'bg-white text-gray-900' 
              : 'bg-gradient-to-r from-primary-500 to-gold-500 text-white'
          }`}>
            {property.badge.text}
          </div>
        )}
        
        {/* Placeholder image */}
        <div className="w-full h-full bg-gray-200 dark:bg-dark-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
          <div className="text-gray-400 dark:text-dark-400 text-sm font-medium">
            {property.title}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">{property.location}</p>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-gold-500 fill-current" />
            <span className="text-sm font-medium ml-1 text-gray-900 dark:text-white">{property.rating}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-serif font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {property.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {property.description}
        </p>
        
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            <span className="gradient-text">{formatPrice(property.price)}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-normal"> / night</span>
          </p>
          
          <Link href={`/properties/${property.id}`}>
            <Button 
              variant="outline" 
              size="sm"
              className="border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-400 dark:hover:text-white transition-all duration-300"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}