import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
  FiFilter,
  FiGrid,
  FiEye
} from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface GalleryItem {
  id: string
  title: string
  category: string
  beforeImage: string
  afterImage: string
  description: string
  carModel: string
  serviceType: string
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [filter, setFilter] = useState('all')
  const [showBefore, setShowBefore] = useState(true)

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: 'Mercedes E-Class Transformation',
      category: 'exterior',
      beforeImage: 'https://images.unsplash.com/photo-1617654112368-307921293fba?w=800&h=600&fit=crop&auto=format',
      afterImage: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop&auto=format',
      description: 'Complete exterior restoration with ceramic coating',
      carModel: 'Mercedes E-Class 2022',
      serviceType: 'Ceramic Coating'
    },
    {
      id: '2',
      title: 'BMW 3 Series Interior Detail',
      category: 'interior',
      beforeImage: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=800&h=600&fit=crop&auto=format',
      afterImage: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop&auto=format',
      description: 'Deep interior cleaning and leather conditioning',
      carModel: 'BMW 3 Series 2021',
      serviceType: 'Complete Detail'
    },
    {
      id: '3',
      title: 'Audi A4 Paint Protection',
      category: 'protection',
      beforeImage: 'https://images.unsplash.com/photo-1606664515524-ed93e015d4d1?w=800&h=600&fit=crop&auto=format',
      afterImage: 'https://images.unsplash.com/photo-1610741023275-652b69858930?w=800&h=600&fit=crop&auto=format',
      description: 'Full front paint protection film installation',
      carModel: 'Audi A4 2023',
      serviceType: 'Paint Protection Film'
    },
    {
      id: '4',
      title: 'Honda Civic Complete Detail',
      category: 'exterior',
      beforeImage: 'https://images.unsplash.com/photo-1590362473633-221f79e329a0?w=800&h=600&fit=crop&auto=format',
      afterImage: 'https://images.unsplash.com/photo-1549398259-9b72c1e4d4b3?w=800&h=600&fit=crop&auto=format',
      description: 'Paint correction and sealant application',
      carModel: 'Honda Civic 2020',
      serviceType: 'Complete Detail'
    },
    {
      id: '5',
      title: 'Toyota Camry Interior Restoration',
      category: 'interior',
      beforeImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop&auto=format',
      afterImage: 'https://images.unsplash.com/photo-1606664515524-ed93e015d4d1?w=800&h=600&fit=crop&auto=format',
      description: 'Complete interior restoration with fabric protection',
      carModel: 'Toyota Camry 2021',
      serviceType: 'Complete Detail'
    },
    {
      id: '6',
      title: 'Porsche 911 Ceramic Coating',
      category: 'ceramic',
      beforeImage: 'https://images.unsplash.com/photo-1549398259-9b72c1e4d4b3?w=800&h=600&fit=crop&auto=format',
      afterImage: 'https://images.unsplash.com/photo-1551745586-b4b1d539b6eb?w=800&h=600&fit=crop&auto=format',
      description: 'Premium ceramic coating with 3-year warranty',
      carModel: 'Porsche 911 2022',
      serviceType: 'Ceramic Coating'
    },
    {
      id: '7',
      title: 'Lexus RX350 Premium Detail',
      category: 'exterior',
      beforeImage: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop&auto=format',
      afterImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format',
      description: 'Multi-stage paint correction and high-gloss sealant',
      carModel: 'Lexus RX350 2023',
      serviceType: 'Complete Detail'
    },
    {
      id: '8',
      title: 'Ford Mustang Interior & Exterior',
      category: 'complete',
      beforeImage: 'https://images.unsplash.com/photo-1583121274602-3e07291d9dc3?w=800&h=600&fit=crop&auto=format',
      afterImage: 'https://images.unsplash.com/photo-1616788227735-977e627b517d?w=800&h=600&fit=crop&auto=format',
      description: 'Complete interior and exterior transformation',
      carModel: 'Ford Mustang 2021',
      serviceType: 'Complete Detail'
    },
    {
      id: '9',
      title: 'Tesla Model 3 Paint Protection',
      category: 'protection',
      beforeImage: 'https://images.unsplash.com/photo-1610741023275-652b69858930?w=800&h=600&fit=crop&auto=format',
      afterImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&auto=format',
      description: 'Full vehicle PPF with self-healing technology',
      carModel: 'Tesla Model 3 2023',
      serviceType: 'Paint Protection Film'
    }
  ]

  const categories = [
    { value: 'all', label: 'All Work' },
    { value: 'exterior', label: 'Exterior' },
    { value: 'interior', label: 'Interior' },
    { value: 'ceramic', label: 'Ceramic Coating' },
    { value: 'protection', label: 'Paint Protection' },
    { value: 'complete', label: 'Complete Detail' }
  ]

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter)

  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedImage(item)
    setCurrentImageIndex(index)
    setShowBefore(true)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    setCurrentImageIndex(0)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredItems.length - 1
      setCurrentImageIndex(newIndex)
      setSelectedImage(filteredItems[newIndex])
      setShowBefore(true)
    } else {
      const newIndex = currentImageIndex < filteredItems.length - 1 ? currentImageIndex + 1 : 0
      setCurrentImageIndex(newIndex)
      setSelectedImage(filteredItems[newIndex])
      setShowBefore(true)
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
            alt="Gallery hero"
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
              Our Work Speaks
              <span className="text-gradient"> For Itself</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transformations that showcase our commitment to automotive excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-dark-800">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-2">Our Portfolio</h2>
              <p className="text-gray-400">{filteredItems.length} projects completed</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setFilter(category.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === category.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                  }`}
                >
                  <FiFilter className="inline mr-2 w-4 h-4" />
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(item, index)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-dark-800 card-hover">
                  <div className="aspect-w-16 aspect-h-12 relative">
                    <img
                      src={item.afterImage}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60"></div>

                    {/* Overlay with Before/After toggle */}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center">
                        <FiZoomIn className="w-12 h-12 text-white mx-auto mb-2" />
                        <p className="text-white font-semibold">View Before & After</p>
                      </div>
                    </div>

                    {/* Before/After Badge */}
                    <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Before & After
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 bg-dark-900/80 backdrop-blur text-white px-3 py-1 rounded-full text-sm">
                      {categories.find(c => c.value === item.category)?.label}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{item.carModel}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-400 text-sm font-medium">{item.serviceType}</span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <FiEye className="w-4 h-4 mr-1" />
                        View Details
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-700">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedImage.title}</h3>
                  <p className="text-gray-400">{selectedImage.carModel} • {selectedImage.serviceType}</p>
                </div>
                <button
                  onClick={closeLightbox}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Image Display */}
              <div className="relative">
                <div className="aspect-w-16 aspect-h-10 relative">
                  <img
                    src={showBefore ? selectedImage.beforeImage : selectedImage.afterImage}
                    alt={selectedImage.title}
                    className="w-full h-[500px] object-contain bg-dark-900"
                  />

                  {/* Before/After Toggle */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex bg-dark-800/80 backdrop-blur rounded-full p-1">
                    <button
                      onClick={() => setShowBefore(true)}
                      className={`px-6 py-2 rounded-full font-medium transition-colors ${
                        showBefore ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Before
                    </button>
                    <button
                      onClick={() => setShowBefore(false)}
                      className={`px-6 py-2 rounded-full font-medium transition-colors ${
                        !showBefore ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      After
                    </button>
                  </div>

                  {/* Navigation Arrows */}
                  {filteredItems.length > 1 && (
                    <>
                      <button
                        onClick={() => navigateImage('prev')}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-dark-800/80 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-dark-700 transition-colors"
                      >
                        <FiChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => navigateImage('next')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-dark-800/80 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-dark-700 transition-colors"
                      >
                        <FiChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="p-6 border-t border-dark-700">
                <p className="text-gray-300 mb-4">{selectedImage.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-primary-600/20 text-primary-400 px-3 py-1 rounded-full text-sm">
                    {selectedImage.serviceType}
                  </span>
                  <span className="bg-dark-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                    {selectedImage.carModel}
                  </span>
                  <span className="bg-dark-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                    {categories.find(c => c.value === selectedImage.category)?.label}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Vehicle?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join our satisfied customers and experience the Prestige difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/contact'}
                className="btn btn-secondary btn-lg"
              >
                Book Your Transformation
              </button>
              <button
                onClick={() => window.location.href = '/services'}
                className="btn btn-outline btn-lg"
              >
                View Our Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Gallery