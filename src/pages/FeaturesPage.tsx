import { motion } from 'framer-motion'
import { Zap, Battery, BoltIcon, Shield, Eye, Lightbulb, Smartphone, Gauge, MapPin, Armchair, Package, Volume2, Leaf, Recycle, Battery as BatteryIcon, Home, Wrench, Key, ArrowRight } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const FeaturesPage = () => {
  const features = [
    {
      category: 'Performance',
      icon: Zap,
      items: [
        {
          title: 'Instant Torque',
          description: 'Experience lightning-fast acceleration with instant power delivery from 0 RPM.',
          metric: '0-60 in 3.5s',
          icon: BoltIcon,
        },
        {
          title: 'Extended Range',
          description: 'Go further with our advanced battery technology and efficient power management.',
          metric: 'Up to 150km',
          icon: Battery,
        },
        {
          title: 'Fast Charging',
          description: 'Get back on the road quickly with rapid charging capabilities.',
          metric: '80% in 1hr',
          icon: Zap,
        },
      ],
    },
    {
      category: 'Safety',
      icon: Shield,
      items: [
        {
          title: 'Advanced ABS',
          description: 'Anti-lock Braking System ensures maximum control in emergency situations.',
          metric: 'Emergency Ready',
          icon: Shield,
        },
        {
          title: 'Smart Sensors',
          description: 'Multiple sensors monitor your surroundings for enhanced safety.',
          metric: '360° Detection',
          icon: Eye,
        },
        {
          title: 'LED Lighting',
          description: 'Bright LED headlights and taillights for maximum visibility day and night.',
          metric: 'Ultra Bright',
          icon: Lightbulb,
        },
      ],
    },
    {
      category: 'Technology',
      icon: Smartphone,
      items: [
        {
          title: 'Smart Connectivity',
          description: 'Connect your smartphone for navigation, music, and vehicle diagnostics.',
          metric: 'App Connected',
          icon: Smartphone,
        },
        {
          title: 'Digital Dashboard',
          description: 'Full-color TFT display shows all vital information at a glance.',
          metric: '5" HD Display',
          icon: Gauge,
        },
        {
          title: 'GPS Tracking',
          description: 'Real-time location tracking and anti-theft features for peace of mind.',
          metric: 'Always Located',
          icon: MapPin,
        },
      ],
    },
    {
      category: 'Comfort',
      icon: Armchair,
      items: [
        {
          title: 'Ergonomic Design',
          description: 'Carefully crafted seating position for maximum comfort on long rides.',
          metric: 'All-Day Comfort',
          icon: Armchair,
        },
        {
          title: 'Storage Space',
          description: 'Generous under-seat storage and optional side panniers for your belongings.',
          metric: '28L Capacity',
          icon: Package,
        },
        {
          title: 'Silent Operation',
          description: 'Virtually silent motor operation for a peaceful riding experience.',
          metric: '<50dB',
          icon: Volume2,
        },
      ],
    },
    {
      category: 'Sustainability',
      icon: Leaf,
      items: [
        {
          title: 'Zero Emissions',
          description: 'Completely emission-free operation helps reduce your carbon footprint.',
          metric: '0g CO₂',
          icon: Leaf,
        },
        {
          title: 'Recyclable Materials',
          description: 'Built with sustainable and recyclable materials wherever possible.',
          metric: '85% Recyclable',
          icon: Recycle,
        },
        {
          title: 'Energy Efficient',
          description: 'Advanced regenerative braking recovers energy during deceleration.',
          metric: 'Regen Braking',
          icon: BatteryIcon,
        },
      ],
    },
    {
      category: 'Convenience',
      icon: Key,
      items: [
        {
          title: 'Home Charging',
          description: 'Charge overnight using standard household power outlets.',
          metric: 'Plug & Play',
          icon: Home,
        },
        {
          title: 'Low Maintenance',
          description: 'Fewer moving parts mean less maintenance and lower running costs.',
          metric: 'Service-Free',
          icon: Wrench,
        },
        {
          title: 'Keyless Entry',
          description: 'Smart key system for hassle-free access and ignition.',
          metric: 'Touch & Go',
          icon: Key,
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="page-content">
        {/* Hero Section */}
        <section className="py-32 bg-white bg-grid-pattern">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-light text-5xl md:text-7xl tracking-tight text-gray-900 mb-6">
                Advanced Features
              </h1>
              <div className="w-16 h-px bg-gray-900 mx-auto mb-6" />
              <p className="font-light text-gray-600 text-lg max-w-3xl mx-auto">
                Discover the cutting-edge features that make our electric vehicles stand out. 
                From advanced safety systems to smart connectivity, every detail is designed for your ultimate riding experience.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        {features.map((category, categoryIndex) => {
          const CategoryIcon = category.icon
          return (
            <section 
              key={category.category} 
              className={`py-32 ${
                categoryIndex % 2 === 0 
                  ? 'bg-black text-white' 
                  : 'bg-white bg-grid-pattern text-gray-900'
              }`}
            >
              <div className="container-custom">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-20"
                >
                  <div className={`w-12 h-12 mx-auto mb-6 border flex items-center justify-center ${
                    categoryIndex % 2 === 0 ? 'border-zinc-800' : 'border-gray-200'
                  }`}>
                    <CategoryIcon strokeWidth={1} className="w-6 h-6" />
                  </div>
                  <h2 className="font-light text-4xl tracking-tight mb-4">
                    {category.category}
                  </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px">
                  {category.items.map((item, index) => {
                    const ItemIcon = item.icon
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`group p-8 border transition-all duration-300 ${
                          categoryIndex % 2 === 0
                            ? 'bg-black border-zinc-800 hover:border-white/40'
                            : 'bg-white border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                            categoryIndex % 2 === 0
                              ? 'border-zinc-800 group-hover:border-white'
                              : 'border-gray-200 group-hover:border-gray-900'
                          }`}>
                            <ItemIcon strokeWidth={1} className="w-6 h-6" />
                          </div>
                          <span className={`px-3 py-1 border text-xs font-light whitespace-nowrap ${
                            categoryIndex % 2 === 0 ? 'border-zinc-800' : 'border-gray-200'
                          }`}>
                            {item.metric}
                          </span>
                        </div>
                        <h3 className="font-light text-xl tracking-tight mb-3">
                          {item.title}
                        </h3>
                        <p className={`font-light leading-relaxed ${
                          categoryIndex % 2 === 0 ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {item.description}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </section>
          )
        })}

        {/* CTA Section */}
        <section className="py-32 bg-black text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-light text-4xl md:text-5xl tracking-tight mb-6">
                Experience It Yourself
              </h2>
              <p className="font-light text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                The best way to understand our features is to test ride one of our vehicles. 
                Book your test ride today and discover the future of mobility.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button className="group px-8 py-4 bg-white text-black font-light hover:bg-gray-100 transition-all duration-300 flex items-center gap-2">
                  Book Test Ride
                  <ArrowRight strokeWidth={1} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group px-8 py-4 border border-zinc-800 text-white font-light hover:border-white transition-all duration-300 flex items-center gap-2">
                  View Models
                  <ArrowRight strokeWidth={1} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default FeaturesPage
