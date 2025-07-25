"use client"

import { useTheme } from '@/components/providers/ThemeProvider'
import { ReviewCard } from '@/components/reviews/ReviewCard'


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
            <div key={index} className="flex mb-4">
              <ReviewCard
                location={testimonial.location}
                initials={testimonial.initials}
                  rating={testimonial.rating}
                  property={testimonial.property}
                  theme={theme}
                  compact
                  hideText
                  hideProperty
                  reviewerName={testimonial.name}
                  reviewDate={''}
                  comment={testimonial.text}
                />
              </div>
          ))}
        </div>
      </div>
    </section>
  )
}