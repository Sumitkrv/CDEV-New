import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, useScroll, useSpring, AnimatePresence } from 'framer-motion'

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(80000)
  const [interestRate, setInterestRate] = useState(9.5)
  const [tenure, setTenure] = useState(24)
  const [activeSlider, setActiveSlider] = useState<string | null>(null)
  const sectionRef = useRef(null)

  const calculateEMI = () => {
    const principal = loanAmount
    const ratePerMonth = interestRate / 12 / 100
    const numberOfMonths = tenure
    
    const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfMonths)) / 
                (Math.pow(1 + ratePerMonth, numberOfMonths) - 1)
    
    const totalAmount = emi * numberOfMonths
    const totalInterest = totalAmount - principal
    
    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    }
  }

  const { emi, totalInterest, totalAmount } = calculateEMI()

  const fuelSavings = (tenure * 30 * 100 * 0.8) // 30 days, 100 rs/day fuel, 80% savings

  return (
    <section ref={sectionRef} id="emi-calculator" className="relative py-32 bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 70, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      <div className="relative container-custom">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6 px-6 py-2 border border-white/10 rounded-full"
          >
            <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
            </svg>
            <span className="text-xs tracking-widest uppercase text-white/60">
              Smart Finance
            </span>
          </motion.div>
          
          <h2 className="font-light text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 text-white">
            EMI Calculator
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Plan your investment with our intelligent financing calculator
          </motion.p>
          
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Calculator Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Loan Amount Slider */}
            <motion.div
              animate={{
                scale: activeSlider === 'loan' ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <AnimatePresence>
                {activeSlider === 'loan' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-xl"
                  />
                )}
              </AnimatePresence>
              <div className="relative flex justify-between items-baseline mb-6">
                <label className="text-white/60 font-light text-sm uppercase tracking-widest">Loan Amount</label>
                <motion.span 
                  className="font-light text-3xl md:text-4xl text-white"
                  key={loanAmount}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 150 }}
                >
                  ₹{loanAmount.toLocaleString()}
                </motion.span>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="20000"
                  max="150000"
                  step="5000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  onMouseDown={() => setActiveSlider('loan')}
                  onMouseUp={() => setActiveSlider(null)}
                  onTouchStart={() => setActiveSlider('loan')}
                  onTouchEnd={() => setActiveSlider(null)}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-white/20 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${((loanAmount - 20000) / 130000) * 100}%, rgba(255,255,255,0.1) ${((loanAmount - 20000) / 130000) * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
                <motion.div
                  className="absolute -top-1 h-4 bg-white/20 rounded-full pointer-events-none"
                  style={{
                    width: `${((loanAmount - 20000) / 130000) * 100}%`
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeSlider === 'loan' ? 0.3 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-white/40 mt-4 font-light">
                <span>₹20,000</span>
                <span>₹1,50,000</span>
              </div>
            </motion.div>

            {/* Interest Rate Slider */}
            <motion.div
              animate={{
                scale: activeSlider === 'rate' ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <AnimatePresence>
                {activeSlider === 'rate' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-emerald-500/10 rounded-3xl blur-xl"
                  />
                )}
              </AnimatePresence>
              <div className="relative flex justify-between items-baseline mb-6">
                <label className="text-white/60 font-light text-sm uppercase tracking-widest">Interest Rate</label>
                <motion.span 
                  className="font-light text-3xl md:text-4xl text-white"
                  key={interestRate}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 150 }}
                >
                  {interestRate}%
                </motion.span>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="7"
                  max="15"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  onMouseDown={() => setActiveSlider('rate')}
                  onMouseUp={() => setActiveSlider(null)}
                  onTouchStart={() => setActiveSlider('rate')}
                  onTouchEnd={() => setActiveSlider(null)}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-white/20 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${((interestRate - 7) / 8) * 100}%, rgba(255,255,255,0.1) ${((interestRate - 7) / 8) * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
                <motion.div
                  className="absolute -top-1 h-4 bg-white/20 rounded-full pointer-events-none"
                  style={{
                    width: `${((interestRate - 7) / 8) * 100}%`
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeSlider === 'rate' ? 0.3 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-white/40 mt-4 font-light">
                <span>7%</span>
                <span>15%</span>
              </div>
            </motion.div>

            {/* Tenure Slider */}
            <motion.div
              animate={{
                scale: activeSlider === 'tenure' ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <AnimatePresence>
                {activeSlider === 'tenure' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-3xl blur-xl"
                  />
                )}
              </AnimatePresence>
              <div className="relative flex justify-between items-baseline mb-6">
                <label className="text-white/60 font-light text-sm uppercase tracking-widest">Tenure</label>
                <motion.span 
                  className="font-light text-3xl md:text-4xl text-white"
                  key={tenure}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 150 }}
                >
                  {tenure} months
                </motion.span>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="6"
                  max="48"
                  step="6"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  onMouseDown={() => setActiveSlider('tenure')}
                  onMouseUp={() => setActiveSlider(null)}
                  onTouchStart={() => setActiveSlider('tenure')}
                  onTouchEnd={() => setActiveSlider(null)}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-white/20 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${((tenure - 6) / 42) * 100}%, rgba(255,255,255,0.1) ${((tenure - 6) / 42) * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
                <motion.div
                  className="absolute -top-1 h-4 bg-white/20 rounded-full pointer-events-none"
                  style={{
                    width: `${((tenure - 6) / 42) * 100}%`
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeSlider === 'tenure' ? 0.3 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-white/40 mt-4 font-light">
                <span>6 months</span>
                <span>48 months</span>
              </div>
            </motion.div>

            {/* Results Summary */}
            <div className="border-t border-white/10 pt-12 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-5 h-5 text-white/40 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                      </svg>
                    </motion.div>
                    <span className="text-white/60 text-xs uppercase tracking-widest">Monthly EMI</span>
                  </div>
                  <span className="font-light text-5xl text-white">₹{emi.toLocaleString()}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group border-t border-white/10 pt-8"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-300"
                      whileHover={{ scale: 1.1, y: 2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-5 h-5 text-white/40 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                      </svg>
                    </motion.div>
                    <span className="text-white/60 text-xs uppercase tracking-widest">Total Interest</span>
                  </div>
                  <span className="font-light text-3xl text-white">₹{totalInterest.toLocaleString()}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="group border-t border-white/10 pt-8"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-5 h-5 text-white/40 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                      </svg>
                    </motion.div>
                    <span className="text-white/60 text-xs uppercase tracking-widest">Fuel Savings</span>
                  </div>
                  <span className="font-light text-3xl text-white">₹{Math.round(fuelSavings).toLocaleString()}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Vehicle Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div 
              className="aspect-[4/5] bg-zinc-900 relative overflow-hidden group rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.02, rotateY: 2 }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 z-10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.7 }}
              />
              <motion.img
                src="/images/CD_EV15555.jpg"
                alt="Electric Vehicle"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              
              {/* Animated Scan Line */}
              <motion.div
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent z-20"
                animate={{
                  top: ['0%', '100%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Floating Stats Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-6 z-20 bg-black/40 backdrop-blur-2xl border border-white/30 rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between text-white">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-xs uppercase tracking-[0.15em] text-white/60 mb-2 flex items-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                      />
                      Monthly Savings
                    </div>
                    <div className="text-2xl font-light bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">₹{Math.round(fuelSavings).toLocaleString()}</div>
                  </motion.div>
                  <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
                  <motion.div 
                    className="text-right"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-xs uppercase tracking-[0.15em] text-white/60 mb-2 flex items-center justify-end gap-2">
                      Total Cost
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                      />
                    </div>
                    <div className="text-2xl font-light bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">₹{totalAmount.toLocaleString()}</div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Subsidy Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative group border border-white/10 p-8 hover:border-white/30 transition-all duration-300 overflow-hidden bg-white/5 backdrop-blur-sm"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <motion.div 
                    className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-6 h-6 text-white/40 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </motion.div>
                  <div className="text-xs uppercase tracking-widest text-white/60 font-light">Government Subsidy</div>
                </div>
                <motion.div 
                  className="font-light text-4xl mb-3 text-white"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Up to ₹15,000
                </motion.div>
                <p className="text-white/50 text-sm font-light leading-relaxed mb-6">Under FAME II scheme. Additional state subsidies may apply.</p>
                
                {/* Apply Now Button */}
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group/btn flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-light text-sm uppercase tracking-[0.15em] hover:shadow-lg hover:shadow-white/20 transition-shadow duration-300"
                >
                  <span>Check Eligibility</span>
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </motion.svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              ),
              title: "Secure & Instant",
              description: "Quick approval process with secure documentation"
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              ),
              title: "Flexible Plans",
              description: "Customize EMI according to your financial comfort"
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              ),
              title: "24/7 Support",
              description: "Expert assistance throughout your finance journey"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="relative z-10">
                <motion.div
                  className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-white/60 group-hover:text-white group-hover:bg-white/20 transition-all duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-white font-light text-lg mb-2 tracking-wide">{item.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default EMICalculator
