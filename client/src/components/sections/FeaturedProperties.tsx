import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PropertyCard } from '@/components/features/PropertyCard'

const featuredProperties = [
  {
    id: '1',
    title: 'Oceanfront Luxury Villa',
    location: 'Maldives',
    price: 1200,
    rating: 4.98,
    image: '/api/placeholder/400/300',
    description: 'Private beachfront villa with infinity pool and personal butler service.',
    badge: { text: 'Featured', type: 'white' as const }
  },
  {
    id: '2',
    title: 'Alpine Luxury Chalet',
    location: 'Swiss Alps',
    price: 950,
    rating: 4.92,
    image: '/api/placeholder/400/300',
    description: 'Ski-in/ski-out chalet with panoramic mountain views and private hot tub.',
  },
  {
    id: '3',
    title: 'Manhattan Penthouse',
    location: 'New York',
    price: 1500,
    rating: 4.96,
    image: '/api/placeholder/400/300',
    description: 'Stunning penthouse with 360° city views, private elevator, and rooftop terrace.',
    badge: { text: 'New', type: 'gold' as const }
  }
]

export function FeaturedProperties() {
  return (
    <section className="py-16 px-6 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
            Featured <span className="gradient-text">Properties</span>
          </h2>
          <Link 
            href="/properties" 
            className="text-primary-600 dark:text-primary-400 font-medium flex items-center hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
          >
            View all properties
            <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}