import { Check, Plus, Shield } from 'lucide-react'

const features = [
  {
    icon: Check,
    title: 'Handpicked Properties',
    description: 'Every property is personally inspected and selected for its exceptional quality and unique character.'
  },
  {
    icon: Plus,
    title: 'Personalized Service',
    description: 'Our dedicated concierge team is available 24/7 to ensure your stay exceeds expectations.'
  },
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Our booking process is simple, transparent, and secure, with 24/7 customer support.'
  }
]

export function ZigglaExperience() {
  return (
    <section className="py-16 px-6 ziggla-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
              The <span className="gradient-text">Ziggla</span> Experience
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We curate exceptional properties and experiences for the discerning traveler. Each property 
              in our collection is personally vetted to ensure it meets our exacting standards of luxury, 
              comfort, and service.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-gold-500 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative h-96 rounded-xl overflow-hidden">
            {/* Placeholder pour l'image d'expérience */}
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-gold-100 dark:from-primary-900 dark:to-gold-900 flex items-center justify-center">
              <div className="text-primary-400 dark:text-primary-300 text-lg font-medium">
                <img src="lounge.jpg" alt="Luxury Experience" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}