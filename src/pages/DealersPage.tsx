import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { MapPin, Phone, Clock, Mail, Search, ArrowRight } from 'lucide-react'
import L from 'leaflet'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BookTestRideModal from '../components/booking/BookingModal'

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface Dealer {
  id: string
  name: string
  address: string
  city: string
  state: string
  phone: string
  email: string
  hours: string
  services: string[]
  lat: number
  lng: number
}

const dealers: Dealer[] = [
  {
    id: '1',
    name: 'Consider Done SF Downtown',
    address: '123 Market Street',
    city: 'San Francisco',
    state: 'CA',
    phone: '+1 (415) 555-0100',
    email: 'sf-downtown@considerdone.ev',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
    services: ['Sales', 'Test Rides', 'Service Center', 'Parts'],
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: '2',
    name: 'Consider Done LA West',
    address: '456 Wilshire Blvd',
    city: 'Los Angeles',
    state: 'CA',
    phone: '+1 (310) 555-0200',
    email: 'la-west@considerdone.ev',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
    services: ['Sales', 'Test Rides', 'Service Center'],
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    id: '3',
    name: 'Consider Done Seattle',
    address: '789 Pine Street',
    city: 'Seattle',
    state: 'WA',
    phone: '+1 (206) 555-0300',
    email: 'seattle@considerdone.ev',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
    services: ['Sales', 'Test Rides', 'Service Center', 'Parts'],
    lat: 47.6062,
    lng: -122.3321,
  },
  {
    id: '4',
    name: 'Consider Done Austin',
    address: '321 Congress Avenue',
    city: 'Austin',
    state: 'TX',
    phone: '+1 (512) 555-0400',
    email: 'austin@considerdone.ev',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
    services: ['Sales', 'Test Rides', 'Service Center'],
    lat: 30.2672,
    lng: -97.7431,
  },
  {
    id: '5',
    name: 'Consider Done NYC',
    address: '555 5th Avenue',
    city: 'New York',
    state: 'NY',
    phone: '+1 (212) 555-0500',
    email: 'nyc@considerdone.ev',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
    services: ['Sales', 'Test Rides', 'Service Center', 'Parts'],
    lat: 40.7128,
    lng: -74.0060,
  },
  {
    id: '6',
    name: 'Consider Done Portland',
    address: '888 SW Morrison St',
    city: 'Portland',
    state: 'OR',
    phone: '+1 (503) 555-0600',
    email: 'portland@considerdone.ev',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
    services: ['Sales', 'Test Rides', 'Service Center'],
    lat: 45.5152,
    lng: -122.6784,
  },
]

const DealersPage = () => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDealers = dealers.filter(
    (dealer) =>
      dealer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="page-content">
        {/* Header Section */}
        <section className="py-32 bg-white relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
          
          <div className="relative container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-light text-5xl md:text-7xl tracking-tight mb-6 text-gray-900">
                Visit Our Showrooms
              </h1>
              <div className="w-16 h-px bg-black/20 mx-auto mb-8" />
              <p className="text-gray-600 font-light text-xl leading-relaxed max-w-2xl mx-auto mb-16">
                Experience our vehicles in person. Find the nearest Consider Done showroom and book a test ride.
              </p>

              {/* Search */}
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by city or state..."
                    className="w-full px-0 py-4 pl-12 bg-transparent border-b border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors font-light"
                  />
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1} />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Map */}
        <section className="py-32 bg-black relative">
          <div className="relative container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="border border-zinc-800 overflow-hidden h-[600px]"
            >
              <MapContainer
                center={[39.8283, -98.5795]}
                zoom={4}
                style={{ height: '100%', width: '100%' }}
                className="grayscale"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredDealers.map((dealer) => (
                  <Marker key={dealer.id} position={[dealer.lat, dealer.lng]}>
                    <Popup>
                      <div className="font-light">
                        <h3 className="font-normal text-sm mb-2">{dealer.name}</h3>
                        <p className="text-xs text-gray-600 mb-1">{dealer.address}</p>
                        <p className="text-xs text-gray-600 mb-2">{dealer.city}, {dealer.state}</p>
                        <a href={`tel:${dealer.phone}`} className="text-xs text-black hover:underline">{dealer.phone}</a>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </motion.div>
          </div>
        </section>

        {/* Dealers List */}
        <section className="py-32 bg-white relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
          
          <div className="relative container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDealers.map((dealer, index) => (
                <motion.div
                  key={dealer.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="border border-gray-200 p-8 hover:border-gray-400 transition-colors duration-500 group"
                >
                  <h3 className="font-light text-2xl tracking-tight text-gray-900 mb-8">{dealer.name}</h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-gray-400 transition-colors duration-500">
                        <MapPin className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors duration-500" strokeWidth={1} />
                      </div>
                      <div className="text-gray-600 font-light text-sm leading-relaxed">
                        <div>{dealer.address}</div>
                        <div>{dealer.city}, {dealer.state}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-gray-400 transition-colors duration-500">
                        <Phone className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors duration-500" strokeWidth={1} />
                      </div>
                      <a href={`tel:${dealer.phone}`} className="text-gray-600 font-light text-sm hover:text-gray-900 transition-colors">{dealer.phone}</a>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-gray-400 transition-colors duration-500">
                        <Clock className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors duration-500" strokeWidth={1} />
                      </div>
                      <span className="text-gray-600 font-light text-sm">{dealer.hours}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-gray-400 transition-colors duration-500">
                        <Mail className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors duration-500" strokeWidth={1} />
                      </div>
                      <a href={`mailto:${dealer.email}`} className="text-gray-600 font-light text-sm hover:text-gray-900 transition-colors">{dealer.email}</a>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {dealer.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 border border-gray-200 text-gray-600 text-xs font-light"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <button className="w-full group/btn flex items-center justify-center space-x-2 py-3 border border-gray-200 text-gray-900 hover:border-gray-400 transition-colors duration-300">
                    <span className="font-light">Book Visit</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" strokeWidth={1} />
                  </button>
                </motion.div>
              ))}
            </div>

            {filteredDealers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 font-light text-lg">No dealers found matching your search.</p>
              </div>
            )}
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

export default DealersPage
