import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'

const SustainabilitySection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const sectionRef = useRef(null)

  const impacts = [
    {
      value: "0",
      unit: "kg",
      label: "CO₂ Emissions",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ),
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      value: "80",
      unit: "%",
      label: "Cost Savings",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      value: "100",
      unit: "%",
      label: "Electric Power",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      gradient: "from-yellow-500/20 to-orange-500/20"
    },
    {
      value: "5000",
      unit: "+",
      label: "Trees Equivalent",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
      ),
      gradient: "from-green-500/20 to-emerald-500/20"
    }
  ]

  const whyElectricCards = [
    {
      title: 'Saves Your Money',
      description: 'No petrol expenses and low service costs. Charging is much cheaper than daily fuel refills.',
      image: '/images/CD_EV15868.jpg',
      stat: '₹0.5/km',
      gradient: 'from-emerald-500/20 to-teal-500/20'
    },
    {
      title: 'Smooth & Quiet Ride',
      description: 'No engine noise or vibration while riding. Enjoy a calm and comfortable city commute.',
      image: '/images/CD_EV15890.jpg',
      stat: '30 dB',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      title: 'Easy to Maintain',
      description: 'Fewer moving parts mean fewer breakdowns. Less servicing, more peace of mind.',
      image: '/images/CD_EV15914.jpg',
      stat: 'Low Cost',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      title: 'Eco-Friendly',
      description: 'Zero emissions help reduce air pollution. A small choice that makes a big difference.',
      image: '/images/CD_EV15916.jpg',
      stat: '0 Emission',
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
      title: 'Perfect for Daily City Use',
      description: 'Ideal for office, college, and short trips. Easy to handle, easy to park anywhere.',
      image: '/images/CD_EV15919.jpg',
      stat: 'City Ready',
      gradient: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      title: 'Simple Charging',
      description: 'Charge at home or work without hassle. No fuel queues, no waiting time.',
      image: '/images/CD_EV15923.jpg',
      stat: 'Home Charge',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
  ]

  const commitments = [
    {
      text: "Recyclable battery technology with 95% material recovery",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      )
    },
    {
      text: "Solar-powered charging stations across India",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      )
    },
    {
      text: "Carbon-neutral manufacturing process",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    },
    {
      text: "Sustainable supply chain partnerships",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      )
    }
  ]

  return (
    <section ref={sectionRef} id="why-electric" className="relative py-32 bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
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
            className="inline-block mb-6 px-6 py-2 border border-gray-200 rounded-full"
          >
            <span className="text-xs tracking-widest uppercase text-gray-600">
              Sustainable Future
            </span>
          </motion.div>
          
          <h2 className="font-light text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 text-gray-900">
            Drive the Change
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Join the revolution towards sustainable mobility and a cleaner tomorrow
          </motion.p>
          
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>

        {/* Enhanced Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {whyElectricCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ 
                delay: index * 0.12, 
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group"
            >
              <div className="relative h-full">
                {/* Gradient Glow */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-br ${card.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700`}
                  animate={{
                    scale: hoveredCard === index ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <div className="relative overflow-hidden rounded-3xl h-[450px] border border-gray-200 group-hover:border-gray-300 transition-colors duration-500">
                  {/* Background Image */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      scale: hoveredCard === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
                  </motion.div>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: hoveredCard === index ? '100%' : '-100%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                  />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
                    <motion.div
                      animate={{
                        y: hoveredCard === index ? -10 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Badge */}
                      <motion.span 
                        className={`inline-block px-4 py-2 bg-gradient-to-r ${card.gradient} backdrop-blur-md border border-white/20 rounded-full text-sm font-medium text-white mb-6`}
                        animate={{
                          scale: hoveredCard === index ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {card.stat}
                      </motion.span>
                      
                      <h3 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">{card.title}</h3>
                      <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">{card.description}</p>
                      
                      <motion.div
                        className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors duration-300"
                        animate={{
                          x: hoveredCard === index ? 10 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-sm font-light tracking-wider uppercase">Discover More</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              {/* Gradient Glow */}
              <div className={`absolute -inset-2 bg-gradient-to-br ${impact.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
              
              <div className="relative bg-white border border-gray-200 group-hover:border-gray-300 rounded-2xl p-6 md:p-8 transition-all duration-500 text-center">
                {/* Icon */}
                <motion.div 
                  className="mb-6 flex justify-center"
                  animate={{
                    scale: hoveredStat === index ? 1.1 : 1,
                    rotate: hoveredStat === index ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${impact.gradient} rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                    <div className="relative w-16 h-16 rounded-xl border border-gray-200 group-hover:border-gray-300 flex items-center justify-center bg-white transition-colors duration-500">
                      <div className="text-gray-500 group-hover:text-gray-900 transition-colors duration-500">
                        {impact.icon}
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Value */}
                <div className="flex items-baseline justify-center gap-1 mb-3">
                  <motion.div 
                    className="font-light text-4xl md:text-5xl text-gray-900 tracking-tight"
                    animate={{
                      scale: hoveredStat === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {impact.value}
                  </motion.div>
                  <span className="text-2xl text-gray-600 font-light">{impact.unit}</span>
                </div>
                
                {/* Label */}
                <div className="text-gray-600 text-xs uppercase tracking-widest font-light">{impact.label}</div>
                
                {/* Progress Bar */}
                <motion.div
                  className="mt-6 h-1 bg-gray-100 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredStat === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`h-full bg-gradient-to-r ${impact.gradient}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredStat === index ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ transformOrigin: 'left' }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Environmental Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          {/* Decorative Line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />

          <div className="pt-24 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h3 className="font-light text-4xl md:text-5xl lg:text-6xl tracking-tight text-gray-900 mb-6 leading-tight">
                Our Environmental
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Commitment
                </span>
              </h3>
              <p className="text-gray-600 font-light text-lg leading-relaxed">
                Building a sustainable future, one innovation at a time
              </p>
            </motion.div>
            
            <div className="space-y-6">
              {commitments.map((commitment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="text-emerald-600">
                        {commitment.icon}
                      </div>
                    </div>
                    <p className="text-gray-700 font-light text-base md:text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-300 pt-1">
                      {commitment.text}
                    </p>
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

export default SustainabilitySection
