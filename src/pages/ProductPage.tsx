import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BookTestRideModal from '../components/booking/BookingModal'
import Button from '../components/ui/Button'

interface ProductData {
  name: string
  tagline: string
  price: string
  range: string
  acceleration: string
  topSpeed: string
  battery: string
  charging: string
  power: string
  description: string
  features: string[]
}

const products: Record<string, ProductData> = {
  'urban-rider': {
    name: 'Urban Rider',
    tagline: 'Perfect for City Commutes',
    price: '$29,990',
    range: '200 km',
    acceleration: '0-60 in 5.2s',
    topSpeed: '120 km/h',
    battery: '50 kWh',
    charging: '20 min (fast charge)',
    power: '250 HP',
    description: 'The Urban Rider is designed for the modern city dweller. With its compact size and impressive range, it\'s perfect for daily commutes and urban adventures.',
    features: [
      'Advanced regenerative braking',
      'Smart city navigation',
      'Compact parking mode',
      'Urban sound system',
      'LED ambient lighting',
      'Smart climate control',
    ],
  },
  'city-cruiser': {
    name: 'City Cruiser',
    tagline: 'Balanced Performance & Range',
    price: '$39,990',
    range: '300 km',
    acceleration: '0-60 in 4.1s',
    topSpeed: '150 km/h',
    battery: '65 kWh',
    charging: '18 min (fast charge)',
    power: '350 HP',
    description: 'The City Cruiser strikes the perfect balance between performance and efficiency. It\'s the ideal choice for those who want more without compromise.',
    features: [
      'Dual motor all-wheel drive',
      'Advanced autopilot',
      'Premium sound system',
      'Panoramic glass roof',
      'Wireless charging',
      'Over-the-air updates',
    ],
  },
  'highway-master': {
    name: 'Highway Master',
    tagline: 'Ultimate Performance',
    price: '$49,990',
    range: '400 km',
    acceleration: '0-60 in 3.5s',
    topSpeed: '180 km/h',
    battery: '75 kWh',
    charging: '15 min (fast charge)',
    power: '450 HP',
    description: 'The Highway Master is our flagship model, delivering uncompromising performance and luxury. Experience the pinnacle of electric vehicle engineering.',
    features: [
      'Ludicrous mode acceleration',
      'Full self-driving capability',
      'Premium leather interior',
      'Advanced air suspension',
      'Track mode',
      'Carbon fiber accents',
    ],
  },
}

const ProductPage = () => {
  const { model } = useParams<{ model: string }>()
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const product = products[model || 'urban-rider']

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      
      <main className="pt-24 page-content">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 bg-electric-500/10 border border-electric-500/30 rounded-full text-electric-400 text-sm font-medium mb-6">
                  {product.tagline}
                </span>
                <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
                  {product.name}
                </h1>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => setIsBookModalOpen(true)} size="lg">
                    Book Test Ride
                  </Button>
                  <Button variant="secondary" size="lg">
                    Configure
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <div className="text-center">
                      <div className="text-8xl mb-4">⚡</div>
                      <p className="text-lg">{product.name}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section className="section-padding bg-slate-900">
          <div className="container-custom">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold text-center mb-16"
            >
              Technical <span className="gradient-text">Specifications</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Range', value: product.range, icon: '🔋' },
                { label: 'Acceleration', value: product.acceleration, icon: '🏁' },
                { label: 'Top Speed', value: product.topSpeed, icon: '⚡' },
                { label: 'Battery', value: product.battery, icon: '🔌' },
                { label: 'Charging', value: product.charging, icon: '⏱️' },
                { label: 'Power', value: product.power, icon: '⚙️' },
              ].map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-electric-500/50 transition-all"
                >
                  <div className="text-4xl mb-4">{spec.icon}</div>
                  <div className="text-slate-400 text-sm mb-2">{spec.label}</div>
                  <div className="text-2xl font-bold">{spec.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold text-center mb-16"
            >
              Premium <span className="gradient-text">Features</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-electric-500/50 transition-all"
                >
                  <div className="w-8 h-8 bg-electric-500/10 border border-electric-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-electric-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-slate-900 to-slate-950">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-electric-500/10 to-blue-500/10 border border-electric-500/30 rounded-3xl p-12 text-center"
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                Ready to Experience the {product.name}?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Book your test ride today and discover why thousands choose {product.name}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setIsBookModalOpen(true)} size="lg">
                  Book Test Ride
                </Button>
                <Button variant="secondary" size="lg">
                  View Pricing
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      
      <BookTestRideModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </div>
  )
}

export default ProductPage
