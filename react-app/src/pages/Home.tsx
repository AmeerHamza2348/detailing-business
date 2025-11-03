import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiShield,
  FiAward,
  FiUsers,
  FiArrowRight,
  FiCheck,
  FiStar,
  FiCalendar,
  FiPhone,
  FiMail
} from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
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

  const services = [
    {
      title: 'Essential Detail',
      description: 'Complete exterior wash, interior vacuum, and basic polish for a clean, fresh look.',
      image: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=600&h=400&fit=crop&auto=format',
      duration: '2-3 hours',
      features: ['Exterior wash & dry', 'Interior vacuum', 'Tire dressing', 'Basic polish']
    },
    {
      title: 'Complete Detail',
      description: 'Comprehensive interior and exterior restoration with premium products.',
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop&auto=format',
      duration: '4-6 hours',
      features: ['Deep clean interior', 'Paint correction', 'Leather treatment', 'Engine bay cleaning']
    },
    {
      title: 'Ceramic Coating',
      description: 'Advanced ceramic protection for long-lasting shine and hydrophobic properties.',
      image: 'https://images.unsplash.com/photo-1606664515524-ed93e015d4d1?w=600&h=400&fit=crop&auto=format',
      duration: '1-2 days',
      features: ['9H hardness coating', '5-year protection', 'Hydrophobic effect', 'UV protection']
    },
    {
      title: 'Paint Protection',
      description: 'Premium paint protection film for ultimate defense against scratches and chips.',
      image: 'https://images.unsplash.com/photo-1617654112368-307921293fba?w=600&h=400&fit=crop&auto=format',
      duration: '1-2 days',
      features: ['Self-healing film', '10-year warranty', 'Clear protection', 'Maintains gloss']
    }
  ]

  const testimonials = [
    {
      name: 'Ahmed Hassan',
      car: 'Mercedes E-Class',
      rating: 5,
      text: 'Absolutely stunning results! My car looks better than when I bought it. The ceramic coating is incredible.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format'
    },
    {
      name: 'Sarah Khan',
      car: 'BMW 3 Series',
      rating: 5,
      text: 'Professional service with attention to detail. The interior detailing transformed my car completely.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=100&h=100&fit=crop&auto=format'
    },
    {
      name: 'Ali Raza',
      car: 'Audi A4',
      rating: 5,
      text: 'Best detailing service in Lahore! The paint protection film was installed perfectly. Highly recommended!',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format'
    }
  ]

  const stats = [
    { number: '1000+', label: 'Happy Customers' },
    { number: '5+', label: 'Years Experience' },
    { number: '4.9', label: 'Average Rating' },
    { number: '24h', label: 'Quick Turnaround' }
  ]

  return (
    <div className="bg-dark-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1554224155-6d67457a8192?w=1920&h=1080&fit=crop&auto=format"
            alt="Car detailing background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900/90 via-dark-800/80 to-primary-900/60" />
        </div>

        <div className="relative z-10 container-custom text-center">
          <motion.div {...fadeInUp}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display">
              Your Car Deserves
              <span className="text-gradient"> Prestige</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Premium Car Detailing in Lahore — Showroom Finish, Lasting Protection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Book Now
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/gallery" className="btn btn-outline btn-lg">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Premium Services
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From basic maintenance to complete restoration, we offer comprehensive detailing solutions
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="card card-hover h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="service-card-image group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    <div className="text-sm text-primary-400 mb-4">{service.duration}</div>
                    <Link
                      to="/services"
                      className="text-primary-400 hover:text-primary-300 font-medium flex items-center group"
                    >
                      Learn More
                      <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Prestige Detailing?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We combine expertise, premium products, and exceptional service to deliver outstanding results
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiShield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Expert Craftsmanship</h3>
              <p className="text-gray-400">
                Certified professionals with years of experience in luxury car detailing
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiAward className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Premium Products</h3>
              <p className="text-gray-400">
                Only the finest imported products and advanced detailing technology
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiUsers className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Trusted by Lahore</h3>
              <p className="text-gray-400">
                Serving hundreds of satisfied customers across Lahore since 2019
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="testimonial-card"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.car}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Car?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Book your detailing appointment today and experience the Prestige difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn btn-secondary btn-lg">
                <FiCalendar className="mr-2 w-5 h-5" />
                Book Appointment
              </Link>
              <a href="tel:+923001234567" className="btn btn-outline btn-lg">
                <FiPhone className="mr-2 w-5 h-5" />
                Call +92 300-1234567
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home