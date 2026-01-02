import { motion } from 'framer-motion'
import { Zap, Battery, BoltIcon, Shield, Eye, Lightbulb } from 'lucide-react'

const AdvancedFeatures = () => {
  const performanceFeatures = [
    {
      icon: Zap,
      title: "Instant Torque",
      stat: "0-60 in 3.5s",
      description: "Experience lightning-fast acceleration with instant power delivery from 0 RPM."
    },
    {
      icon: Battery,
      title: "Extended Range",
      stat: "Up to 150km",
      description: "Go further with our advanced battery technology and efficient power management."
    },
    {
      icon: BoltIcon,
      title: "Fast Charging",
      stat: "80% in 1hr",
      description: "Get back on the road quickly with rapid charging capabilities."
    }
  ]

  const safetyFeatures = [
    {
      icon: Shield,
      title: "Advanced ABS",
      stat: "Emergency Ready",
      description: "Anti-lock Braking System ensures maximum control in emergency situations."
    },
    {
      icon: Eye,
      title: "Smart Sensors",
      stat: "360° Detection",
      description: "Multiple sensors monitor your surroundings for enhanced safety."
    },
    {
      icon: Lightbulb,
      title: "LED Lighting",
      stat: "Ultra Bright",
      description: "Bright LED headlights and taillights for maximum visibility."
    }
  ]

  return (
    <section id="advanced-features" className="py-32 bg-white relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="relative container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <h2 className="font-light text-5xl md:text-7xl tracking-tight mb-6 text-gray-900">
            Innovation Meets Performance
          </h2>
          <div className="w-16 h-px bg-black/20 mx-auto mb-8" />
          <p className="text-gray-600 font-light text-lg leading-relaxed max-w-3xl mx-auto">
            Discover the cutting-edge features that make our electric vehicles stand out. From advanced safety systems to smart connectivity, every detail is designed for your ultimate riding experience.
          </p>
        </motion.div>

        {/* Performance Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-4 mb-16"
          >
            <div className="w-12 h-12 border border-gray-200 flex items-center justify-center">
              <Zap className="w-6 h-6 text-gray-400" strokeWidth={1} />
            </div>
            <h3 className="font-light text-4xl tracking-tight text-gray-900">Performance</h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {performanceFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <div className="border border-gray-200 p-10 hover:border-gray-400 transition-colors duration-500">
                    <div className="w-16 h-16 border border-gray-200 flex items-center justify-center mb-8 group-hover:border-gray-400 transition-colors duration-500">
                      <IconComponent className="w-8 h-8 text-gray-400 group-hover:text-gray-900 transition-colors duration-500" strokeWidth={1} />
                    </div>
                    
                    <h4 className="font-light text-2xl mb-2 tracking-tight text-gray-900">{feature.title}</h4>
                    <div className="font-light text-4xl mb-6 text-gray-900">{feature.stat}</div>
                    <p className="text-gray-600 font-light text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Safety Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-4 mb-16"
          >
            <div className="w-12 h-12 border border-gray-200 flex items-center justify-center">
              <Shield className="w-6 h-6 text-gray-400" strokeWidth={1} />
            </div>
            <h3 className="font-light text-4xl tracking-tight text-gray-900">Safety</h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {safetyFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <div className="border border-gray-200 p-10 hover:border-gray-400 transition-colors duration-500">
                    <div className="w-16 h-16 border border-gray-200 flex items-center justify-center mb-8 group-hover:border-gray-400 transition-colors duration-500">
                      <IconComponent className="w-8 h-8 text-gray-400 group-hover:text-gray-900 transition-colors duration-500" strokeWidth={1} />
                    </div>
                    
                    <h4 className="font-light text-2xl mb-2 tracking-tight text-gray-900">{feature.title}</h4>
                    <div className="font-light text-4xl mb-6 text-gray-900">{feature.stat}</div>
                    <p className="text-gray-600 font-light text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdvancedFeatures
