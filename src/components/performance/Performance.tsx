import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'

interface PerformanceFeature {
  title: string
  description: string
  icon: JSX.Element
  stats: string
  detail: string
  gradient: string
  metric: string
}

const features: PerformanceFeature[] = [
  {
    title: 'Limitless Range',
    description: 'Push boundaries with cutting-edge lithium-ion technology and predictive energy optimization that adapts to your driving style, terrain, and conditions in real-time.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
      </svg>
    ),
    stats: '400+',
    detail: 'km per charge',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    metric: 'Range'
  },
  {
    title: 'Lightning Fast Charging',
    description: 'Revolutionary ultra-rapid charging infrastructure compatibility ensures minimal downtime. Get back to what matters most—the journey ahead.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    stats: '15',
    detail: 'min to 80% charge',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    metric: 'Speed'
  },
  {
    title: 'Intelligent Battery System',
    description: 'Neural network-powered battery management with thermal optimization and predictive maintenance algorithms ensures peak performance across every climate and condition.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a3 3 0 003-3V7.5a3 3 0 00-3-3H6.75a3 3 0 00-3 3v9a3 3 0 003 3z" />
      </svg>
    ),
    stats: '10',
    detail: 'years warranty',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    metric: 'Durability'
  },
  {
    title: 'Precision Power Delivery',
    description: 'Aerospace-grade motor architecture delivers instantaneous torque vectoring, supreme handling dynamics, and confidence-inspiring grip in any weather.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    stats: '450',
    detail: 'HP peak power',
    gradient: 'from-purple-500/20 to-pink-500/20',
    metric: 'Performance'
  },
]

const PerformanceSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef(null)
  
  return (
    <section ref={sectionRef} id="performance" className="relative py-32 bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
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
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6 px-6 py-2 border border-white/10 rounded-full"
          >
            <span className="text-xs tracking-widest uppercase text-white/60">
              Engineered Excellence
            </span>
          </motion.div>
          
          <h2 className="font-light text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6">
            Performance
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Where power meets precision in perfect harmony
          </motion.p>
          
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>

        {/* Features Grid with 3D Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-32">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
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
                  className={`absolute -inset-1 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700`}
                  animate={{
                    scale: hoveredIndex === index ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-white/10 group-hover:border-white/20 rounded-3xl p-8 md:p-10 transition-all duration-500 h-full">
                  {/* Top Section: Icon and Metric Badge */}
                  <div className="flex items-start justify-between mb-8">
                    {/* Icon Container */}
                    <motion.div
                      animate={{
                        scale: hoveredIndex === index ? 1.05 : 1,
                        rotate: hoveredIndex === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500`} />
                        <div className="relative w-20 h-20 rounded-2xl border border-white/10 group-hover:border-white/30 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-500">
                          <div className="text-white/60 group-hover:text-white transition-colors duration-500">
                            {feature.icon}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Metric Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: hoveredIndex === index ? 1 : 0.6,
                        scale: hoveredIndex === index ? 1 : 0.95
                      }}
                      transition={{ duration: 0.3 }}
                      className={`px-4 py-2 bg-gradient-to-r ${feature.gradient} backdrop-blur-sm border border-white/20 rounded-full`}
                    >
                      <span className="text-xs font-medium text-white tracking-wider uppercase">
                        {feature.metric}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <h3 className="font-light text-2xl md:text-3xl text-white tracking-tight group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-white/60 group-hover:text-white/70 font-light text-base leading-relaxed transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Stats Divider */}
                    <div className="pt-6 border-t border-white/10 group-hover:border-white/20 transition-colors duration-500">
                      <div className="flex items-baseline gap-3">
                        <motion.div 
                          className="font-light text-5xl md:text-6xl text-white"
                          animate={{
                            scale: hoveredIndex === index ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.stats}
                        </motion.div>
                        <div className="text-white/40 text-sm font-light">{feature.detail}</div>
                      </div>
                    </div>

                    {/* Progress Bar Animation */}
                    <motion.div
                      className="h-1 bg-white/5 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${feature.gradient}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </motion.div>
                  </div>

                  {/* Corner Accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-24 h-24 rounded-bl-full"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 0.1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: `linear-gradient(135deg, transparent 50%, ${hoveredIndex === index ? 'rgba(255,255,255,0.1)' : 'transparent'} 50%)`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Performance Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative Line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />

          <div className="pt-24 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Heading */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-8"
              >
                <h3 className="font-light text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight">
                  Built to<br />
                  <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                    Perfection
                  </span>
                </h3>
                
                <p className="text-white/50 font-light text-lg leading-relaxed max-w-md">
                  Every component meticulously engineered and rigorously tested to deliver exceptional performance across all conditions.
                </p>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group mt-8 px-8 py-4 border border-white/20 hover:border-white/40 rounded-full transition-all duration-500 flex items-center gap-3"
                >
                  <span className="text-sm font-light tracking-wider uppercase text-white">
                    Explore Technology
                  </span>
                  <motion.svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </motion.svg>
                </motion.button>
              </motion.div>
            </div>

            {/* Right: Enhanced Stats Grid */}
            <div className="grid grid-cols-2 gap-8 lg:gap-12">
              {[
                { 
                  label: 'Efficiency', 
                  value: '98', 
                  unit: '%',
                  delay: 0.4,
                  gradient: 'from-emerald-500/20 to-teal-500/20',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  )
                },
                { 
                  label: 'Reliability', 
                  value: '99.9', 
                  unit: '%',
                  delay: 0.5,
                  gradient: 'from-blue-500/20 to-cyan-500/20',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                { 
                  label: 'Safety', 
                  value: '5', 
                  unit: '★',
                  delay: 0.6,
                  gradient: 'from-yellow-500/20 to-orange-500/20',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  )
                },
                { 
                  label: 'Emissions', 
                  value: '0', 
                  unit: 'g',
                  delay: 0.7,
                  gradient: 'from-emerald-500/20 to-green-500/20',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  )
                },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: stat.delay, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  {/* Gradient Glow */}
                  <div className={`absolute -inset-2 bg-gradient-to-br ${stat.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  
                  <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-white/10 group-hover:border-white/20 rounded-2xl p-6 transition-all duration-500">
                    {/* Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-white/40 group-hover:text-white/60 transition-colors duration-300">
                        {stat.icon}
                      </div>
                      <div className={`px-3 py-1 bg-gradient-to-r ${stat.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                        <span className="text-[10px] font-medium text-white uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                    </div>

                    {/* Label */}
                    <div className="text-white/40 text-xs uppercase tracking-widest font-light mb-3">
                      {stat.label}
                    </div>

                    {/* Value */}
                    <div className="flex items-baseline gap-1">
                      <motion.div 
                        className="font-light text-5xl lg:text-6xl tracking-tight text-white"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: stat.delay + 0.2, duration: 0.5 }}
                      >
                        {stat.value}
                      </motion.div>
                      <span className="text-2xl text-white/60 font-light">{stat.unit}</span>
                    </div>

                    {/* Progress Indicator */}
                    <motion.div
                      className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: stat.delay + 0.3 }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${stat.gradient}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: stat.delay + 0.4, duration: 1 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PerformanceSection
