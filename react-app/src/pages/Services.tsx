import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiDroplet,
  FiShield,
  FiSun,
  FiStar,
  FiCheck,
  FiClock,
  FiArrowRight,
  FiInfo,
  FiCalendar
} from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface Service {
  id: string
  title: string
  subtitle: string
  description: string
  price: string
  duration: string
  image: string
  features: string[]
  benefits: string[]
  popular?: boolean
  includes: string[]
  notIncludes?: string[]
}

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services: Service[] = [
    {
      id: 'essential',
      title: 'Essential Detail',
      subtitle: 'Perfect for regular maintenance',
      description: 'Our essential detailing package provides comprehensive cleaning and protection for your vehicle. Perfect for regular maintenance to keep your car looking its best.',
      price: '5,000',
      duration: '2-3 hours',
      image: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=800&h=600&fit=crop&auto=format',
      features: [
        'Complete exterior wash and dry',
        'Interior vacuum and wipe down',
        'Dashboard and console cleaning',
        'Tire dressing and rim cleaning',
        'Window cleaning (inside & out)',
        'Air freshener application'
      ],
      benefits: [
        'Removes surface dirt and grime',
        'Protects paint from contaminants',
        'Improves interior air quality',
        'Enhances overall appearance',
        'Maintains vehicle value'
      ],
      includes: [
        'Premium car shampoo',
        'Microfiber towels',
        'Tire dressing',
        'Interior cleaner',
        'Glass cleaner',
        'Air freshener'
      ]
    },
    {
      id: 'complete',
      title: 'Complete Detail',
      subtitle: 'The ultimate deep clean experience',
      description: 'Our most popular comprehensive detailing service that addresses every aspect of your vehicle\'s appearance, inside and out.',
      price: '15,000',
      duration: '4-6 hours',
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop&auto=format',
      popular: true,
      features: [
        'Thorough exterior decontamination',
        'Clay bar treatment',
        'Paint sealant application',
        'Deep interior shampoo',
        'Leather conditioning (if applicable)',
        'Engine bay cleaning',
        'Headlight restoration',
        'Trim restoration'
      ],
      benefits: [
        'Restores paint to showroom condition',
        'Removes embedded contaminants',
        'Provides long-lasting protection',
        'Eliminates stubborn stains',
        'Improves nighttime visibility',
        'Enhances resale value'
      ],
      includes: [
        'All Essential Detail services',
        'Professional clay bar',
        'Paint sealant',
        'Interior extractor',
        'Leather conditioner',
        'Engine degreaser',
        'Headlight restoration kit'
      ]
    },
    {
      id: 'ceramic',
      title: 'Ceramic Coating',
      subtitle: 'Premium paint protection system',
      description: 'Advanced nano-ceramic coating provides superior protection and incredible gloss that lasts for years.',
      price: '35,000',
      duration: '1-2 days',
      image: 'https://images.unsplash.com/photo-1606664515524-ed93e015d4d1?w=800&h=600&fit=crop&auto=format',
      features: [
        'Multi-stage paint correction',
        'Surface preparation and decontamination',
        '9H ceramic coating application',
        'Infrared curing for maximum durability',
        'Hydrophobic water-repellent finish',
        'UV protection and chemical resistance',
        'High gloss enhancement',
        '1-3 year warranty included'
      ],
      benefits: [
        'Superior scratch resistance',
        'Self-cleaning hydrophobic properties',
        'Intense gloss and depth',
        'Protection against environmental damage',
        'Easier maintenance and cleaning',
        'Preserves paint integrity'
      ],
      includes: [
        'Complete paint correction',
        'Surface decontamination',
        'Premium ceramic coating',
        'Professional application tools',
        'Curing equipment',
        'Warranty documentation',
        'Maintenance kit'
      ],
      notIncludes: [
        'Paint protection film',
        'Deep scratch removal',
        'Major paint damage repair'
      ]
    },
    {
      id: 'protection',
      title: 'Paint Protection Film',
      subtitle: 'Ultimate invisible shield',
      description: 'Self-healing paint protection film that safeguards your vehicle\'s paint from rock chips, scratches, and environmental damage.',
      price: '50,000',
      duration: '1-2 days',
      image: 'https://images.unsplash.com/photo-1617654112368-307921293fba?w=800&h=600&fit=crop&auto=format',
      features: [
        'Premium self-healing PPF installation',
        'Computer-cut precision patterns',
        'Full front coverage (hood, fenders, bumper)',
        'Edge sealing for maximum protection',
        'Infrared curing for optimal adhesion',
        '5-10 year manufacturer warranty',
        'Maintenance guidelines and care kit',
        'Yellowing and staining resistance'
      ],
      benefits: [
        'Protects against rock chips and scratches',
        'Self-healing properties for minor swirls',
        'Maintains original paint condition',
        'Enhances resale value',
        'Virtually invisible when properly installed',
        'Resists yellowing and staining'
      ],
      includes: [
        'High-quality PPF material',
        'Professional installation',
        'Edge sealing solution',
        'Warranty registration',
        'Maintenance products',
        'Installation certificate'
      ],
      notIncludes: [
        'Full body coverage (additional cost)',
        'Ceramic coating over PPF',
        'Paint repair underneath film'
      ]
    }
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 hero-gradient">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1554224155-6d67457a8192?w=1920&h=600&fit=crop&auto=format"
            alt="Services hero"
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
              Premium Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the level of care and protection your vehicle deserves
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Comparison */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Service Packages</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From basic maintenance to complete protection, we have the perfect service for your needs
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`card card-hover h-full ${service.popular ? 'border-2 border-primary-600' : ''}`}>
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                      <p className="text-gray-300">{service.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-3xl font-bold text-primary-400">PKR {service.price}</div>
                        <div className="text-sm text-gray-400 flex items-center">
                          <FiClock className="w-4 h-4 mr-1" />
                          {service.duration}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <div className="text-sm text-gray-400">4.9/5 Rating</div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6">{service.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3 flex items-center">
                        <FiCheck className="w-5 h-5 text-primary-400 mr-2" />
                        What's Included:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start text-gray-300 text-sm">
                            <FiCheck className="w-4 h-4 text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3 flex items-center">
                        <FiInfo className="w-5 h-5 text-primary-400 mr-2" />
                        Key Benefits:
                      </h4>
                      <ul className="space-y-2">
                        {service.benefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx} className="flex items-start text-gray-300 text-sm">
                            <FiDroplet className="w-4 h-4 text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setSelectedService(service.id)}
                        className="btn btn-outline flex-1"
                      >
                        View Details
                      </button>
                      <Link
                        to="/contact"
                        state={{ selectedService: service.id }}
                        className="btn btn-primary flex-1"
                      >
                        Book Now
                        <FiArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {(() => {
              const service = services.find(s => s.id === selectedService)!
              return (
                <div className="relative">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="relative h-64 lg:h-80">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-xl text-gray-300">{service.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-6 lg:p-8">
                    <div className="grid lg:grid-cols-3 gap-8 mb-8">
                      <div>
                        <div className="text-3xl font-bold text-primary-400 mb-2">PKR {service.price}</div>
                        <div className="text-gray-400 flex items-center">
                          <FiClock className="w-4 h-4 mr-1" />
                          {service.duration}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <div className="text-gray-400">4.9/5 Customer Rating</div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-400 mb-2">Availability</div>
                        <div className="text-green-400 font-semibold">In Stock</div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-8 text-lg">{service.description}</p>

                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <FiCheck className="w-6 h-6 text-primary-400 mr-2" />
                          Complete Service Features
                        </h4>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-gray-300">
                              <FiCheck className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <FiShield className="w-6 h-6 text-primary-400 mr-2" />
                          Benefits & Protection
                        </h4>
                        <ul className="space-y-3">
                          {service.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start text-gray-300">
                              <FiSun className="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {service.notIncludes && (
                      <div className="bg-dark-700 rounded-lg p-6 mb-8">
                        <h4 className="text-lg font-semibold text-white mb-3">Not Included:</h4>
                        <ul className="space-y-2">
                          {service.notIncludes.map((item, idx) => (
                            <li key={idx} className="flex items-start text-gray-400 text-sm">
                              <svg className="w-4 h-4 text-gray-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <button
                        onClick={() => setSelectedService(null)}
                        className="btn btn-outline flex-1"
                      >
                        Close
                      </button>
                      <Link
                        to="/contact"
                        state={{ selectedService: service.id }}
                        className="btn btn-primary flex-1"
                        onClick={() => setSelectedService(null)}
                      >
                        <FiCalendar className="mr-2 w-5 h-5" />
                        Book This Service
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        </motion.div>
      )}

      {/* Process Section */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Detailing Process</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional, systematic approach to ensure perfect results every time
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'We discuss your needs and inspect your vehicle' },
              { step: '02', title: 'Preparation', description: 'Thorough washing and decontamination' },
              { step: '03', title: 'Detailing', description: 'Professional application of selected services' },
              { step: '04', title: 'Final Inspection', description: 'Quality check and customer satisfaction' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Services