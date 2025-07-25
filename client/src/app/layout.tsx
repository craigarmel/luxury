"use client"

import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useAuthStore } from '@/store/useAuthStore'
import { usePathname, redirect } from 'next/navigation'
import { useEffect } from 'react'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    // Redirect unauthenticated users trying to access dashboard
    if (pathname.startsWith('/dashboard') && !isAuthenticated) {
      redirect('/auth/login')
    }
    // Redirect authenticated hosts away from login/register
    if (
      (pathname === '/auth/login' || pathname === '/auth/register') &&
      isAuthenticated &&
      user?.role === 'host'
    ) {
      redirect('/dashboard')
    }
    // Redirect non-hosts away from host dashboard
    if (
      pathname.startsWith('/host/dashboard') &&
      isAuthenticated &&
      user?.role !== 'host'
    ) {
      redirect('/dashboard')
    }
  }, [pathname, isAuthenticated, user])

  return <>{children}</>
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
              <AuthGuard>
                <main className="flex-1">
                  {children}
                </main>
              </AuthGuard>
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}