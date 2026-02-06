import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface FAQ {
  id: number
  question: string
  answer: string
}

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [faqs, setFaqs] = useState<FAQ[]>([])

  // Fetch FAQs from Strapi
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(`${STRAPI_URL}/api/home?populate[faqs]=*`)
        const data = response.data.data
        
        if (data.faqs && data.faqs.length > 0) {
          setFaqs(data.faqs)
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err)
        setFaqs([])
      }
    }
    
    fetchFaqs()
  }, [])

  return (
    <section id="faq" className="py-32 bg-white text-black relative">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="relative container-custom">
        <div className="max-w-5xl mx-auto">
          <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-sm font-light tracking-[0.3em] uppercase text-black/40 mb-6">
            QUESTIONS
          </p>
          <h2 className="text-6xl md:text-7xl font-light text-black mb-6 tracking-tight">
            Frequently Asked
          </h2>
        </motion.div>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03, duration: 0.5 }}
              className="border-b border-black/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-0 py-8 text-left flex justify-between items-center hover:opacity-70 transition-opacity duration-300 group"
              >
                <span className="font-light text-black text-xl md:text-2xl pr-8">
                  {faq.question}
                </span>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 text-black/60 group-hover:text-black flex-shrink-0 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-0 pb-8 text-black/60 leading-relaxed font-light text-lg">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 border border-black/20 p-12"
        >
          <h3 className="text-3xl font-light text-black mb-3">Still have questions?</h3>
          <p className="text-black/60 mb-8 font-light">Our team is here to help you</p>
          <button className="border border-black/40 text-black px-10 py-4 font-light hover:bg-black hover:text-white transition-all duration-300 text-sm tracking-wider uppercase">
            Contact Support
          </button>
        </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
