import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    // Classes de base communes à tous les boutons
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border-0"
    
    // Classes selon la variante
    const variantClasses = {
      primary: "bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white font-bold hover:scale-105 shadow-lg hover:shadow-xl focus:ring-0 focus:ring-offset-0",
      outline: "border text-purple-600 hover:bg-purple-500 hover:text-white dark:text-purple-400 dark:hover:bg-purple-400 dark:hover:text-slate-900 bg-transparent focus:ring-0 focus:ring-offset-0",
      ghost: "ziggla-text-secondary bg-transparent hover:bg-black/40 dark:hover:bg-white/80 text-lg px-5 py-2.5 focus:ring-0 focus:ring-offset-0",
      secondary: "ziggla-bg-secondary ziggla-text-secondary hover:bg-slate-200 dark:hover:bg-slate-700 focus:ring-0 focus:ring-offset-0"
    } as const

    // Classes selon la taille
    const sizeClasses = {
      sm: "h-8 px-3 py-1.5 text-sm",
      md: "h-10 px-4 py-2 text-base", 
      lg: "h-12 px-6 py-3 text-lg"
    }

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant] ?? variantClasses.primary,
          sizeClasses[size] ?? sizeClasses.md,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }