import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMessageCircle, FiX } from 'react-icons/fi'

const WhatsAppFloat = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleWhatsAppClick = () => {
    const phoneNumber = '+923001234567'
    const message = encodeURIComponent('Hi! I\'m interested in your car detailing services.')
    window.open(`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${message}`, '_blank')
  }

  return (
    <div className="whatsapp-float">
      {/* Expanded Message */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 bg-dark-800 text-white p-4 rounded-lg shadow-lg border border-dark-600 w-64"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-primary-400">Chat with us on WhatsApp</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Get instant response for your car detailing needs
                </p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white ml-2"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              Start Chat
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={isExpanded ? handleWhatsAppClick : () => setIsExpanded(true)}
        className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative"
        aria-label="WhatsApp"
      >
        <FiMessageCircle className="w-8 h-8" />

        {/* Notification Dot */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-dark-900"
        />
      </motion.button>
    </div>
  )
}

export default WhatsAppFloat