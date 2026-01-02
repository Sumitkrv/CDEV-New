import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Check, ChevronLeft, ChevronRight, Zap, Palette, Battery, Sofa, Circle, Cpu } from 'lucide-react'

interface ConfigOption {
  id: string
  name: string
  price: number
  image?: string
}

interface Config {
  model: ConfigOption
  color: ConfigOption
  battery: ConfigOption
  interior: ConfigOption
  wheels: ConfigOption
  autopilot: ConfigOption
}

const models: ConfigOption[] = [
  { id: 'urban-rider', name: 'Urban Rider', price: 29990 },
  { id: 'city-cruiser', name: 'City Cruiser', price: 39990 },
  { id: 'highway-master', name: 'Highway Master', price: 49990 },
]

const colors: ConfigOption[] = [
  { id: 'midnight-black', name: 'Midnight Black', price: 0 },
  { id: 'pearl-white', name: 'Pearl White', price: 1500 },
  { id: 'electric-blue', name: 'Electric Blue', price: 2000 },
  { id: 'silver-metallic', name: 'Silver Metallic', price: 1500 },
  { id: 'red-signature', name: 'Signature Red', price: 2500 },
]

const batteries: ConfigOption[] = [
  { id: 'standard', name: 'Standard Range (50 kWh)', price: 0 },
  { id: 'long-range', name: 'Long Range (65 kWh)', price: 8000 },
  { id: 'performance', name: 'Performance (75 kWh)', price: 12000 },
]

const interiors: ConfigOption[] = [
  { id: 'black-fabric', name: 'Black Fabric', price: 0 },
  { id: 'black-leather', name: 'Black Premium Leather', price: 3000 },
  { id: 'white-leather', name: 'White Premium Leather', price: 3500 },
]

const wheels: ConfigOption[] = [
  { id: '18-aero', name: '18" Aero Wheels', price: 0 },
  { id: '19-sport', name: '19" Sport Wheels', price: 2000 },
  { id: '20-performance', name: '20" Performance Wheels', price: 3500 },
]

const autopilots: ConfigOption[] = [
  { id: 'none', name: 'None', price: 0 },
  { id: 'basic', name: 'Basic Autopilot', price: 3000 },
  { id: 'full-self-driving', name: 'Full Self-Driving', price: 10000 },
]

const ConfiguratorComponent = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [config, setConfig] = useState<Config>({
    model: models[0],
    color: colors[0],
    battery: batteries[0],
    interior: interiors[0],
    wheels: wheels[0],
    autopilot: autopilots[0],
  })

  const steps = [
    { title: 'Model', key: 'model', options: models, icon: Zap },
    { title: 'Color', key: 'color', options: colors, icon: Palette },
    { title: 'Battery', key: 'battery', options: batteries, icon: Battery },
    { title: 'Interior', key: 'interior', options: interiors, icon: Sofa },
    { title: 'Wheels', key: 'wheels', options: wheels, icon: Circle },
    { title: 'Autopilot', key: 'autopilot', options: autopilots, icon: Cpu },
  ]

  const totalPrice = Object.values(config).reduce((sum, option) => sum + option.price, 0)

  const handleSelect = (stepKey: string, option: ConfigOption) => {
    setConfig({ ...config, [stepKey]: option })
  }

  const colorMap: Record<string, string> = {
    'midnight-black': 'bg-slate-950',
    'pearl-white': 'bg-white',
    'electric-blue': 'bg-blue-500',
    'silver-metallic': 'bg-slate-400',
    'red-signature': 'bg-red-600',
  }

  return (
    <div className="min-h-screen bg-white py-32">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="font-light text-5xl md:text-7xl tracking-tight text-gray-900 mb-6">
            Configure Your Dream EV
          </h1>
          <div className="w-16 h-px bg-black/20 mx-auto mb-8" />
          <p className="text-gray-600 font-light text-xl leading-relaxed">
            Customize every detail to match your style and needs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Configuration Options */}
          <div className="lg:col-span-2">
            {/* Steps Navigation */}
            <div className="mb-12 overflow-x-auto">
              <div className="flex space-x-2 pb-4">
                {steps.map((step, index) => {
                  const IconComponent = step.icon
                  return (
                    <button
                      key={step.key}
                      onClick={() => setCurrentStep(index)}
                      className={`group flex-shrink-0 flex items-center space-x-3 px-6 py-3 border transition-all duration-300 ${
                        currentStep === index
                          ? 'border-gray-400 bg-black text-white'
                          : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" strokeWidth={1} />
                      <span className="font-light">{step.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Current Step Options */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-200 p-8"
              >
                <h2 className="font-light text-3xl tracking-tight text-gray-900 mb-8">
                  Choose {steps[currentStep].title}
                </h2>

                <div className={`grid ${steps[currentStep].key === 'color' ? 'grid-cols-2 md:grid-cols-3' : 'gap-4'}`}>
                  {steps[currentStep].options.map((option) => {
                    const isSelected = config[steps[currentStep].key as keyof Config].id === option.id

                    return steps[currentStep].key === 'color' ? (
                      // Color swatches
                      <motion.button
                        key={option.id}
                        onClick={() => handleSelect(steps[currentStep].key, option)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-6 border transition-all duration-300 ${
                          isSelected
                            ? 'border-gray-400'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-full aspect-square ${colorMap[option.id]} mb-4 border border-gray-300`} />
                        <div className="font-light text-sm text-gray-900 mb-1">{option.name}</div>
                        <div className="font-light text-xs text-gray-500">
                          {option.price > 0 ? `+$${option.price.toLocaleString()}` : 'Included'}
                        </div>
                        {isSelected && (
                          <div className="absolute top-4 right-4 w-6 h-6 border border-gray-400 bg-black flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" strokeWidth={1} />
                          </div>
                        )}
                      </motion.button>
                    ) : (
                      // Regular options
                      <motion.button
                        key={option.id}
                        onClick={() => handleSelect(steps[currentStep].key, option)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`p-6 border text-left transition-all duration-300 ${
                          isSelected
                            ? 'border-gray-400 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-light text-lg text-gray-900 mb-2">{option.name}</div>
                            <div className="font-light text-sm text-gray-600">
                              {option.price > 0 ? `+$${option.price.toLocaleString()}` : 'Included'}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 border border-gray-400 bg-black flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4 text-white" strokeWidth={1} />
                            </div>
                          )}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-12">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="group flex items-center space-x-2 px-6 py-3 border border-gray-200 text-gray-900 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4" strokeWidth={1} />
                    <span className="font-light">Previous</span>
                  </button>
                  <button
                    onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    disabled={currentStep === steps.length - 1}
                    className="group flex items-center space-x-2 px-6 py-3 bg-black text-white hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black transition-all duration-300"
                  >
                    <span className="font-light">Next</span>
                    <ChevronRight className="w-4 h-4" strokeWidth={1} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Summary */}
          <div className="lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="border border-gray-200 p-8"
            >
              <h3 className="font-light text-2xl tracking-tight text-gray-900 mb-8">Your Configuration</h3>

              {/* Vehicle Visualization */}
              <div className="aspect-video border border-gray-200 mb-8 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" strokeWidth={1} />
                  <div className="font-light text-sm text-gray-600 mb-4">{config.model.name}</div>
                  <div className={`w-12 h-12 mx-auto ${colorMap[config.color.id]} border border-gray-300`} />
                </div>
              </div>

              {/* Selected Options */}
              <div className="space-y-4 mb-8">
                {Object.entries(config).map(([key, option]) => (
                  <div key={key} className="flex items-center justify-between font-light text-sm">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="text-gray-900">{option.name}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-baseline justify-between mb-8">
                  <span className="text-gray-600 font-light">Total Price</span>
                  <div className="text-right">
                    <div className="text-4xl font-light tracking-tight text-gray-900">
                      ${totalPrice.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 font-light mt-1">Before taxes & fees</div>
                  </div>
                </div>

                <button className="w-full py-4 bg-black text-white font-light hover:bg-gray-900 transition-all duration-300 mb-4">
                  Reserve Now
                </button>
                <button className="w-full py-4 border border-gray-200 text-gray-900 font-light hover:border-gray-400 transition-all duration-300">
                  Book Test Ride
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between font-light text-sm mb-3">
                  <span className="text-gray-600">Configuration Progress</span>
                  <span className="text-gray-900">
                    {currentStep + 1}/{steps.length}
                  </span>
                </div>
                <div className="h-1 bg-gray-200 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-black"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfiguratorComponent
