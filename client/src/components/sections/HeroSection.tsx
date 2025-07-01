'use client'

// import { useState } from 'react'
// import { Search, MapPin, Calendar, Users } from 'lucide-react'
// import { Button } from '@/components/ui/Button'
import { SearchForm } from '@/components/forms/SearchForm'
import Image from 'next/image'

export function HeroSection() {
  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="w-full h-[600px] bg-cover bg-center relative bg-gray-800">
        {/* Placeholder pour l'image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 flex items-center justify-center">
          <Image 
            src="/hero-bg.jpg"
            alt="Luxury Properties Background" 
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 animate-fade-in">
            Experience Unparalleled 
            <span className="block bg-gradient-to-r from-primary-400 to-gold-400 bg-clip-text text-transparent">
              Luxury
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl animate-slide-up">
            Discover handpicked exclusive properties in the world&apos;s most coveted destinations
          </p>
          
          {/* Search Box */}
          <SearchForm />
        </div>
      </div>
    </div>
  )
}