import { ImgHTMLAttributes, useState, useEffect } from 'react'
import { motion, MotionProps } from 'framer-motion'

interface OptimizedImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, keyof MotionProps> {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

const OptimizedImg = ({ src, alt, className = '', priority = false, ...props }: OptimizedImgProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState<string>('')

  useEffect(() => {
    if (priority) {
      setImageSrc(src)
    } else {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }
    }
  }, [src, priority])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !priority && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded || priority ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        src={imageSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover ${className}`}
        {...props}
      />
    </div>
  )
}

export default OptimizedImg
