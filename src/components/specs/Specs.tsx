import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Spec {
  icon: string
  label: string
  value: string
  unit: string
  description: string
}

const specs: Spec[] = [
  {
    icon: '🔋',
    label: 'Battery Capacity',
    value: '75',
    unit: 'kWh',
    description: 'High-density lithium-ion battery',
  },
  {
    icon: '⚡',
    label: 'Power Output',
    value: '450',
    unit: 'HP',
    description: 'Dual motor all-wheel drive',
  },
  {
    icon: '🏁',
    label: 'Top Speed',
    value: '180',
    unit: 'km/h',
    description: 'Electronically limited',
  },
  {
    icon: '🔌',
    label: 'Fast Charging',
    value: '15',
    unit: 'min',
    description: '10-80% in 15 minutes',
  },
  {
    icon: '📏',
    label: 'Range',
    value: '400',
    unit: 'km',
    description: 'WLTP certified range',
  },
  {
    icon: '⏱️',
    label: 'Acceleration',
    value: '3.5',
    unit: 'sec',
    description: '0-60 km/h acceleration',
  },
]

const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / (duration * 1000)

      if (progress < 1) {
        setCount(Math.floor(end * progress))
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return <span ref={ref}>{count}</span>
}

const SpecificationsSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-gray-900 via-primary to-gray-900">
      <div className="container-custom\">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-medium mb-4">
            Technical Excellence
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">
            Engineered for <span className="text-accent">Performance</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Every specification tells a story of innovation, precision, and uncompromising quality.
          </p>
        </motion.div>

        {/* Specs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-electric-500/50 transition-all duration-500">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-5xl mb-4"
                >
                  {spec.icon}
                </motion.div>

                {/* Label */}
                <div className="text-slate-400 text-sm mb-2">{spec.label}</div>

                {/* Value with animated counter */}
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-5xl font-bold gradient-text">
                    <AnimatedCounter end={parseFloat(spec.value)} duration={2} />
                  </span>
                  <span className="text-2xl text-electric-400 font-semibold">{spec.unit}</span>
                </div>

                {/* Description */}
                <p className="text-slate-500 text-sm">{spec.description}</p>

                {/* Hover glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-electric-500/5 rounded-2xl pointer-events-none -z-10 blur-xl"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden">
            <div className="p-8">
              <h3 className="font-display text-2xl font-bold mb-8 text-center">
                Compare Our Models
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-4 px-6 text-slate-400 font-medium">Feature</th>
                      <th className="text-center py-4 px-6 font-display font-semibold">Urban Rider</th>
                      <th className="text-center py-4 px-6 font-display font-semibold">City Cruiser</th>
                      <th className="text-center py-4 px-6 font-display font-semibold text-electric-400">Highway Master</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="py-4 px-6 text-slate-400">Range</td>
                      <td className="py-4 px-6 text-center">200 km</td>
                      <td className="py-4 px-6 text-center">300 km</td>
                      <td className="py-4 px-6 text-center font-semibold text-electric-400">400 km</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-slate-400">0-60 km/h</td>
                      <td className="py-4 px-6 text-center">5.2 sec</td>
                      <td className="py-4 px-6 text-center">4.1 sec</td>
                      <td className="py-4 px-6 text-center font-semibold text-electric-400">3.5 sec</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-slate-400">Top Speed</td>
                      <td className="py-4 px-6 text-center">120 km/h</td>
                      <td className="py-4 px-6 text-center">150 km/h</td>
                      <td className="py-4 px-6 text-center font-semibold text-electric-400">180 km/h</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-slate-400">Battery</td>
                      <td className="py-4 px-6 text-center">50 kWh</td>
                      <td className="py-4 px-6 text-center">65 kWh</td>
                      <td className="py-4 px-6 text-center font-semibold text-electric-400">75 kWh</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-slate-400">Price</td>
                      <td className="py-4 px-6 text-center">$29,990</td>
                      <td className="py-4 px-6 text-center">$39,990</td>
                      <td className="py-4 px-6 text-center font-semibold text-electric-400">$49,990</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SpecificationsSection
