import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MessageCircle, ArrowRight, Send, MapPin } from 'lucide-react'
import axios from 'axios'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BookTestRideModal from '../components/booking/BookingModal'
import Button from '../components/ui/Button'

const STRAPI_URL = 'http://localhost:1337'

interface ContactMethod {
  icon: string
  title: string
  detail: string
  action: string
  href: string
}

interface ContactData {
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  contactMethods: ContactMethod[]
  formTitle: string
  formDescription: string
  faqSectionTitle: string
  faqSectionDescription: string
}

const iconMap: Record<string, any> = {
  Mail,
  Phone,
  MessageCircle,
  MapPin
}

const defaultContactData: ContactData = {
  heroTitle: 'Get in Touch',
  heroSubtitle: 'We\'re Here to Help',
  heroDescription: 'Have questions about our vehicles? Need support? Our team is ready to assist you.',
  contactMethods: [
    {
      icon: 'Mail',
      title: 'Email Us',
      detail: 'support@considerdone.ev',
      action: 'Send Email',
      href: 'mailto:support@considerdone.ev'
    },
    {
      icon: 'Phone',
      title: 'Call Us',
      detail: '+1 (800) 555-0100',
      action: 'Call Now',
      href: 'tel:+18005550100'
    },
    {
      icon: 'MessageCircle',
      title: 'Live Chat',
      detail: 'Available 24/7',
      action: 'Start Chat',
      href: '#chat'
    },
  ],
  formTitle: 'Send Us a Message',
  formDescription: 'Fill out the form below and we\'ll get back to you within 24 hours',
  faqSectionTitle: 'Quick Answers',
  faqSectionDescription: 'Looking for immediate answers? Check out our FAQ section'
}

const ContactPage = () => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const [contactData, setContactData] = useState<ContactData>(defaultContactData)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  // Fetch contact page data from Strapi
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(`${STRAPI_URL}/api/contact?populate[contactMethods]=*`)
        const data = response.data.data
        
        if (data) {
          setContactData({
            heroTitle: data.heroTitle || defaultContactData.heroTitle,
            heroSubtitle: data.heroSubtitle || defaultContactData.heroSubtitle,
            heroDescription: data.heroDescription || defaultContactData.heroDescription,
            contactMethods: data.contactMethods?.length > 0 ? data.contactMethods : defaultContactData.contactMethods,
            formTitle: data.formTitle || defaultContactData.formTitle,
            formDescription: data.formDescription || defaultContactData.formDescription,
            faqSectionTitle: data.faqSectionTitle || defaultContactData.faqSectionTitle,
            faqSectionDescription: data.faqSectionDescription || defaultContactData.faqSectionDescription
          })
        }
      } catch (err) {
        console.error('Error fetching contact data:', err)
        // Keep default data on error
      }
    }
    
    fetchContactData()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
              className="text-center mb-24"
            >
              <h1 className="font-light text-5xl md:text-7xl tracking-tight mb-6 text-gray-900">
                {contactData.heroTitle}
              </h1>
              <div className="w-16 h-px bg-black/20 mx-auto mb-8" />
              <h2 className="font-light text-3xl md:text-4xl tracking-tight mb-8 text-gray-900">
                {contactData.heroSubtitle}
              </h2>
              <p className="text-gray-600 font-light text-lg leading-relaxed max-w-3xl mx-auto">
                {contactData.heroDescription}
              </p>
            </motion.div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {contactData.contactMethods.map((method, index) => {
                const IconComponent = iconMap[method.icon] || Mail
                return (
                  <motion.a
                    key={method.title}
                    href={method.href}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="group block"
                  >
                    <div className="border border-gray-200 p-10 hover:border-gray-400 transition-colors duration-500 text-center">
                      <div className="w-16 h-16 border border-gray-200 flex items-center justify-center mb-8 mx-auto group-hover:border-gray-400 transition-colors duration-500">
                        <IconComponent className="w-8 h-8 text-gray-400 group-hover:text-gray-900 transition-colors duration-500" strokeWidth={1} />
                      </div>
                      
                      <h3 className="font-light text-2xl mb-4 tracking-tight text-gray-900">{method.title}</h3>
                      <p className="text-gray-600 font-light text-sm mb-6">{method.detail}</p>
                      
                      <div className="flex items-center justify-center space-x-2 text-gray-900 font-light group-hover:space-x-3 transition-all duration-300">
                        <span>{method.action}</span>
                        <ArrowRight className="w-4 h-4" strokeWidth={1} />
                      </div>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-32 bg-black relative">
          <div className="relative container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center space-x-4 mb-16">
                  <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center">
                    <Send className="w-6 h-6 text-zinc-600" strokeWidth={1} />
                  </div>
                  <h2 className="font-light text-4xl tracking-tight text-white">{contactData.formTitle}</h2>
                </div>
                <p className="text-zinc-400 font-light text-lg mb-12 leading-relaxed">
                  {contactData.formDescription}
                </p>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-light text-zinc-400 mb-3 tracking-wide">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-0 py-3 bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors font-light"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-zinc-400 mb-3 tracking-wide">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-0 py-3 bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors font-light"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-light text-zinc-400 mb-3 tracking-wide">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-0 py-3 bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors font-light"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-zinc-400 mb-3 tracking-wide">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-0 py-3 bg-transparent border-b border-zinc-800 text-white focus:outline-none focus:border-zinc-600 transition-colors font-light"
                        >
                          <option value="general" className="bg-black">General Inquiry</option>
                          <option value="sales" className="bg-black">Sales</option>
                          <option value="service" className="bg-black">Service & Support</option>
                          <option value="partnership" className="bg-black">Partnership</option>
                          <option value="press" className="bg-black">Press & Media</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-light text-zinc-400 mb-3 tracking-wide">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-0 py-3 bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors resize-none font-light"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <div className="flex items-center justify-between pt-8">
                      <p className="text-sm text-zinc-500 font-light">* Required fields</p>
                      <button
                        type="submit"
                        className="group px-8 py-3 border border-zinc-800 text-white hover:border-zinc-600 transition-colors duration-300 flex items-center space-x-3"
                      >
                        <span className="font-light">Send Message</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 border border-zinc-800 flex items-center justify-center mx-auto mb-8">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-light text-3xl tracking-tight text-white mb-4">Message Sent!</h3>
                    <p className="text-zinc-400 font-light">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-32 bg-white relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
          
          <div className="relative container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="font-light text-4xl md:text-5xl tracking-tight mb-6 text-gray-900">
                {contactData.faqSectionTitle}
              </h2>
              <div className="w-16 h-px bg-black/20 mx-auto mb-8" />
              <p className="text-gray-600 font-light text-lg mb-12 leading-relaxed max-w-2xl mx-auto">
                {contactData.faqSectionDescription}
              </p>
              <a
                href="/#faq"
                className="inline-flex items-center space-x-3 px-8 py-3 border border-gray-200 text-gray-900 hover:border-gray-400 transition-colors duration-300 group"
              >
                <span className="font-light">View FAQs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1} />
              </a>
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

export default ContactPage
