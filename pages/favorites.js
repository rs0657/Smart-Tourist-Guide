import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import DestinationCard from '../components/DestinationCard'
import { supabase, getFavorites } from '../lib/supabaseClient'
import { getDestinations } from '../lib/xmlParser'

export default function Favorites({ allDestinations }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [favoriteDestinations, setFavoriteDestinations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFavorites = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth')
        return
      }

      setUser(user)
      
      const { data, error } = await getFavorites(user.id)
      
      if (!error && data) {
        setFavorites(data)
        
        // Match favorites with actual destinations
        const favDestinations = allDestinations.filter(dest =>
          data.some(fav => fav.destination_id === dest.id)
        )
        
        setFavoriteDestinations(favDestinations)
      }
      
      setLoading(false)
    }

    loadFavorites()
  }, [allDestinations, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading your favorites...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>My Favorites - Smart Tourism Guide</title>
        <meta name="description" content="Your favorite tourist destinations" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 flex items-center">
                  <span className="mr-3">❤️</span>
                  My Favorite Destinations
                </h1>
                <p className="text-lg text-blue-100">
                  {user?.email && `Signed in as ${user.email}`}
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 text-center">
                  <div className="text-4xl font-bold">{favoriteDestinations.length}</div>
                  <div className="text-sm text-blue-100 mt-1">Saved Places</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {favoriteDestinations.length > 0 ? (
            <>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Your Curated Collection
                  </h2>
                  <p className="text-gray-600">
                    You have saved <strong className="text-primary-600">{favoriteDestinations.length}</strong> amazing destination{favoriteDestinations.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={() => router.push('/')}
                  className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-primary-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  + Add More
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteDestinations.map((destination, index) => (
                  <div 
                    key={destination.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <DestinationCard 
                      destination={destination}
                      favorites={favorites}
                    />
                  </div>
                ))}
              </div>

              {/* Tips Section */}
              <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-3xl mr-3">💡</span>
                  Travel Planning Tips
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-3xl mb-3">🗓️</div>
                    <h4 className="font-bold text-gray-800 mb-2">Best Time to Visit</h4>
                    <p className="text-gray-600 text-sm">Check the seasonal recommendations for each destination to plan your perfect trip</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-3xl mb-3">🎯</div>
                    <h4 className="font-bold text-gray-800 mb-2">Create Itinerary</h4>
                    <p className="text-gray-600 text-sm">Group nearby destinations together for efficient travel planning</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-3xl mb-3">📸</div>
                    <h4 className="font-bold text-gray-800 mb-2">Share & Explore</h4>
                    <p className="text-gray-600 text-sm">Discover related attractions based on your favorites using our semantic web technology</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl p-12">
                  <div className="mb-6">
                    <div className="inline-block p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-full">
                      <svg className="h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Your Collection is Empty</h3>
                  <p className="text-lg text-gray-600 mb-8">
                    Start building your personalized travel wishlist by exploring our amazing destinations and clicking the heart icon on places you'd love to visit!
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8 text-sm">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                      <div className="text-2xl mb-2">🏰</div>
                      <div className="font-semibold text-gray-800">Heritage Sites</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
                      <div className="text-2xl mb-2">🏔️</div>
                      <div className="font-semibold text-gray-800">Adventures</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4">
                      <div className="text-2xl mb-2">🕉️</div>
                      <div className="font-semibold text-gray-800">Spiritual</div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/')}
                    className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:from-primary-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                  >
                    Explore Destinations Now →
                  </button>
                </div>
              </div>
            </div>
          )}
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

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps() {
  const allDestinations = getDestinations()
  
  return {
    props: {
      allDestinations,
    },
  }
}
