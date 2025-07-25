'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sun, Moon, Menu, X, Search, User } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '../ui/Button'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme() ?? {}
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  // const navItems = [
  // ]

  // Helper to get header classes based on theme
  const getHeaderClasses = () => {
    if (theme === 'light') {
      return 'sticky top-0 z-50 backdrop-blur-md border-b ziggla-border'
    }
    return 'sticky top-0 z-50 dark:bg-slate-900/80 backdrop-blur-md border-b ziggla-border'
  }

  // Helper to get text color based on theme
  const getTextPrimary = () => {
    if (theme === 'light') return 'text-blue-900'
    return 'ziggla-text-primary'
  }

  return (
    <header className={getHeaderClasses()}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold tracking-tight ziggla-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
              ZIGGLA
            </span>
          </Link>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="ziggla-text-secondary hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div> */}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {mounted && (
              <Button
                variant="ghost"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 ziggla-text-primary" />
                ) : theme === 'light' ? (
                  <Moon className="h-5 w-5 text-blue-900" />
                ) : (
                  <Sun className="h-5 w-5 ziggla-text-primary" />
                )}
              </Button>
              )}
            <Link href="/search">
              <Button 
                variant="ghost">
                <Search className={`h-5 w-5 ${getTextPrimary()}`} />
              </Button>
            </Link>

            {isAuthenticated ? (
              user?.role === 'host' ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                <Button variant='ghost'>
                  <User className="h-5 w-5" />
                  <span className={getTextPrimary()}>{user?.firstName}</span>
                </Button>
                </Link>
                <Link href="/host/dashboard">
                <Button variant='outline'>
                  Dashboard
                </Button>
                </Link>
                <Button onClick={() => useAuthStore.getState().logout()}>
                Logout
                </Button>
              </div>
              ) : user?.role === 'admin' ? (
              <div className="flex items-center space-x-4">
                <Link href="/admin">
                <Button >
                  <User className="h-5 w-5" />
                  <span className={getTextPrimary()}>{user?.firstName} (Admin)</span>
                </Button>
                </Link>
                <Button onClick={() => useAuthStore.getState().logout()}>
                Logout
                </Button>
              </div>
              ) : (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant='ghost'>
                    <User className="h-5 w-5 m-1 " />
                    <span className={getTextPrimary()}>{user?.firstName}</span>
                  </Button>
                </Link>
                <Button onClick={() => useAuthStore.getState().logout()}>
                Logout
                </Button>
              </div>
              )
            ) : (
              <div className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant='ghost' className='ziggla-text-secondary hover:text-purple-600 dark:hover:text-purple-400'>
                Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button>
                Sign Up
                </Button>
              </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {mounted && (
              <Button
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 ziggla-text-primary" />
                ) : theme === 'light' ? (
                  <Moon className="h-5 w-5 text-blue-900" />
                ) : (
                  <Sun className="h-5 w-5 ziggla-text-primary" />
                )}
              </Button>
            )}

            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={`h-6 w-6 ${getTextPrimary()}`} />
              ) : (
                <Menu className={`h-6 w-6 ${getTextPrimary()}`} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t ziggla-border">
            {/* {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 ziggla-text-secondary hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))} */}

            <div className="pt-4 space-y-2">
              {isAuthenticated ? (
                user?.role === 'host' ? (
                  <>
                    <Link href="/dashboard">
                      <Button className="w-full flex items-center justify-start space-x-2 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <User className="h-5 w-5" />
                        <span>{user?.firstName}</span>
                      </Button>
                    </Link>
                    <Link href="/properties/create">
                      <Button>
                        My Properties
                      </Button>
                    </Link>
                    <Button onClick={() => useAuthStore.getState().logout()}>
                      Logout
                    </Button>
                  </>
                ) : user?.role === 'admin' ? (
                  <>
                    <Link href="/admin">
                      <Button className="w-full flex items-center justify-start space-x-2 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <User className="h-5 w-5" />
                        <span>{user?.firstName} (Admin)</span>
                      </Button>
                    </Link>
                    <Button onClick={() => useAuthStore.getState().logout()}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard
  ">
                      <button className="w-full flex items-center justify-start space-x-2 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <User className="h-5 w-5" />
                        <span>{user?.firstName}</span>
                      </button>
                    </Link>
                    <Button onClick={() => useAuthStore.getState().logout()}>
                      Logout
                    </Button>
                  </>
                )
              ) : (
                <>
                  <Link href="/auth/login">
                    <button>
                      Sign In
                    </button>
                  </Link>
                  <Link href="/auth/register">
                    <button className="w-full ziggla-button-primary">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}