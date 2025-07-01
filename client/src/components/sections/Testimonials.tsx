"use client"

import { Star } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'


const testimonials = [
  {
    name: 'James Davidson',
    location: 'New York, USA',
    initials: 'JD',
    rating: 5,
    text: 'Our stay at the Santorini villa exceeded all expectations. The views were breathtaking, and the personal concierge service made our anniversary truly special.',
    property: 'Villa Caldera, Santorini'
  },
  {
    name: 'Emma Lawrence',
    location: 'London, UK',
    initials: 'EL',
    rating: 5,
    text: 'The Alpine Chalet was pure luxury. From the heated floors to the private chef, every detail was perfect. We\'ve already booked our return visit for next winter.',
    property: 'Alpine Retreat, Swiss Alps'
  },
  {
    name: 'Michael Rodriguez',
    location: 'Los Angeles, USA',
    initials: 'MR',
    rating: 5,
    text: 'The booking process was seamless, and the Manhattan penthouse was even more stunning than the photos. The concierge arranged everything from dinner reservations to theater tickets.',
    property: 'Manhattan Skyline, New York'
  }
] 

export function Testimonials() {
  const themeContext = useTheme()
  const theme = themeContext?.theme ?? 'light'

  return (
    <section className="py-20 px-4 ziggla-bg-secondary transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
            <h2
            className={`text-4xl font-serif font-extrabold mb-3 tracking-tight drop-shadow-lg ${
              theme === 'dark'
              ? 'text-gold-300'
              : 'text-black'
            }`}
            >
            Guest Testimonials
            </h2>
            <p
            className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark'
              ? 'text-gold-200'
              : 'text-black'
            }`}
            >
            Hear what our guests have to say about their{' '}
            <span
              className={`font-semibold ${
              theme === 'dark'
                ? 'text-gold-400'
                : 'text-primary-600'
              }`}
            >
              Ziggla
            </span>{' '}
            experiences
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white/90 dark:bg-dark-800/80 rounded-2xl p-8 shadow-xl hover:shadow-2xl border ${
                theme === 'dark'
                  ? 'border-gold-900'
                  : 'border-gold-100'
              } transition-all duration-300 flex flex-col`}
            >
              <div className="flex items-center mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 via-gold-400 to-gold-600 flex items-center justify-center mr-4 shadow-md border-2 border-gold-200 dark:border-gold-700">
                  <span className="text-xl text-black font-extrabold">{testimonial.initials}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gold-100 text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gold-300">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-gold drop-shadow-sm"
                    fill="gold"
                  />
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-gold-200 mb-5 italic flex-1">
                “{testimonial.text}”
              </p>

              <p className="text-sm text-black dark:text-gold-400 font-medium mt-auto">
                Stayed at <span className="font-semibold">{testimonial.property}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}