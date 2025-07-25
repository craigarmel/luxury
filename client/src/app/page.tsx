import { HeroSection } from '@/components/sections/home/HeroSection'
import { FeaturedProperties } from '@/components/sections/home/FeaturedProperties'
import { PopularDestinations } from '@/components/sections/home/PopularDestinations'
import { ZigglaExperience } from '@/components/sections/home/ZigglaExperience'
import { Testimonials } from '@/components/sections/home/Testimonials'
import { Newsletter } from '@/components/sections/home/Newsletter'

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