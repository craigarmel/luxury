import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
      type={type}
      className={cn(
        'w-full px-3 py-2 ziggla-text-primary border ziggla-bg-secondary rounded focus:outline-none focus:ring',
        className
      )}
      ref={ref}
      {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }