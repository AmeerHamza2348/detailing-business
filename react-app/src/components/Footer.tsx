import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiFacebook,
  FiInstagram,
  FiYoutube
} from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Basic Wash & Polish', path: '/services#basic' },
      { name: 'Complete Detailing', path: '/services#complete' },
      { name: 'Ceramic Coating', path: '/services#ceramic' },
      { name: 'Paint Protection', path: '/services#protection' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'Contact', path: '/contact' },
      { name: 'Blog', path: '/blog' },
    ],
    contact: [
      { name: '+92 300-1234567', path: 'tel:+923001234567' },
      { name: 'info@prestigedetailing.com', path: 'mailto:info@prestigedetailing.com' },
    ]
  }

  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                <span className="text-white font-bold text-lg font-display">PD</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-accent">
                  Prestige Detailing
                </h3>
                <p className="text-xs text-gray-400">Lahore, Pakistan</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional car detailing services in Lahore. Revive, protect, and impress with premium automotive care.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <FiPhone className="w-4 h-4 text-primary-400" />
                <a
                  href="tel:+923001234567"
                  className="hover:text-primary-400 transition-colors text-sm"
                >
                  +92 300-1234567
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <FiMail className="w-4 h-4 text-primary-400" />
                <a
                  href="mailto:info@prestigedetailing.com"
                  className="hover:text-primary-400 transition-colors text-sm"
                >
                  info@prestigedetailing.com
                </a>
              </div>
              <div className="flex items-start space-x-3 text-gray-400">
                <FiMapPin className="w-4 h-4 text-primary-400 mt-0.5" />
                <span className="text-sm">
                  Lahore, Punjab, Pakistan
                </span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <FiClock className="w-4 h-4 text-primary-400" />
                <span className="text-sm">
                  Mon-Sat: 9:00 AM - 7:00 PM
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Prestige Car Detailing Lahore. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer