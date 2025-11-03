import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FiAward,
  FiUsers,
  FiTrendingUp,
  FiMapPin,
  FiClock,
  FiPhone,
  FiMail,
  FiCheck,
  FiHeart,
  FiStar,
  FiTarget,
  FiZap
} from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  const [animatedStats, setAnimatedStats] = useState({
    customers: 0,
    years: 0,
    rating: 0,
    projects: 0
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        customers: 1000,
        years: 5,
        rating: 4.9,
        projects: 1500
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

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

  const team = [
    {
      name: 'Ahmed Hassan',
      role: 'Founder & Lead Detailer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format',
      bio: 'With over 8 years of experience in premium automotive detailing, Ahmed leads our team with expertise in ceramic coating and paint correction.',
      specialties: ['Ceramic Coating', 'Paint Correction', 'Luxury Vehicles']
    },
    {
      name: 'Sarah Khan',
      role: 'Interior Specialist',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=400&h=400&fit=crop&auto=format',
      bio: 'Sarah specializes in luxury interior restoration and leather care, bringing meticulous attention to detail to every vehicle\'s interior.',
      specialties: ['Interior Restoration', 'Leather Care', 'Fabric Protection']
    },
    {
      name: 'Ali Raza',
      role: 'Paint Protection Expert',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format',
      bio: 'Ali is our PPF and ceramic coating expert, with advanced training in paint protection film application and surface preparation.',
      specialties: ['PPF Installation', 'Surface Preparation', 'Quality Control']
    }
  ]

  const values = [
    {
      icon: FiTarget,
      title: 'Precision & Excellence',
      description: 'Every detail matters. From paint correction to interior restoration, we treat each vehicle as a work of art.'
    },
    {
      icon: FiZap,
      title: 'Premium Quality',
      description: 'We use only the finest imported products and proven techniques to ensure lasting, showroom-quality results.'
    },
    {
      icon: FiHeart,
      title: 'Passion for Cars',
      description: 'As car enthusiasts ourselves, we understand the emotional connection owners have with their vehicles.'
    },
    {
      icon: FiAward,
      title: 'Expert Craftsmanship',
      description: 'Our certified professionals bring years of experience and continuous training to every service we provide.'
    }
  ]

  const Counter = ({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      const startTime = Date.now()
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / (duration * 1000), 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeOutQuart * end))

        if (progress >= 1) {
          clearInterval(timer)
        }
      }, 16)

      return () => clearInterval(timer)
    }, [end, duration])

    return (
      <span>
        {count.toLocaleString()}{suffix}
      </span>
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
            alt="About hero"
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
              Craftsmanship Meets
              <span className="text-gradient"> Passion</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Lahore's trusted name in premium automotive detailing since 2019
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Founded in 2019 by automotive enthusiasts with a vision to bring world-class detailing services to Lahore, Prestige Car Detailing began as a small garage with a big dream.
                </p>
                <p className="text-lg leading-relaxed">
                  Our mission has always been simple: <strong>"To provide Lahore's car owners with the same level of care and attention to detail that we would give our own vehicles."</strong>
                </p>
                <p className="text-lg leading-relaxed">
                  What started as a one-person operation has grown into a team of certified professionals, serving over 1,000 satisfied customers across Lahore. We've transformed from a small garage to a premium detailing studio, but our commitment to excellence remains unchanged.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, we're proud to be Lahore's most trusted name in automotive care, combining cutting-edge technology with traditional craftsmanship to deliver results that exceed expectations.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1606664515524-ed93e015d4d1?w=600&h=400&fit=crop&auto=format"
                  alt="Our workshop"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-primary-600 text-white px-4 py-2 rounded-full inline-block mb-4">
                    Since 2019
                  </div>
                  <h3 className="text-2xl font-bold text-white">Excellence in Every Detail</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 font-display">
                <Counter end={animatedStats.customers} suffix="+" />
              </div>
              <div className="text-gray-400">Satisfied Customers</div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 font-display">
                <Counter end={animatedStats.years} suffix="+" />
              </div>
              <div className="text-gray-400">Years in Business</div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 font-display">
                <Counter end={animatedStats.rating} suffix="/5" />
              </div>
              <div className="text-gray-400">Customer Rating</div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 font-display">
                <Counter end={animatedStats.projects} suffix="+" />
              </div>
              <div className="text-gray-400">Projects Completed</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The experts behind your vehicle's transformation
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="card p-8 text-center"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary-600"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-primary-400 font-medium mb-4">{member.role}</p>
                <p className="text-gray-300 mb-6">{member.bio}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="bg-dark-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Expertise</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional knowledge and specialized skills
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiAward className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">10+ Years Combined Experience</h3>
                  <p className="text-gray-300">Our team brings over a decade of professional detailing experience, ensuring your vehicle receives expert care from skilled technicians.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiUsers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">15+ Certifications & Training</h3>
                  <p className="text-gray-300">Our detailers hold multiple international certifications and continuously update their skills with the latest detailing technologies and techniques.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiTrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">50+ Luxury Vehicles Serviced</h3>
                  <p className="text-gray-300">Specializing in luxury and high-performance vehicles, we have extensive experience with premium brands including Mercedes, BMW, Porsche, and more.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1551745586-b4b1d539b6eb?w=600&h=400&fit=crop&auto=format"
                alt="Our expertise"
                className="rounded-2xl w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Experience the Prestige Difference
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join hundreds of satisfied customers who trust us with their vehicles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/contact'}
                className="btn btn-secondary btn-lg"
              >
                Book Your Consultation
              </button>
              <button
                onClick={() => window.location.href = '/gallery'}
                className="btn btn-outline btn-lg"
              >
                View Our Work
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <FiCheck className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white">Free consultation</p>
              </div>
              <div className="text-center">
                <FiCheck className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white">Satisfaction guaranteed</p>
              </div>
              <div className="text-center">
                <FiCheck className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white">Premium products only</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About