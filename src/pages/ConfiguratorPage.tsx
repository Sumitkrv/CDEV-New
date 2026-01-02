import { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BookTestRideModal from '../components/booking/BookingModal'
import ConfiguratorComponent from '../components/configurator/Configurator'

const ConfiguratorPage = () => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="page-content">
        <ConfiguratorComponent />
      </main>

      <Footer />
      
      <BookTestRideModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </div>
  )
}

export default ConfiguratorPage
