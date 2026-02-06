import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'

interface HeroSectionProps {
  onBookTestRide: () => void
}

interface HeroSlide {
  title: string
  subtitle: string
  specs: string[]
  image: string
}

const STRAPI_URL = 'http://localhost:1337'

const HeroSection = ({ onBookTestRide }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nextImageIndex, setNextImageIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartY, setDragStartY] = useState(0)
  const [autoPlayPaused, setAutoPlayPaused] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const autoPlayTimerRef = useRef<number | null>(null)
  const fullscreenTimerRef = useRef<number | null>(null)
  const transitionTimerRef = useRef<number | null>(null)
  const [windowWidth, setWindowWidth] = useState(1920)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const splitPosition = useTransform(mouseX, [0, windowWidth], [30, 70])

  // Fetch hero slides from Strapi
  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const response = await axios.get(`${STRAPI_URL}/api/home?populate[heroSlides][populate]=*`)
        const data = response.data.data
        
        if (data.heroSlides && data.heroSlides.length > 0) {
          const slides = data.heroSlides.map((slide: any) => ({
            title: slide.title,
            subtitle: slide.subtitle,
            specs: Array.isArray(slide.specs) ? slide.specs : [],
            image: slide.image?.url?.startsWith('http') 
              ? slide.image.url 
              : `${STRAPI_URL}${slide.image?.url || ''}`
          }))
          setHeroSlides(slides)
        }
      } catch (err) {
        console.error('Error fetching hero slides:', err)
        setHeroSlides([])
      }
    }
    
    fetchHeroSlides()
  }, [])

  const heroImages = heroSlides.map(slide => slide.image)
  const productInfo = heroSlides.map(slide => ({
    title: slide.title,
    subtitle: slide.subtitle,
    specs: slide.specs
  }))

  // Preload images on mount
  useEffect(() => {
    if (heroSlides.length === 0) {
      setImagesLoaded(true)
      return
    }
    const preloadImages = async () => {
      try {
        const imagePromises = heroImages.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(src)
            img.onerror = () => reject(src)
            img.src = src
          })
        })
        
        await Promise.all(imagePromises)
        setImagesLoaded(true)
      } catch (error) {
        console.error('Error preloading images:', error)
        setImagesLoaded(true)
      }
    }
    
    preloadImages()
  }, [heroImages])

  // Set window width on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
      
      const handleResize = () => setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false)
    setDragStartY(e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
    
    // Check if user is dragging (moved more than 10px)
    if (dragStartY > 0 && Math.abs(dragStartY - e.clientY) > 10) {
      setIsDragging(true)
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging) {
      const dragDistance = dragStartY - e.clientY
      
      // If dragged up more than 100px, show fullscreen
      if (dragDistance > 100) {
        setAutoPlayPaused(true)
        if (fullscreenTimerRef.current) clearTimeout(fullscreenTimerRef.current)
        
        setShowFullscreen(true)
        fullscreenTimerRef.current = setTimeout(() => {
          setShowFullscreen(false)
          setAutoPlayPaused(false)
        }, 3000)
      }
    }
    setIsDragging(false)
    setDragStartY(0)
  }

  const triggerTransition = (forward: boolean, isAuto = false) => {
    if (isTransitioning) return
    
    // Pause autoplay on manual interaction
    if (!isAuto) {
      setAutoPlayPaused(true)
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current)
    }
    
    // If already in fullscreen, exit it and change image
    if (showFullscreen) {
      setShowFullscreen(false)
      if (fullscreenTimerRef.current) clearTimeout(fullscreenTimerRef.current)
    }
    
    setIsTransitioning(true)
    const newIndex = forward 
      ? (currentImageIndex + 1) % heroImages.length
      : (currentImageIndex - 1 + heroImages.length) % heroImages.length
    
    setNextImageIndex(newIndex)
    
    // First transition to new image
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
    transitionTimerRef.current = setTimeout(() => {
      setCurrentImageIndex(newIndex)
      setNextImageIndex((newIndex + 1) % heroImages.length)
      setIsTransitioning(false)
      
      // Show fullscreen preview
      setShowFullscreen(true)
      
      // Return to split view after 3 seconds
      if (fullscreenTimerRef.current) clearTimeout(fullscreenTimerRef.current)
      fullscreenTimerRef.current = setTimeout(() => {
        setShowFullscreen(false)
        // Resume autoplay after manual interaction timeout
        if (!isAuto) {
          setTimeout(() => setAutoPlayPaused(false), 2000)
        }
      }, 3000)
    }, 600)
  }

  useEffect(() => {
    let lastScroll = 0
    
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastScroll < 800 || isTransitioning) return
      
      e.preventDefault()
      lastScroll = now
      triggerTransition(e.deltaY > 0, false)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        triggerTransition(true, false)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        triggerTransition(false, false)
      }
    }

    const container = containerRef.current
    container?.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      container?.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentImageIndex, isTransitioning, showFullscreen])

  // Auto-slideshow effect
  useEffect(() => {
    if (autoPlayPaused || isTransitioning || showFullscreen) return

    autoPlayTimerRef.current = setTimeout(() => {
      triggerTransition(true, true)
    }, 5000)

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current)
    }
  }, [currentImageIndex, autoPlayPaused, isTransitioning, showFullscreen])

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current)
      if (fullscreenTimerRef.current) clearTimeout(fullscreenTimerRef.current)
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
    }
  }, [])

  // Show loading state while images are loading OR no slides
  if (!imagesLoaded || heroSlides.length === 0) {
    return (
      <section className="relative h-screen w-full bg-gradient-to-br from-gray-900 to-black overflow-hidden mt-[72px] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-light tracking-wider">
            {heroSlides.length === 0 ? 'Loading hero content...' : 'Loading Experience...'}
          </p>
          {heroSlides.length === 0 && (
            <p className="text-sm text-white/60 mt-2">Make sure Strapi API permissions are enabled</p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="relative h-screen w-full bg-white overflow-hidden mt-[72px]"
    >
      {/* Split Screen Effect */}
      <div className="relative h-full w-full flex z-10">
        
        {/* Left Half - Current Image */}
        <motion.div 
          className="relative h-full overflow-hidden bg-white"
          style={{ width: showFullscreen ? '100%' : `${100 - (isTransitioning ? 50 : splitPosition.get())}%` }}
          animate={{ 
            width: showFullscreen ? '100%' : (isTransitioning ? '0%' : `${splitPosition.get()}%`),
          }}
          transition={{ duration: showFullscreen ? 0.8 : 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            src={heroImages[currentImageIndex]}
            alt="EV Scooter"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            onError={(e) => {
              console.error('Failed to load image:', heroImages[currentImageIndex])
              e.currentTarget.style.backgroundColor = '#1f2937'
            }}
            style={{
              scale: isTransitioning ? 1.2 : 1,
              filter: isTransitioning ? 'grayscale(1) contrast(1.2)' : 'grayscale(0)',
            }}
            animate={{
              x: isTransitioning ? [0, -10, 10, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Glitch Overlay */}
          {isTransitioning && (
            <div className="absolute inset-0">
              <motion.div
                className="absolute inset-0 bg-white mix-blend-overlay"
                animate={{ opacity: [0, 0.3, 0, 0.5, 0] }}
                transition={{ duration: 0.6, times: [0, 0.2, 0.4, 0.6, 1] }}
              />
            </div>
          )}
        </motion.div>

        {/* Right Half - Next Image */}
        <motion.div 
          className="relative h-full overflow-hidden bg-white"
          style={{ width: showFullscreen ? '0%' : `${isTransitioning ? 50 : 100 - splitPosition.get()}%` }}
          animate={{ 
            width: showFullscreen ? '0%' : (isTransitioning ? '100%' : `${100 - splitPosition.get()}%`),
            opacity: showFullscreen ? 0 : 1,
          }}
          transition={{ duration: showFullscreen ? 0.8 : 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            src={heroImages[nextImageIndex]}
            alt="EV Scooter"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            onError={(e) => {
              console.error('Failed to load image:', heroImages[nextImageIndex])
              e.currentTarget.style.backgroundColor = '#1f2937'
            }}
            style={{
              scale: isTransitioning ? 1.2 : 1.1,
              filter: 'grayscale(0.3)',
            }}
            animate={{
              scale: isTransitioning ? 1 : 1.1,
              filter: isTransitioning ? 'grayscale(0)' : 'grayscale(0.3)',
            }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Center Split Line */}
        <motion.div 
          className="absolute top-0 bottom-0 w-1 bg-white z-20"
          style={{ 
            left: `${splitPosition.get()}%`,
            boxShadow: '0 0 50px rgba(255,255,255,0.8)',
          }}
          animate={{
            opacity: showFullscreen ? 0 : (isTransitioning ? [1, 0.3, 1, 0.3, 1] : 1),
          }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Product Content - Slides in during fullscreen */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-60 max-w-md"
          >
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 space-y-4">
              {/* Title */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-4xl font-black text-white mb-1">
                  {productInfo[currentImageIndex]?.title || 'Loading...'}
                </h2>
                <p className="text-white/60 text-sm font-light tracking-wide">
                  {productInfo[currentImageIndex]?.subtitle || ''}
                </p>
              </motion.div>

              {/* Specs */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-2"
              >
                {(productInfo[currentImageIndex]?.specs || []).map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3 text-white/80 text-sm"
                  >
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <span className="font-mono">{spec}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-white text-sm font-medium tracking-wider transition-all"
                onClick={onBookTestRide}
              >
                EXPLORE MODEL
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Magnetic Cursor */}
      <motion.div
        className="fixed w-20 h-20 border-2 border-white rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isTransitioning ? [1, 1.5, 1] : 1,
          rotate: isTransitioning ? 360 : 0,
        }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
          {isTransitioning ? '▶' : '◉'}
        </div>
        <motion.div
          className="absolute inset-2 border border-white/50 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Image Counter with better visibility */}
      <motion.div 
        className="absolute top-24 left-8 z-40 font-mono select-none pointer-events-none"
        animate={{
          x: isTransitioning ? [-5, 5, -3, 3, 0] : 0,
          y: isTransitioning ? [5, -5, 3, -3, 0] : 0,
        }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="relative"
          >
            {/* Background blur for readability */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-lg -z-10" />
            <div className="text-6xl font-black text-white px-4 py-2"
              style={{
                textShadow: isTransitioning 
                  ? '3px 3px 0 #ff00ff, -3px -3px 0 #00ffff' 
                  : '2px 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              {String(currentImageIndex + 1).padStart(2, '0')}
            </div>
          </motion.div>
        </AnimatePresence>
        <motion.div 
          className="text-white text-sm mt-2 flex items-center gap-2 px-4"
          animate={{
            opacity: isTransitioning ? [1, 0.3, 1] : 1,
          }}
        >
          <div className="bg-black/30 backdrop-blur-sm rounded px-2 py-1">
            <span>/ {String(heroImages.length).padStart(2, '0')}</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xs ml-2"
            >
              ●
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {/* Progress Bar - Vertical Right */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-40 h-64 pointer-events-none">
        <div className="relative h-full w-0.5 bg-white/20 rounded-full">
          <motion.div 
            className="absolute bottom-0 w-full bg-white rounded-full"
            style={{
              boxShadow: '0 0 20px rgba(255,255,255,0.5)',
            }}
            animate={{
              height: `${((currentImageIndex + 1) / heroImages.length) * 100}%`,
            }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
          {heroImages.map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 rounded-full bg-white/30 -left-[3px]"
              style={{
                top: `${(index / (heroImages.length - 1)) * 100}%`,
              }}
              animate={{
                scale: index === currentImageIndex ? [1, 1.5, 1] : 1,
                backgroundColor: index <= currentImageIndex ? '#ffffff' : 'rgba(255,255,255,0.3)',
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Navigation hint arrows */}
      <motion.div
        className="absolute left-12 top-1/2 -translate-y-1/2 z-40 text-white/30 pointer-events-none"
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute right-12 top-1/2 -translate-y-1/2 z-40 text-white/30 pointer-events-none"
        animate={{ x: [5, -5, 5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </motion.div>

      {/* Click Zones for Navigation */}
      <div className="absolute inset-0 z-50 grid grid-cols-3 pointer-events-none">
        <div 
          onClick={(e) => {
            e.stopPropagation()
            if (!isDragging) triggerTransition(false, false)
          }}
          className="cursor-pointer hover:bg-white/5 transition-colors pointer-events-auto"
        />
        <div className="pointer-events-none" />
        <div 
          onClick={(e) => {
            e.stopPropagation()
            if (!isDragging) triggerTransition(true, false)
          }}
          className="cursor-pointer hover:bg-white/5 transition-colors pointer-events-auto"
        />
      </div>

      {/* Bottom Instructions with enhanced design */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 text-white/60 text-xs tracking-[0.5em] font-mono pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="flex items-center gap-4"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="px-3 py-1 border border-white/20 rounded">SCROLL</span>
          <span>•</span>
          <span className="px-3 py-1 border border-white/20 rounded">CLICK</span>
          <span>•</span>
          <span className="px-3 py-1 border border-white/20 rounded">ARROWS</span>
        </motion.div>
      </motion.div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-radial from-transparent via-transparent to-black/40" />
    </section>
  )
}

export default HeroSection
