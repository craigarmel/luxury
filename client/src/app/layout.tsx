import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Ziggla - Luxury Property Rentals',
  description: 'Discover handpicked exclusive properties in the world\'s most coveted destinations',
  keywords: ['luxury', 'property', 'rental', 'vacation', 'travel'],
  authors: [{ name: 'Ziggla Team' }],
  openGraph: {
    title: 'Ziggla - Luxury Property Rentals',
    description: 'Experience unparalleled luxury with Ziggla',
    url: 'https://ziggla.com',
    siteName: 'Ziggla',
    type: 'website',
  },
}

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col bg-white dark:bg-dark text-gray dark:text-white">
          <ThemeProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
              <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}