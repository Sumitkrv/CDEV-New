import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, ArrowRight } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setEmail('')
    }, 3000)
  }

  const footerLinks = {
    Models: [
      { name: 'Urban Rider', path: '/product/urban-rider' },
      { name: 'City Cruiser', path: '/product/city-cruiser' },
      { name: 'Highway Master', path: '/product/highway-master' },
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Sustainability', path: '/sustainability' },
      { name: 'Press', path: '/press' },
    ],
    Support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'Dealers', path: '/dealers' },
      { name: 'Service Centers', path: '/service' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
    { name: 'YouTube', icon: Youtube, url: '#' },
  ]

  return (
    <footer className="bg-black text-white border-t border-white/10">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container-custom py-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white/60" strokeWidth={1} />
                </div>
                <h3 className="font-light text-4xl tracking-tight">
                  Stay Updated
                </h3>
              </div>
              <p className="text-white/50 font-light text-lg">
                Get the latest news about our electric vehicles and innovations
              </p>
            </motion.div>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors font-light"
              />
              <button
                type="submit"
                className="group flex items-center justify-center space-x-2 px-8 py-4 border border-white/40 text-white font-light hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider uppercase"
              >
                <span>{subscribed ? 'Subscribed!' : 'Subscribe'}</span>
                {!subscribed && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />}
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-8">
              <div className="flex flex-col">
                <span className="font-display font-black text-xl leading-tight tracking-tight">
                  CONSIDER DONE
                </span>
                <span className="font-display font-bold text-xs leading-tight tracking-widest text-white/60">
                  EV POWERED
                </span>
              </div>
            </div>
            <p className="text-white/50 mb-10 font-light text-sm leading-relaxed">
              Leading the future of electric mobility with premium, sustainable vehicles.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-colors duration-300 group"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300" strokeWidth={1} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-light text-sm uppercase tracking-widest mb-8 text-white/40">{category}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white transition-colors font-light text-sm group flex items-center"
                    >
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/40 text-xs font-light tracking-wider">
              © {new Date().getFullYear()} Consider Done EV. All rights reserved.
            </p>
            <a 
              href="https://www.linkedin.com/in/prsparkz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xs text-white/40 font-light hover:text-white/60 transition-colors"
            >
              <span>Design & Developed By</span>
              <span>Pr Sparkz</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
