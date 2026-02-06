import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

interface Feature {
  title: string
  description: string
  stat: string
  gradient: string
  icon?: JSX.Element
}

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

const USPFeatures = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [features, setFeatures] = useState<Feature[]>([])

  const defaultFeatures: Feature[] = []

  // Fetch features from Strapi
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get(`${STRAPI_URL}/api/home?populate[features]=*`)
        const data = response.data.data
        
        if (data.features && data.features.length > 0) {
          const fetchedFeatures = data.features.map((feature: any, index: number) => ({
            title: feature.title,
            description: feature.description,
            stat: feature.stat,
            gradient: feature.gradient || 'from-emerald-500/20 to-teal-500/20',
            icon: defaultFeatures[index % defaultFeatures.length]?.icon // Use default icons for now
          }))
          setFeatures(fetchedFeatures)
        } else {
          setFeatures(defaultFeatures)
        }
      } catch (err) {
        console.error('Error fetching features:', err)
        setFeatures([])
      }
    }
    
    fetchFeatures()
  }, [])

  return (
    <section id="features" className="relative py-32 bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      <div className="relative container-custom">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 text-center max-w-4xl mx-auto"
        >
          <h2 className="font-light text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 text-white">
            Why Choose <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
                Electric
              </span>
              <motion.span
                className="absolute inset-0 blur-xl bg-gradient-to-r from-emerald-400/40 to-green-400/40"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Electric
              </motion.span>
              <svg className="absolute -right-8 top-0 w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Zero emissions • Instant torque • <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent font-medium">
                Smart charging
              </span>
              <motion.span
                className="absolute inset-0 blur-lg bg-gradient-to-r from-emerald-400/30 to-green-400/30"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Smart charging
              </motion.span>
            </span> • Future-ready mobility
          </motion.p>
          
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full">
                {/* Gradient Glow */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700`}
                  animate={{
                    scale: hoveredIndex === index ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-white/10 group-hover:border-white/20 rounded-2xl p-8 md:p-10 transition-all duration-500 h-full">
                  {/* Icon Container */}
                  <motion.div
                    className="mb-8 relative inline-block"
                    animate={{
                      scale: hoveredIndex === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                      <div className="relative w-20 h-20 rounded-2xl border border-white/10 group-hover:border-white/20 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-colors duration-500">
                        <div className="text-white/60 group-hover:text-white transition-colors duration-500">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      x: hoveredIndex === index ? 0 : -10
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-8 right-8"
                  >
                    <div className={`px-4 py-2 bg-gradient-to-r ${feature.gradient} backdrop-blur-sm border border-white/20 rounded-full`}>
                      <span className="text-xs font-medium text-white">
                        {feature.stat}
                      </span>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="font-light text-2xl md:text-3xl text-white tracking-tight group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-white/60 group-hover:text-white/70 font-light text-base leading-relaxed transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <motion.div
                    className="mt-8 flex items-center gap-2 text-white/40 group-hover:text-white/80 transition-colors duration-300"
                    animate={{
                      x: hoveredIndex === index ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm font-light">Learn more</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </motion.div>

                  {/* Bottom Accent Line */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-2xl`}
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <p className="text-white/40 text-sm mb-8">
            Experience the future of mobility • Join thousands of satisfied riders
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-5 bg-white text-black rounded-full font-medium text-sm tracking-wider uppercase shadow-2xl shadow-white/20 hover:shadow-white/30 transition-shadow duration-500"
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default USPFeatures
