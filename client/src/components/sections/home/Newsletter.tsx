'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useTheme } from '@/components/providers/ThemeProvider'
import Image from 'next/image'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const themeContext = useTheme()
  const theme = themeContext?.theme ?? 'light'

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Subscribing email:', email)
    setEmail('')
    setIsSubscribing(false)
  }

  return (
    <section className="py-16 px-6 ziggla-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="ziggla-card p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4 ziggla-text-primary">
                Join Our <span className="ziggla-gradient-text">Exclusive</span> Community
              </h2>
              <p className="ziggla-text-secondary mb-6">
                Subscribe to receive personalized luxury property recommendations and exclusive offers.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="ziggla-input flex-grow"
                />
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="ziggla-button-primary px-6 py-3"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
              <p className="text-sm ziggla-text-muted mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from Ziggla.
              </p>
            </div>
            <div className="hidden md:block">
              <div
                className={`w-full h-48 rounded-lg flex items-center justify-center ${
                  theme === 'dark'
                    ? 'ziggla-bg-primary'
                    : 'ziggla-bg-secondary'
                }`}
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, rgb(134 25 143) 0%, rgb(146 64 14) 100%)'
                    : 'linear-gradient(135deg, rgb(245 208 254) 0%, rgb(253 230 138) 100%)'
                }}
              >
                <Image
                  src="/london.jpg"
                  alt="Newsletter"
                  width={300}
                  height={160}
                  className="w-72 h-40 object-cover rounded-lg"
                  style={{ height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
