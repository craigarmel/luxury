interface DestinationCardProps {
  destination: {
    name: string
    propertyCount: number
    image: string
  }
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="relative rounded-xl overflow-hidden h-64 group cursor-pointer">
      <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity duration-300 z-10"></div>
      
      {/* Placeholder image */}
      <div className="w-full h-full bg-gray-300 dark:bg-dark-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
        <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          {destination.name}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 p-4 z-20">
        <h3 className="text-white text-xl font-bold mb-1">{destination.name}</h3>
        <p className="text-white text-sm opacity-90">{destination.propertyCount} properties</p>
      </div>
    </div>
  )
}