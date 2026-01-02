import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'

const USPFeatures = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
      title: "Saves Your Money",
      description: "No petrol expenses and low service costs. Charging is much cheaper than daily fuel refills.",
      gradient: "from-emerald-500/20 to-teal-500/20",
      stat: "₹0.5/km"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
      title: "Smooth & Quiet Ride",
      description: "No engine noise or vibration while riding. Enjoy a calm and comfortable city commute.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      stat: "30 dB"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
      title: "Easy to Maintain",
      description: "Fewer moving parts mean fewer breakdowns. Less servicing, more peace of mind.",
      gradient: "from-purple-500/20 to-pink-500/20",
      stat: "Low Cost"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ),
      title: "Eco-Friendly",
      description: "Zero emissions help reduce air pollution. A small choice that makes a big difference.",
      gradient: "from-orange-500/20 to-red-500/20",
      stat: "0 Emission"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      ),
      title: "Perfect for Daily City Use",
      description: "Ideal for office, college, and short trips. Easy to handle, easy to park anywhere.",
      gradient: "from-indigo-500/20 to-violet-500/20",
      stat: "City Ready"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: "Simple Charging",
      description: "Charge at home or work without hassle. No fuel queues, no waiting time.",
      gradient: "from-rose-500/20 to-pink-500/20",
      stat: "Home Charge"
    }
  ]

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
