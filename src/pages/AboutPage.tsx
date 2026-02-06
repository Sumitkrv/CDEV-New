import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, Zap, Users, Award, ArrowRight } from 'lucide-react'
import axios from 'axios'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

interface Section {
  id: number
  title: string
  description: string
  image: {
    url: string
    alternativeText?: string
  } | null
  icon: string
}

interface AboutData {
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  ctaTitle: string
  ctaDescription: string
  sections: Section[]
}

const iconMap: Record<string, any> = {
  Target,
  Zap,
  Users,
  Award
}

const AboutPage = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)

  const STRAPI_URL = 'http://localhost:1337'

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(`${STRAPI_URL}/api/about?populate[sections][populate]=*`)
        const data = response.data.data
        
        console.log('Strapi Response:', data)
        
        // Map Strapi data to our component structure
        setAboutData({
          heroTitle: data.heroTitle || 'Urban Mobility',
          heroSubtitle: data.heroSubtitle || 'Pioneering Sustainable',
          heroDescription: data.heroDescription || 'Leading India\'s transition to electric mobility',
          ctaTitle: data.ctaTitle || 'Ready to Make the Switch?',
          ctaDescription: data.ctaDescription || 'Experience the difference',
          sections: data.sections?.map((section: any) => ({
            id: section.id,
            title: section.title,
            description: section.description,
            image: section.image ? {
              url: section.image.url.startsWith('http') 
                ? section.image.url 
                : `${STRAPI_URL}${section.image.url}`,
              alternativeText: section.image.alternativeText
            } : null,
            icon: section.icon || 'Target'
          })) || []
        })
      } catch (err) {
        console.error('Error fetching about data:', err)
        // Fallback to default content
        setAboutData({
          heroTitle: 'Urban Mobility',
          heroSubtitle: 'Pioneering Sustainable',
          heroDescription: 'Leading India\'s transition to electric mobility through innovative technology, sustainable practices, and customer-centric solutions.',
          ctaTitle: 'Ready to Make the Switch?',
          ctaDescription: 'Experience the difference. Join thousands who\'ve already chosen a cleaner, smarter way to commute.',
          sections: [
            {
              id: 1,
              icon: 'Target',
              title: "Our Vision: Cleaner Rides, Better Future",
              description: "We started with a simple goal — to reduce pollution and make daily commuting smarter. Electric scooties are our way of creating a cleaner, more sustainable future for cities and communities.",
              image: { url: "/images/CD_EV15783.jpg", alternativeText: "Vision" }
            },
            {
              id: 2,
              icon: 'Zap',
              title: "Why Scooty? Why Now?",
              description: "A scooty is often the first vehicle people own — for middle-class families, students, delivery partners, and young professionals. We believed this essential vehicle could be smarter, cleaner, and more affordable without compromising convenience.",
              image: { url: "/images/CD_EV15757.jpg", alternativeText: "Why Scooty" }
            },
            {
              id: 3,
              icon: 'Users',
              title: "Our Idea: New Tech for a New Generation",
              description: "The world is moving forward, so should our rides. Our electric scooties are designed for the tech-savvy, urban lifestyle — easy to use, low-maintenance, and budget-friendly.",
              image: { url: "/images/CD_EV15705.jpg", alternativeText: "New Tech" }
            },
            {
              id: 4,
              icon: 'Award',
              title: "Our Commitment: Practical, Reliable, Everyday",
              description: "We focus on creating vehicles that fit real life — no unnecessary complexity, just smart, dependable technology. With every ride, we aim to make commuting easier, greener, and more enjoyable.",
              image: { url: "/images/CD_EV15828.jpg", alternativeText: "Commitment" }
            }
          ]
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!aboutData) return null

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="page-content">
        {/* Hero Section */}
        <section className="py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
          
          {/* Floating Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          
          <div className="relative container-custom px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <h1 className="font-light text-4xl md:text-6xl lg:text-7xl tracking-tight mb-12 text-white leading-tight">
                {aboutData.heroSubtitle && <>{aboutData.heroSubtitle}<br/></>}
                <span className="inline-block mt-3 text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
                  {aboutData.heroTitle}
                </span>
              </h1>
              
              <motion.div 
                className="w-24 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mx-auto mb-10"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              
              <p className="text-white/70 font-light text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                {aboutData.heroDescription}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Sections */}
        {aboutData.sections.map((section, index) => {
          const IconComponent = iconMap[section.icon] || Target
          const isEven = index % 2 === 0
          
          return (
            <section 
              key={section.id} 
              className={`py-24 md:py-32 relative ${isEven ? 'bg-white' : 'bg-gray-50'}`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col lg:flex-row ${!isEven ? 'lg:flex-row-reverse' : ''} gap-12 lg:gap-16 xl:gap-20 items-center`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-1/2 w-full"
                  >
                    {/* Icon */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="mb-8"
                    >
                      <div className="relative inline-block">
                        <motion.div 
                          className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-2xl"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <div className="relative w-20 h-20 rounded-2xl border-2 border-emerald-500/30 flex items-center justify-center bg-white shadow-lg">
                          <IconComponent className="w-10 h-10 text-emerald-500" strokeWidth={1.5} />
                        </div>
                      </div>
                    </motion.div>
                    
                    <h2 className="font-light text-2xl md:text-3xl lg:text-4xl tracking-tight text-gray-900 mb-6 leading-tight">
                      {section.title}
                    </h2>
                    
                    <p className="text-gray-600 font-light text-base md:text-lg leading-relaxed">
                      {section.description}
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-[350px] md:h-[450px] lg:h-[550px] group lg:w-1/2 w-full"
                  >
                    <motion.div 
                      className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="relative h-full border-2 border-gray-200 rounded-3xl overflow-hidden group-hover:border-emerald-500/40 transition-colors duration-500 shadow-xl">
                      {section.image ? (
                        <img 
                          src={section.image.url}
                          alt={section.image.alternativeText || section.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          )
        })}

        {/* CTA */}
        <section className="py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
          
          {/* Floating Orb */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, 50, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          
          <div className="relative px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="font-light text-4xl md:text-6xl tracking-tight text-white mb-6">
                {aboutData.ctaTitle}
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mx-auto mb-8" />
              <p className="text-white/60 font-light text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                {aboutData.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a 
                  href="/#products" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center justify-center space-x-3 px-10 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
                >
                  <span className="font-medium">Book Test Ride</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                </motion.a>
                <motion.a 
                  href="/contact" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center justify-center space-x-3 px-10 py-4 border-2 border-white/20 text-white rounded-full hover:border-emerald-500/50 hover:bg-white/5 transition-all duration-300"
                >
                  <span className="font-light">Contact Us</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage