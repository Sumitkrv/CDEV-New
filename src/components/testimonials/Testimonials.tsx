import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface Testimonial {
  name: string
  role: string
  location: string
  image: string
  vehicleImage: string
  rating: number
  comment: string
  model: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    role: 'Urban Professional',
    location: 'San Francisco, CA',
    image: '/images/CD_EV15656.jpg',
    vehicleImage: '/images/CD_EV15783.jpg',
    rating: 5,
    comment: 'The Urban Rider has completely transformed my daily commute. Silent, smooth, and incredibly efficient. Best decision I made this year!',
    model: 'Urban Rider',
  },
  {
    name: 'James Rodriguez',
    role: 'Tech Entrepreneur',
    location: 'Austin, TX',
    image: '/images/CD_EV15681.jpg',
    vehicleImage: '/images/CD_EV15757.jpg',
    rating: 5,
    comment: 'Coming from a gas vehicle, the acceleration and handling of the Highway Master is mind-blowing. This is the future, and it\'s here now.',
    model: 'Highway Master',
  },
  {
    name: 'Priya Sharma',
    role: 'Environmental Advocate',
    location: 'Mumbai, India',
    image: '/images/CD_EV15682.jpg',
    vehicleImage: '/images/CD_EV15868.jpg',
    rating: 5,
    comment: 'Not only am I saving money on fuel, but I\'m also contributing to a cleaner environment. The performance is exceptional and the tech features are impressive.',
    model: 'Eco Cruiser',
  },
  {
    name: 'Michael Chen',
    role: 'Business Owner',
    location: 'Singapore',
    image: '/images/CD_EV15683.jpg',
    vehicleImage: '/images/CD_EV15890.jpg',
    rating: 5,
    comment: 'The luxury and performance combined with zero emissions makes this the perfect vehicle for conscious professionals. Highly recommend!',
    model: 'Executive Edition',
  },
]

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isPaused])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={sectionRef} id="testimonials" className="py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"
        style={{ opacity }}
      />
      
      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl"
          style={{ y }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/8 to-cyan-500/8 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-pink-500/6 to-orange-500/6 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -70, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05, rotateZ: 2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-50 to-white backdrop-blur-xl border border-gray-200 rounded-full mb-8 shadow-lg shadow-gray-200/50"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
            <span className="text-gray-600 text-xs uppercase tracking-[0.25em] font-light">Customer Stories</span>
            <div className="w-px h-4 bg-gradient-to-b from-gray-300 via-gray-200 to-transparent" />
            <span className="text-gray-900 text-xs font-medium tracking-wide">Real Experiences</span>
          </motion.div>

          <motion.h2
            className="font-light text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block mb-2 text-gray-900">What Drivers</span>
            <motion.span 
              className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Are Saying
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="text-gray-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join thousands of satisfied riders who've made the switch to electric mobility
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => { setIsPaused(true); setIsHovered(true); }}
          onMouseLeave={() => { setIsPaused(false); setIsHovered(false); }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* Vehicle Image */}
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl group"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 z-10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.7 }}
                />
                
                {/* Animated Scan Line */}
                <motion.div
                  className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent z-20"
                  animate={{
                    top: ['0%', '100%'],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                <motion.img
                  src={testimonials[currentIndex].vehicleImage}
                  alt={testimonials[currentIndex].model}
                  className="w-full h-[500px] object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                
                <motion.div 
                  className="absolute bottom-6 left-6 right-6 z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.span 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-2xl border border-gray-200 rounded-full text-gray-900 text-sm font-medium shadow-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                    {testimonials[currentIndex].model}
                  </motion.span>
                </motion.div>
              </motion.div>

              {/* Testimonial Content */}
              <motion.div 
                className="space-y-8 relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Quote Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="inline-block"
                >
                  <svg className="w-16 h-16 text-blue-500/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </motion.div>
                
                {/* Star Rating */}
                <motion.div 
                  className="flex gap-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </motion.svg>
                  ))}
                </motion.div>

                {/* Comment */}
                <motion.p 
                  className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-blue-500 text-4xl font-serif">"</span>
                  {testimonials[currentIndex].comment}
                  <span className="text-blue-500 text-4xl font-serif">"</span>
                </motion.p>

                {/* Author Info */}
                <motion.div 
                  className="flex items-center gap-5 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {testimonials[currentIndex].name.charAt(0)}
                    </div>
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                    </motion.div>
                  </motion.div>
                  <div>
                    <motion.h4 
                      className="font-light text-xl text-gray-900 mb-1"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {testimonials[currentIndex].name}
                    </motion.h4>
                    <p className="text-gray-600 text-sm font-light flex items-center gap-2">
                      {testimonials[currentIndex].role}
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {testimonials[currentIndex].location}
                      </span>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-14 h-14 rounded-full bg-white/95 backdrop-blur-2xl border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:border-blue-200 transition-all duration-300 group shadow-xl z-10"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <svg 
              className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </motion.button>

          <motion.button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-14 h-14 rounded-full bg-white/95 backdrop-blur-2xl border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:border-blue-200 transition-all duration-300 group shadow-xl z-10"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <svg 
              className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </motion.button>
        </div>

        {/* Pagination Dots */}
        <motion.div 
          className="flex justify-center gap-3 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                const newDirection = index > currentIndex ? 1 : -1;
                setDirection(newDirection);
                setCurrentIndex(index);
              }}
              className="relative group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-12' 
                    : 'bg-gray-300 group-hover:bg-gray-400'
                }`}
                layoutId={index === currentIndex ? 'activeDot' : undefined}
              />
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-40"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsCarousel
