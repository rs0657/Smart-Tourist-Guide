import { useState, useEffect } from 'react'
import Head from 'next/head'
import DestinationCard from '../components/DestinationCard'
import FilterBar from '../components/FilterBar'
import Loader, { CardSkeleton } from '../components/Loader'
import { getDestinations, filterDestinations } from '../lib/xmlParser'
import { getUniqueCategories, getUniqueStates } from '../lib/dataUtils'
import { supabase, getFavorites } from '../lib/supabaseClient'

export default function Home({ destinations }) {
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const [categories, setCategories] = useState([])
  const [states, setStates] = useState([])
  const [favorites, setFavorites] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Set categories and states
    const uniqueCategories = getUniqueCategories(destinations)
    const uniqueStates = getUniqueStates(destinations)
    setCategories(uniqueCategories)
    setStates(uniqueStates)

    // Get user and favorites
    const loadUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        const { data } = await getFavorites(user.id)
        setFavorites(data || [])
      }
    }

    loadUserData()
  }, [destinations])

  const handleFilterChange = (filters) => {
    setLoading(true)
    const filtered = filterDestinations(destinations, filters)
    setFilteredDestinations(filtered)
    setTimeout(() => setLoading(false), 300)
  }

  return (
    <>
      <Head>
        <title>Smart Tourism Guide - Explore Semantic Web Destinations</title>
        <meta name="description" content="Discover amazing tourist destinations using semantic web technologies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section with Advanced Animations */}
        <section className="relative bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 text-white py-24 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 opacity-5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className={`inline-block mb-6 ${mounted ? 'animate-bounce-slow' : ''}`}>
                <span className="text-7xl drop-shadow-lg">🌍</span>
              </div>
              <h1 className={`text-5xl md:text-6xl font-bold mb-6 text-white ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
                Smart Tourism Guide
              </h1>
              <p className={`text-2xl md:text-3xl mb-4 font-light text-white ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
                Enterprise Intelligent Tourism Platform with <span className="font-bold text-yellow-300">Semantic Web Intelligence</span>
              </p>
              <p className={`text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed ${mounted ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}>
                Leveraging cutting-edge RDF knowledge graphs, XML schemas, and AI-powered recommendation engines to deliver context-aware destination discovery across India's heritage sites, adventure destinations, and spiritual landmarks
              </p>
              
              {/* Animated Stats */}
              <div className={`mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto ${mounted ? 'animate-fade-in-up animation-delay-600' : 'opacity-0'}`}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-300 mb-2">{destinations.length}+</div>
                  <div className="text-sm text-blue-100">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-300 mb-2">{categories.length}+</div>
                  <div className="text-sm text-blue-100">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-300 mb-2">100+</div>
                  <div className="text-sm text-blue-100">Connections</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className={`mt-10 flex flex-wrap justify-center gap-4 ${mounted ? 'animate-fade-in-up animation-delay-800' : 'opacity-0'}`}>
                <a 
                  href="#destinations" 
                  className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 hover:text-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  Explore Now 🚀
                </a>
                <a 
                  href="/about" 
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Filter Bar with Animation */}
          <div id="destinations" className={mounted ? 'animate-slide-in-up' : 'opacity-0'}>
            <FilterBar onFilterChange={handleFilterChange} categories={categories} states={states} />
          </div>

          {/* Results Count with Animation */}
          <div className={`mb-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                {filteredDestinations.length} Destination{filteredDestinations.length !== 1 ? 's' : ''} Found
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Browse through our curated collection of amazing places ✨
            </p>
          </div>

          {/* Destinations Grid with Staggered Animation */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <CardSkeleton />
                </div>
              ))}
            </div>
          ) : filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination, index) => (
                <div 
                  key={destination.id} 
                  className={mounted ? 'animate-fade-in-up' : 'opacity-0'}
                  style={{ animationDelay: mounted ? `${index * 100}ms` : '0ms' }}
                >
                  <DestinationCard 
                    destination={destination}
                    favorites={favorites}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-16 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className={mounted ? 'animate-bounce-slow' : ''}>
                <svg className="mx-auto h-32 w-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-gray-700">No destinations found</h3>
              <p className="mt-3 text-gray-500 text-lg">Try adjusting your filters to discover amazing places</p>
            </div>
          )}

          {/* Features Section with Hover Animations */}
          <section className="mt-24">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Enterprise-Grade Platform Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border-t-4 border-blue-500">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🔍</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-primary-600 transition-colors">Knowledge Graph Search</h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced semantic querying with RDF triple stores, SPARQL optimization, and intelligent reasoning capabilities for context-aware destination discovery
                </p>
              </div>
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border-t-4 border-purple-500 animation-delay-200">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🗺️</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-purple-600 transition-colors">Ontology-Based Inference</h3>
                <p className="text-gray-600 leading-relaxed">
                  Automated relationship mapping using OWL ontologies and semantic inference rules to discover hidden connections and thematic patterns
                </p>
              </div>
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border-t-4 border-yellow-500 animation-delay-400">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">⭐</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-yellow-600 transition-colors">AI-Powered Personalization</h3>
                <p className="text-gray-600 leading-relaxed">
                  Machine learning algorithms integrated with semantic data for hyper-personalized recommendations based on user preferences and behavioral patterns
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-24 bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-8 py-16 text-center text-white">
              <h2 className="text-4xl font-bold mb-4 animate-fade-in">Ready to Start Your Journey?</h2>
              <p className="text-xl mb-8 text-blue-100 animate-fade-in animation-delay-200">Join thousands of travelers discovering India's hidden gems</p>
              <a 
                href="/about" 
                className="inline-block bg-white text-primary-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-primary-700 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl animate-fade-in animation-delay-400"
              >
                Get Started Today 🎯
              </a>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes slide-in-up {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-800 {
          animation-delay: 800ms;
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps() {
  const destinations = getDestinations()
  
  return {
    props: {
      destinations,
    },
  }
}
