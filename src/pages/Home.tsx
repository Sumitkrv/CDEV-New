import { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/hero/Hero'
import ProductShowcase from '../components/product/Products'
import ProductGallery from '../components/product/ProductGallery'
import USPFeatures from '../components/features/Features'
import FAQSection from '../components/faq/FAQ'
import BookTestRideModal from '../components/booking/BookingModal'

const Home = () => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection onBookTestRide={() => setIsBookModalOpen(true)} />
        <ProductShowcase />
        <ProductGallery />
        <USPFeatures />
        <FAQSection />
      </main>

      <Footer />
      
      <BookTestRideModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </div>
  )
}

export default Home
