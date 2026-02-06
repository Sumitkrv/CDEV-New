import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

interface GalleryImage {
  src: string
  title: string
  category: string
  color: string
}

const STRAPI_URL = 'http://localhost:1337'

const defaultGalleryImages: GalleryImage[] = [
  { src: '/images/CD_EV15783.jpg', title: 'Aerodynamic Excellence', category: 'Design', color: 'from-blue-500/20 to-cyan-500/20' },
  { src: '/images/CD_EV15757.jpg', title: 'Intelligent Dashboard', category: 'Technology', color: 'from-purple-500/20 to-pink-500/20' },
  { src: '/images/CD_EV15705.jpg', title: 'Dynamic Performance', category: 'Power', color: 'from-orange-500/20 to-red-500/20' },
]

const ProductGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [imageLoaded, setImageLoaded] = useState<{[key: number]: boolean}>({})
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(defaultGalleryImages)
  const constraintsRef = useRef(null)

  // Debug selectedImage state
  console.log('ProductGallery render - selectedImage:', selectedImage)

  // Fetch gallery images from Strapi
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get(`${STRAPI_URL}/api/home?populate[galleryImages][populate]=*`)
        const data = response.data.data
        
        if (data.galleryImages && data.galleryImages.length > 0) {
          const images = data.galleryImages.map((item: any) => ({
            src: item.image?.url?.startsWith('http') 
              ? item.image.url 
              : `${STRAPI_URL}${item.image?.url || ''}`,
            title: item.title,
            category: item.category,
            color: item.color || 'from-blue-500/20 to-cyan-500/20'
          }))
          setGalleryImages(images)
        }
      } catch (err) {
        console.error('Error fetching gallery images:', err)
        // Keep default data on error
      }
    }
    
    fetchGalleryImages()
  }, [])

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  // Preload all images immediately
  useEffect(() => {
    galleryImages.forEach((image, index) => {
      const img = new Image()
      img.onload = () => setImageLoaded(prev => ({ ...prev, [index]: true }))
      img.src = image.src
    })
  }, [galleryImages])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  return (
    <section id="gallery" className="relative py-32 bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative container-custom">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-px bg-gray-900/20 mb-8"
          />
          
          <h2 className="font-light text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 text-gray-900">
            Gallery
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
            Every angle tells a story of precision engineering and timeless design
          </p>
        </motion.div>

        {/* Masonry-style Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ 
                delay: index * 0.05, 
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Image clicked:', index);
                setSelectedImage(index);
              }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                {/* Gradient Glow */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-br ${image.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700`}
                  animate={{
                    scale: hoveredIndex === index ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 group-hover:border-gray-300 transition-colors duration-500">
                  {/* Image */}
                  <motion.img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />

                  {/* Loading Skeleton */}
                  {!imageLoaded[index] && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: hoveredIndex === index ? '100%' : '-100%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                  />

                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="absolute top-4 left-4 z-10"
                  >
                    <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                      <span className="text-xs font-medium tracking-wider uppercase text-white">
                        {image.category}
                      </span>
                    </div>
                  </motion.div>

                  {/* Expand Icon */}
                  <motion.div
                    className="absolute top-4 right-4 z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      scale: hoveredIndex === index ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                    </div>
                  </motion.div>

                  {/* Title Overlay */}
                  <motion.div
                    className="absolute inset-x-0 bottom-0 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="text-xl font-light text-white mb-2 tracking-tight">
                      {image.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/70">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                      </svg>
                      <span className="text-sm font-light">Click to expand</span>
                    </div>
                  </motion.div>

                  {/* Border Accent on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: hoveredIndex === index ? '0 0 0 2px rgba(255,255,255,0.1)' : 'none',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 gap-8 py-12 border-t border-b border-gray-200 max-w-4xl mx-auto"
        >
          {[
            { 
              value: galleryImages.length.toString(), 
              label: 'Premium Shots',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              )
            },
            { 
              value: '4K', 
              label: 'Ultra HD',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )
            },
            { 
              value: '360°', 
              label: 'All Angles',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              )
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-center"
            >
              <motion.div
                className="flex justify-center mb-3 text-gray-600"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {stat.icon}
              </motion.div>
              <div className="text-3xl md:text-4xl font-light mb-2 text-gray-900">{stat.value}</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Premium Fullscreen Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/98 backdrop-blur-2xl z-[99999] flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
          style={{ zIndex: 99999 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-4 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-xl transition-all duration-300 border border-white/10 z-20"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-6 left-6 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 z-20">
            <span className="text-white font-light text-sm tracking-wider">
              <span className="font-medium">{selectedImage + 1}</span>
              <span className="text-white/50 mx-2">/</span>
              <span className="text-white/70">{galleryImages.length}</span>
            </span>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute left-6 p-4 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-xl transition-all duration-300 border border-white/10 z-20"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            className="absolute right-6 p-4 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-xl transition-all duration-300 border border-white/10 z-20"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="max-w-7xl max-h-[80vh] w-full px-20 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                className="w-full h-full object-contain"
                style={{ maxHeight: '80vh' }}
                loading="eager"
                decoding="async"
              />
              
              {/* Info Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/95 to-transparent p-8 rounded-b-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`px-4 py-1.5 bg-gradient-to-r ${galleryImages[selectedImage].color} backdrop-blur-sm border border-white/20 rounded-full`}>
                    <span className="text-white text-xs font-medium tracking-wider uppercase">
                      {galleryImages[selectedImage].category}
                    </span>
                  </div>
                  <div className="h-1 w-1 bg-white/30 rounded-full" />
                  <span className="text-white/60 text-sm font-light">Premium Quality</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-light text-white mb-2 tracking-tight">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-white/60 text-sm font-light">
                  Captured in stunning detail • Professional grade imagery
                </p>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 px-8 py-4 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
            <div className="flex items-center gap-2.5">
              <kbd className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs text-white font-mono">←</kbd>
              <kbd className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs text-white font-mono">→</kbd>
              <span className="text-white/60 text-xs font-light">Navigate</span>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2.5">
              <kbd className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs text-white font-mono">ESC</kbd>
              <span className="text-white/60 text-xs font-light">Close</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductGallery
