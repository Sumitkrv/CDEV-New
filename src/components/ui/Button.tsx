import { ButtonHTMLAttributes, forwardRef } from 'react'
import { motion, MotionProps } from 'framer-motion'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', ...props }, ref) => {
    const baseStyles = 'font-semibold rounded-full transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 relative overflow-hidden'
    
    const variants = {
      primary: 'bg-white text-primary hover:bg-accent hover:text-white shadow-lg hover:shadow-xl hover:-translate-y-1',
      secondary: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary backdrop-blur-md',
      ghost: 'bg-transparent text-white hover:opacity-70',
    }
    
    const sizes = {
      sm: 'px-6 py-2 text-sm',
      md: 'px-8 py-3 text-base',
      lg: 'px-10 py-4 text-lg',
    }
    
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: variant !== 'ghost' ? 1.05 : 1 }}
        whileTap={{ scale: 0.95 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
