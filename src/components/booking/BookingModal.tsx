import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Button from '../ui/Button'

interface BookTestRideModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  phone: string
  model: string
  date: string
  time: string
  location: string
  message: string
}

const models = [
  { id: 'eco-rider', name: 'Eco Rider', price: '₹79,999', range: '80 km', topSpeed: '55 km/h' },
  { id: 'city-pro', name: 'City Pro', price: '₹99,999', range: '120 km', topSpeed: '65 km/h' },
  { id: 'velocity-x', name: 'Velocity X', price: '₹1,29,999', range: '150 km', topSpeed: '75 km/h' },
]

const timeSlots = [
  { value: '09:00', label: '09:00 AM', available: true },
  { value: '10:00', label: '10:00 AM', available: true },
  { value: '11:00', label: '11:00 AM', available: false },
  { value: '14:00', label: '02:00 PM', available: true },
  { value: '15:00', label: '03:00 PM', available: true },
  { value: '16:00', label: '04:00 PM', available: true },
  { value: '17:00', label: '05:00 PM', available: false },
]

const BookTestRideModal = ({ isOpen, onClose }: BookTestRideModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    model: 'eco-rider',
    date: '',
    time: '',
    location: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [step, setStep] = useState(1)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }
    // Handle form submission
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
      setFormData({
        name: '',
        email: '',
        phone: '',
        model: 'eco-rider',
        date: '',
        time: '',
        location: '',
        message: '',
      })
      setStep(1)
    }, 3000)
  }

  const selectedModel = models.find(m => m.id === formData.model)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
              className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl max-w-5xl w-full my-8 overflow-hidden border border-gray-200/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl -z-10" />

              {/* Close Button - Floating */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="grid lg:grid-cols-5 min-h-[600px]">
                {/* Left Sidebar - Model Preview */}
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2 bg-gradient-to-br from-primary via-primary/90 to-accent p-8 relative overflow-hidden"
                >
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(30deg,transparent_48%,rgba(255,255,255,.3)_50%,transparent_52%)] bg-[length:20px_20px]" />
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-8">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.3 }}
                        className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-2 mb-4 backdrop-blur-sm"
                      >
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-white text-sm font-semibold">Premium Test Drive</span>
                      </motion.div>
                      <h2 className="font-display text-3xl font-bold text-white mb-2">
                        Experience Tomorrow
                      </h2>
                      <p className="text-white/80 text-sm">Select your preferred model and book a personalized test ride</p>
                    </div>

                    {/* Selected Model Card */}
                    {selectedModel && (
                      <motion.div
                        key={formData.model}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-6 mb-6 shadow-xl"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Selected Model</p>
                            <h3 className="font-display text-2xl font-bold text-white">{selectedModel.name}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-white text-2xl font-bold">{selectedModel.price}</p>
                            <p className="text-white/70 text-xs">Starting price</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                          <div>
                            <p className="text-white/70 text-xs mb-1">Range</p>
                            <p className="text-white font-semibold text-lg">{selectedModel.range}</p>
                          </div>
                          <div>
                            <p className="text-white/70 text-xs mb-1">Top Speed</p>
                            <p className="text-white font-semibold text-lg">{selectedModel.topSpeed}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Benefits */}
                    <div className="space-y-3">
                      {[
                        { icon: '⚡', text: 'Zero emission technology' },
                        { icon: '🎯', text: 'Expert guidance available' },
                        { icon: '🏆', text: 'No commitment required' },
                      ].map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="flex items-center gap-3 text-white/90"
                        >
                          <span className="text-xl">{benefit.icon}</span>
                          <span className="text-sm">{benefit.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Form */}
                <div className="lg:col-span-3 p-8 lg:p-10">
                  {/* Progress Steps */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center flex-1">
                          <motion.div
                            animate={{
                              scale: step >= s ? 1 : 0.9,
                              backgroundColor: step >= s ? 'rgb(var(--color-primary))' : 'rgb(229, 231, 235)',
                            }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                              step >= s ? 'text-white shadow-lg shadow-primary/30' : 'text-gray-400'
                            }`}
                          >
                            {step > s ? '✓' : s}
                          </motion.div>
                          {s < 3 && (
                            <div className="flex-1 h-1 mx-2">
                              <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: step > s ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="h-full bg-primary origin-left rounded"
                              />
                              {step <= s && <div className="h-full bg-gray-200 rounded -mt-1" />}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                      <span className={step >= 1 ? 'text-primary' : ''}>Personal Info</span>
                      <span className={step >= 2 ? 'text-primary' : ''}>Choose Model</span>
                      <span className={step >= 3 ? 'text-primary' : ''}>Schedule</span>
                    </div>
                  </div>

                  {/* Form Content */}
                  {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {/* Step 1: Personal Info */}
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Let's get started</h3>
                            <p className="text-gray-600 text-sm">Tell us a bit about yourself</p>
                          </div>

                          <div className="space-y-5">
                            <motion.div whileFocus={{ scale: 1.01 }}>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name *
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  onFocus={() => setFocusedField('name')}
                                  onBlur={() => setFocusedField(null)}
                                  required
                                  className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-gray-50/50 transition-all"
                                  placeholder="Enter your full name"
                                />
                                {focusedField === 'name' && (
                                  <motion.div
                                    layoutId="activeField"
                                    className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                  />
                                )}
                              </div>
                            </motion.div>

                            <div className="grid md:grid-cols-2 gap-5">
                              <motion.div whileFocus={{ scale: 1.01 }}>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  Email Address *
                                </label>
                                <div className="relative">
                                  <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-gray-50/50 transition-all"
                                    placeholder="you@example.com"
                                  />
                                  {focusedField === 'email' && (
                                    <motion.div
                                      layoutId="activeField"
                                      className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                  )}
                                </div>
                              </motion.div>

                              <motion.div whileFocus={{ scale: 1.01 }}>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  Phone Number *
                                </label>
                                <div className="relative">
                                  <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('phone')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-gray-50/50 transition-all"
                                    placeholder="+91 98765 43210"
                                  />
                                  {focusedField === 'phone' && (
                                    <motion.div
                                      layoutId="activeField"
                                      className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                  )}
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Model Selection */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Choose your ride</h3>
                            <p className="text-gray-600 text-sm">Select the model you'd like to test drive</p>
                          </div>

                          <div className="grid gap-4">
                            {models.map((model) => (
                              <motion.label
                                key={model.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name="model"
                                  value={model.id}
                                  checked={formData.model === model.id}
                                  onChange={handleChange}
                                  className="sr-only"
                                />
                                <div
                                  className={`p-5 rounded-2xl border-2 transition-all ${
                                    formData.model === model.id
                                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                                      : 'border-gray-200 bg-white hover:border-gray-300'
                                  }`}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-display text-xl font-bold text-gray-900 mb-1">{model.name}</h4>
                                      <p className="text-primary text-lg font-bold mb-3">{model.price}</p>
                                      <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1">
                                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                          </svg>
                                          <span className="text-gray-600">{model.range}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          <span className="text-gray-600">{model.topSpeed}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                        formData.model === model.id
                                          ? 'border-primary bg-primary'
                                          : 'border-gray-300 bg-white'
                                      }`}
                                    >
                                      {formData.model === model.id && (
                                        <motion.svg
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="w-4 h-4 text-white"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </motion.svg>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.label>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Schedule */}
                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Pick a time</h3>
                            <p className="text-gray-600 text-sm">Choose your preferred date, time, and location</p>
                          </div>

                          <div className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                              <motion.div whileFocus={{ scale: 1.01 }}>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  Date *
                                </label>
                                <div className="relative">
                                  <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('date')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-primary focus:bg-gray-50/50 transition-all"
                                  />
                                  {focusedField === 'date' && (
                                    <motion.div
                                      layoutId="activeField"
                                      className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                  )}
                                </div>
                              </motion.div>

                              <motion.div whileFocus={{ scale: 1.01 }}>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  Location *
                                </label>
                                <div className="relative">
                                  <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('location')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-primary focus:bg-gray-50/50 transition-all appearance-none"
                                  >
                                    <option value="">Select location</option>
                                    <option value="mumbai">Mumbai, Maharashtra</option>
                                    <option value="delhi">Delhi NCR</option>
                                    <option value="bangalore">Bangalore, Karnataka</option>
                                    <option value="pune">Pune, Maharashtra</option>
                                    <option value="hyderabad">Hyderabad, Telangana</option>
                                    <option value="chennai">Chennai, Tamil Nadu</option>
                                  </select>
                                  {focusedField === 'location' && (
                                    <motion.div
                                      layoutId="activeField"
                                      className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                  )}
                                </div>
                              </motion.div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Time Slot *
                              </label>
                              <div className="grid grid-cols-3 gap-3">
                                {timeSlots.map((slot) => (
                                  <motion.label
                                    key={slot.value}
                                    whileHover={slot.available ? { scale: 1.05 } : {}}
                                    whileTap={slot.available ? { scale: 0.95 } : {}}
                                    className={`cursor-pointer ${!slot.available && 'opacity-50 cursor-not-allowed'}`}
                                  >
                                    <input
                                      type="radio"
                                      name="time"
                                      value={slot.value}
                                      checked={formData.time === slot.value}
                                      onChange={handleChange}
                                      disabled={!slot.available}
                                      required
                                      className="sr-only"
                                    />
                                    <div
                                      className={`px-4 py-3 rounded-xl text-center text-sm font-semibold transition-all ${
                                        formData.time === slot.value
                                          ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                          : slot.available
                                          ? 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary'
                                          : 'bg-gray-100 border-2 border-gray-200 text-gray-400'
                                      }`}
                                    >
                                      {slot.label}
                                      {!slot.available && (
                                        <div className="text-xs mt-1">Booked</div>
                                      )}
                                    </div>
                                  </motion.label>
                                ))}
                              </div>
                            </div>

                            <motion.div whileFocus={{ scale: 1.01 }}>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Additional Notes (Optional)
                              </label>
                              <div className="relative">
                                <textarea
                                  name="message"
                                  value={formData.message}
                                  onChange={handleChange}
                                  onFocus={() => setFocusedField('message')}
                                  onBlur={() => setFocusedField(null)}
                                  rows={3}
                                  className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-gray-50/50 transition-all resize-none"
                                  placeholder="Any specific questions or requirements?"
                                />
                                {focusedField === 'message' && (
                                  <motion.div
                                    layoutId="activeField"
                                    className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                  />
                                )}
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      {step > 1 ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setStep(step - 1)}
                          className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                        >
                          ← Back
                        </motion.button>
                      ) : (
                        <div />
                      )}
                      <Button type="submit" size="lg">
                        {step < 3 ? 'Continue →' : 'Confirm Booking ✓'}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    {/* Success Animation */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                      className="relative w-24 h-24 mx-auto mb-8"
                    >
                      {/* Outer Ring */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent"
                      />
                      {/* Main Circle */}
                      <div className="relative w-full h-full bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl shadow-primary/50">
                        <motion.svg
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                          className="w-12 h-12 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="font-display text-3xl font-bold text-gray-900 mb-3">
                        You're All Set! 🎉
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Your test ride has been confirmed. We'll send you a confirmation email and SMS shortly.
                      </p>
                      
                      {/* Booking Details Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="inline-block bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6 text-left"
                      >
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Booking Summary</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🏍️</span>
                            <div>
                              <p className="text-sm text-gray-500">Model</p>
                              <p className="font-semibold text-gray-900">{selectedModel?.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">📅</span>
                            <div>
                              <p className="text-sm text-gray-500">Date & Time</p>
                              <p className="font-semibold text-gray-900">
                                {formData.date} at {formData.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default BookTestRideModal
