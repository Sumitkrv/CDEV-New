import { motion } from 'framer-motion'
import { Gift, Award, RefreshCcw, Building2, ArrowRight } from 'lucide-react'

const OffersSection = () => {
  const offers = [
    {
      title: "FAME II Subsidy",
      amount: "₹15,000",
      description: "Government subsidy under FAME II scheme",
      icon: Award
    },
    {
      title: "State Subsidy",
      amount: "Up to ₹10,000",
      description: "Additional state government incentives",
      icon: Gift
    },
    {
      title: "Exchange Bonus",
      amount: "₹8,000",
      description: "Extra discount on old vehicle exchange",
      icon: RefreshCcw
    },
    {
      title: "Corporate Discount",
      amount: "₹5,000",
      description: "Special pricing for bulk corporate orders",
      icon: Building2
    }
  ]

  return (
    <section id="offers" className="py-32 bg-black text-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="relative container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <h2 className="font-light text-5xl md:text-7xl tracking-tight mb-6">
            Offers & Subsidies
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Offers List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-0"
          >
            {/* Total Savings */}
            <div className="mb-20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white/60" strokeWidth={1} />
                </div>
                <div className="text-white/40 text-xs uppercase tracking-widest font-light">Total Savings</div>
              </div>
              <div className="font-light text-7xl mb-3 tracking-tight">₹38,000</div>
              <p className="text-white/50 text-sm font-light">Combine multiple offers for maximum benefits</p>
            </div>

            {/* Offers */}
            <div className="space-y-0">
              {offers.map((offer, index) => {
                const IconComponent = offer.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="group py-10 border-b border-white/10 last:border-b-0"
                  >
                    <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-white/30 transition-colors duration-500">
                        <IconComponent className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-500" strokeWidth={1} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-light text-2xl tracking-tight">{offer.title}</h3>
                          <span className="font-light text-3xl ml-4">{offer.amount}</span>
                        </div>
                        <p className="text-white/50 text-sm font-light leading-relaxed">{offer.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-16 pt-16 border-t border-white/10"
            >
              <button className="group flex items-center space-x-3 border border-white/40 text-white px-10 py-4 font-light hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider uppercase">
                <span>Check Eligibility</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Vehicle Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-zinc-900 relative overflow-hidden group">
              <img
                src="/images/CD_EV15730.jpg"
                alt="Electric Vehicle Offer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default OffersSection
