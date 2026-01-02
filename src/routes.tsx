import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/Home'))
const EcoRiderPage = lazy(() => import('./pages/EcoRiderPage'))
const CityProPage = lazy(() => import('./pages/CityProPage'))
const VelocityXPage = lazy(() => import('./pages/VelocityXPage'))
const ConfiguratorPage = lazy(() => import('./pages/ConfiguratorPage'))
const DealersPage = lazy(() => import('./pages/DealersPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/eco-rider" element={<EcoRiderPage />} />
        <Route path="/product/city-pro" element={<CityProPage />} />
        <Route path="/product/velocity-x" element={<VelocityXPage />} />
        <Route path="/configurator" element={<ConfiguratorPage />} />
        <Route path="/dealers" element={<DealersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
