import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiCar,
  FiMessageSquare,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface BookingFormData {
  name: string
  phone: string
  email: string
  carModel: string
  carYear: string
  service: string
  date: string
  time: string
  message: string
}

const Contact = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    carModel: '',
    carYear: '',
    service: '',
    date: '',
    time: '',
    message: ''
  })

  const [errors, setErrors] = useState<Partial<BookingFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const services = [
    { id: 'essential', name: 'Essential Detail', price: '5,000', duration: '2-3 hours' },
    { id: 'complete', name: 'Complete Detail', price: '15,000', duration: '4-6 hours' },
    { id: 'ceramic', name: 'Ceramic Coating', price: '35,000', duration: '1-2 days' },
    { id: 'protection', name: 'Paint Protection', price: '50,000', duration: '1-2 days' }
  ]

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  const faqs = [
    {
      question: 'How long does a full detail take?',
      answer: 'Essential Detail takes 2-3 hours, Complete Detail takes 4-6 hours, while Ceramic Coating and Paint Protection may require 1-2 days including curing time.'
    },
    {
      question: 'Do you offer mobile detailing services?',
      answer: 'Yes! We offer mobile detailing services across Lahore. Our team comes equipped with professional tools and products for on-location service.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, bank transfers, credit/debit cards, JazzCash, EasyPaisa, and PayPal for your convenience.'
    },
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking 2-3 days in advance for regular services and 1 week for ceramic coating or paint protection services.'
    }
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!/^\+92\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Pakistan phone number (+92 XXX XXXXXXX)'
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.carModel.trim()) newErrors.carModel = 'Car model is required'
    if (!formData.carYear.trim()) newErrors.carYear = 'Car year is required'
    if (!formData.service) newErrors.service = 'Please select a service'
    if (!formData.date) newErrors.date = 'Please select a date'
    if (!formData.time) newErrors.time = 'Please select a time slot'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof BookingFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="container-custom section-padding">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Booking Confirmed!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Thank you for choosing Prestige Detailing. We'll contact you within 2 hours to confirm your appointment.
            </p>
            <div className="bg-dark-800 rounded-2xl p-8 text-left mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Booking Details:</h3>
              <div className="space-y-3 text-gray-300">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Service:</strong> {services.find(s => s.id === formData.service)?.name}</p>
                <p><strong>Car:</strong> {formData.carYear} {formData.carModel}</p>
                <p><strong>Date:</strong> {formatDate(formData.date)}</p>
                <p><strong>Time:</strong> {formData.time}</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="btn btn-primary btn-lg"
            >
              Back to Home
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 hero-gradient">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=600&fit=crop&auto=format"
            alt="Contact hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900/90 via-dark-800/80 to-primary-900/60" />
        </div>
        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Book your detailing appointment or request a free consultation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Book Your Detailing Session</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">
                      <FiUser className="inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Ahmed Hassan"
                    />
                    {errors.name && <p className="form-error flex items-center">
                      <FiAlertCircle className="mr-1 w-4 h-4" />
                      {errors.name}
                    </p>}
                  </div>

                  <div>
                    <label className="form-label">
                      <FiPhone className="inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="+92 300 1234567"
                    />
                    {errors.phone && <p className="form-error flex items-center">
                      <FiAlertCircle className="mr-1 w-4 h-4" />
                      {errors.phone}
                    </p>}
                  </div>
                </div>

                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="ahmed@example.com"
                  />
                  {errors.email && <p className="form-error flex items-center">
                    <FiAlertCircle className="mr-1 w-4 h-4" />
                    {errors.email}
                  </p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">
                      <FiCar className="inline mr-2" />
                      Car Model *
                    </label>
                    <input
                      type="text"
                      name="carModel"
                      value={formData.carModel}
                      onChange={handleInputChange}
                      className={`form-input ${errors.carModel ? 'border-red-500' : ''}`}
                      placeholder="Honda Civic"
                    />
                    {errors.carModel && <p className="form-error flex items-center">
                      <FiAlertCircle className="mr-1 w-4 h-4" />
                      {errors.carModel}
                    </p>}
                  </div>

                  <div>
                    <label className="form-label">Year *</label>
                    <input
                      type="text"
                      name="carYear"
                      value={formData.carYear}
                      onChange={handleInputChange}
                      className={`form-input ${errors.carYear ? 'border-red-500' : ''}`}
                      placeholder="2022"
                    />
                    {errors.carYear && <p className="form-error flex items-center">
                      <FiAlertCircle className="mr-1 w-4 h-4" />
                      {errors.carYear}
                    </p>}
                  </div>
                </div>

                <div>
                  <label className="form-label">Service Package *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={`form-input ${errors.service ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select a service</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} - PKR {service.price} ({service.duration})
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="form-error flex items-center">
                    <FiAlertCircle className="mr-1 w-4 h-4" />
                    {errors.service}
                  </p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">
                      <FiCalendar className="inline mr-2" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`form-input ${errors.date ? 'border-red-500' : ''}`}
                    />
                    {errors.date && <p className="form-error flex items-center">
                      <FiAlertCircle className="mr-1 w-4 h-4" />
                      {errors.date}
                    </p>}
                  </div>

                  <div>
                    <label className="form-label">
                      <FiClock className="inline mr-2" />
                      Preferred Time *
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={`form-input ${errors.time ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    {errors.time && <p className="form-error flex items-center">
                      <FiAlertCircle className="mr-1 w-4 h-4" />
                      {errors.time}
                    </p>}
                  </div>
                </div>

                <div>
                  <label className="form-label">
                    <FiMessageSquare className="inline mr-2" />
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="form-input"
                    placeholder="Tell us about your car's condition or any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Book Appointment'
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Phone</h4>
                      <a href="tel:+923001234567" className="text-primary-400 hover:text-primary-300">
                        +92 300-1234567
                      </a>
                      <p className="text-sm text-gray-400">Mon-Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.88 3.79z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">WhatsApp</h4>
                      <a
                        href="https://wa.me/923001234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300"
                      >
                        Chat on WhatsApp
                      </a>
                      <p className="text-sm text-gray-400">Instant responses available</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiMail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email</h4>
                      <a href="mailto:info@prestigedetailing.com" className="text-primary-400 hover:text-primary-300">
                        info@prestigedetailing.com
                      </a>
                      <p className="text-sm text-gray-400">24/7 email support</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Location</h4>
                      <p className="text-gray-300">Lahore, Punjab, Pakistan</p>
                      <p className="text-sm text-gray-400">Mobile detailing available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <a
                    href="tel:+923001234567"
                    className="btn btn-primary w-full"
                  >
                    <FiPhone className="mr-2 w-5 h-5" />
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/923001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-green-500 hover:bg-green-600 text-white w-full"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to know about our services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="faq-item"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="faq-question flex items-center justify-between w-full"
                >
                  <span className="font-medium">{faq.question}</span>
                  {expandedFaq === index ? (
                    <FiChevronUp className="w-5 h-5" />
                  ) : (
                    <FiChevronDown className="w-5 h-5" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Contact