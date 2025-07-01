'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

export function Footer() {

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Cancellation Policy', href: '/cancellation' },
      { label: 'Neighborhood Support', href: '/neighborhood' },
      { label: 'Trust & Safety', href: '/safety' },
      { label: 'Contact Us', href: '/contact' },
    ],
    hosting: [
      { label: 'List Your Property', href: '/host' },
      { label: 'Responsible Hosting', href: '/responsible-hosting' },
      { label: 'Host Experiences', href: '/host-experiences' },
      { label: 'Resource Center', href: '/resources' },
      { label: 'Community Forum', href: '/community' },
    ]
  }

  return (
    <footer className="ziggla-bg-primary ziggla-text-primary py-12 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 ziggla-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <span className="text-2xl font-serif font-bold">
                <span className="ziggla-gradient-text">Ziggla</span>
              </span>
            </div>
            <p className="ziggla-text-muted mb-6">
              Curating exceptional luxury properties for discerning travelers worldwide.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 rounded-full ziggla-card flex items-center justify-center hover:ziggla-gradient transition-all duration-300 group">
                <Facebook className="h-5 w-5 text-gray-500 group-hover:text-white transition-all" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full ziggla-card flex items-center justify-center hover:ziggla-gradient transition-all duration-300 group">
                <Instagram className="h-5 w-5 text-gray-500 group-hover:text-white transition-all" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full ziggla-card flex items-center justify-center hover:ziggla-gradient transition-all duration-300 group">
                <Twitter className="h-5 w-5 text-gray-500 group-hover:text-white transition-all" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full ziggla-card flex items-center justify-center hover:ziggla-gradient transition-all duration-300 group">
                <Linkedin className="h-5 w-5 text-gray-500 group-hover:text-white transition-all" />
              </Link>
            </div>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-6 ziggla-text-primary">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="ziggla-text-muted hover:ziggla-gradient-text transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 ziggla-text-primary">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="ziggla-text-muted hover:ziggla-gradient-text transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Hosting */}
          <div>
            <h4 className="text-lg font-bold mb-6 ziggla-text-primary">Hosting</h4>
            <ul className="space-y-3">
              {footerLinks.hosting.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="ziggla-text-muted hover:ziggla-gradient-text transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="ziggla-border border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="ziggla-text-muted text-sm mb-4 md:mb-0">
            © 2024 Ziggla. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <Link href="/privacy" className="ziggla-text-muted hover:ziggla-gradient-text text-sm transition-all duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="ziggla-text-muted hover:ziggla-gradient-text text-sm transition-all duration-300">
              Terms of Service
            </Link>
            <Link href="/cookies" className="ziggla-text-muted hover:ziggla-gradient-text text-sm transition-all duration-300">
              Cookie Policy
            </Link>
            <Link href="/sitemap" className="ziggla-text-muted hover:ziggla-gradient-text text-sm transition-all duration-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
