import { DestinationCard } from '@/components/features/DestinationCard'
import { Button } from '@/components/ui/Button'

const destinations = [
  { name: 'Santorini', propertyCount: 42, image: '/api/placeholder/300/300' },
  { name: 'Bali', propertyCount: 68, image: '/api/placeholder/300/300' },
  { name: 'Amalfi Coast', propertyCount: 35, image: '/api/placeholder/300/300' },
  { name: 'Maldives', propertyCount: 29, image: '/api/placeholder/300/300' },
]

export function PopularDestinations() {
  return (
    <section className="py-16 px-6 ziggla-bg-secondary dark:bg-dark-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900 ziggla-text-primary">
            Popular <span className="gradient-text">Destinations</span>
          </h2>
          <p className="ziggla-text-primary max-w-2xl mx-auto">
            Explore our collection of exclusive properties in the world&apos;s most sought-after locations
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {destinations.map((destination) => (
            <DestinationCard key={destination.name} destination={destination} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
          variant='outline'
          color='primary'
          >
            Explore All Destinations
          </Button>
        </div>
      </div>
    </section>
  )
}