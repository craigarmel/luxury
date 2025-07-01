import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedProperties } from '@/components/sections/FeaturedProperties'
import { PopularDestinations } from '@/components/sections/PopularDestinations'
import { ZigglaExperience } from '@/components/sections/ZigglaExperience'
import { Testimonials } from '@/components/sections/Testimonials'
import { Newsletter } from '@/components/sections/Newsletter'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProperties />
      <PopularDestinations />
      <ZigglaExperience />
      <Testimonials />
      <Newsletter />
    </div>
  )
}