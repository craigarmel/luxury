import Image from 'next/image';
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
      
      {/* Destination image */}
      <Image
        src={destination.image}
        alt={destination.name}
        width={400}
        height={256}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />

      <div className="absolute bottom-0 left-0 p-4 z-20">
        <h3 className="text-white text-xl font-bold mb-1">{destination.name}</h3>
        <p className="text-white text-sm opacity-90">{destination.propertyCount} properties</p>
      </div>
    </div>
  )
}