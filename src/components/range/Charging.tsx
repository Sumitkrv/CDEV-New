import { motion } from 'framer-motion'
import { MapPin, Zap, Battery, Home, BoltIcon, RefreshCw } from 'lucide-react'

const RangeChargingSection = () => {
  const rangeStats = [
    {
      value: "120 km",
      label: "Max Range Per Charge",
      icon: MapPin
    },
    {
      value: "₹0.5/km",
      label: "Running Cost",
      icon: Zap
    },
    {
      value: "3 Years",
      label: "Battery Warranty",
      icon: Battery
    }
  ]

  const chargingOptions = [
    {
      type: "Home Charging",
      time: "4-6 hours",
      icon: Home,
      description: "Charge overnight with standard 5A socket"
    },
    {
      type: "Fast Charging",
      time: "1-2 hours",
      icon: Zap,
      description: "Quick charge at our charging stations"
    },
    {
      type: "Battery Swap",
      time: "2 minutes",
      icon: RefreshCw,
      description: "Instant battery replacement at swap stations"
    }
  ]

  return (
    <section id="range-charging" className="py-32 bg-white text-gray-900 relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="relative container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <h2 className="font-light text-5xl md:text-7xl tracking-tight mb-6">
            Range & Charging
          </h2>
          <div className="w-16 h-px bg-black/20 mx-auto" />
        </motion.div>

        {/* Range Stats */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-32">
          {rangeStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mb-8 flex justify-center"
                >
                  <div className="w-16 h-16 border border-gray-200 flex items-center justify-center group-hover:border-gray-400 transition-colors duration-500">
                    <IconComponent className="w-8 h-8 text-gray-400 group-hover:text-gray-900 transition-colors duration-500" strokeWidth={1} />
                  </div>
                </motion.div>
                <div className="font-light text-5xl md:text-6xl mb-3 tracking-tight text-gray-900">{stat.value}</div>
                <div className="text-gray-500 text-xs uppercase tracking-widest font-light">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Charging Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {chargingOptions.map((option, index) => {
            const IconComponent = option.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="border border-gray-200 p-10 hover:border-gray-400 transition-colors duration-500 group"
              >
                <div className="w-12 h-12 border border-gray-200 flex items-center justify-center mb-8 group-hover:border-gray-400 transition-colors duration-500">
                  <IconComponent className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-colors duration-500" strokeWidth={1} />
                </div>
                <h3 className="font-light text-2xl mb-4 tracking-tight text-gray-900">{option.type}</h3>
                <div className="font-light text-4xl mb-6 text-gray-900">{option.time}</div>
                <p className="text-gray-600 font-light text-sm leading-relaxed">{option.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Charging Network */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="border-t border-gray-200 pt-24"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="font-light text-4xl md:text-5xl tracking-tight mb-8 leading-tight text-gray-900">
                Expanding<br />Charging Network
              </h3>
            </div>
            <div className="space-y-10">
              {[
                { icon: MapPin, value: "500+", label: "Charging Stations" },
                { icon: MapPin, value: "50+", label: "Cities Covered" },
                { icon: RefreshCw, value: "24/7", label: "Support Available" }
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="flex items-start space-x-6 group"
                  >
                    <div className="w-12 h-12 border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-gray-400 transition-colors duration-500">
                      <IconComponent className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-colors duration-500" strokeWidth={1} />
                    </div>
                    <div>
                      <div className="font-light text-4xl mb-2 text-gray-900">{item.value}</div>
                      <div className="text-gray-500 text-xs uppercase tracking-widest font-light">{item.label}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default RangeChargingSection
