"use client"

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PropertyCard } from '@/components/features/PropertyCard'
import { usePropertyStore } from '@/store/usePropertyStore'
import { Property } from '@/types/Property'

import { useEffect, useState } from 'react'

export function FeaturedProperties() {
  const getAllProperties = usePropertyStore((state) => state.fetchProperties)
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    getAllProperties();
    // If fetchProperties updates the store, subscribe to changes:
    const unsubscribe = usePropertyStore.subscribe((state) => {
      setProperties((state.properties || []) as Property[]);
    });
    // Optionally, set initial state
    setProperties(usePropertyStore.getState().properties || []);
    return () => unsubscribe();
  }, [getAllProperties])

  const featuredProperties = properties.slice(0, 6)
  return (
    <section className="py-16 px-6 ziggla-bg-secondary dark:bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-serif font-bold ziggla-text-primary dark:text-white">
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
          {featuredProperties.map((property, idx) => (
            <PropertyCard key={property._id ?? `property-${idx}`} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}