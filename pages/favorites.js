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

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              ❤️ My Favorite Destinations
            </h1>
            <p className="text-gray-600">
              {user?.email && `Logged in as ${user.email}`}
            </p>
          </div>

          {favoriteDestinations.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-lg text-gray-700">
                  You have <strong>{favoriteDestinations.length}</strong> favorite destination{favoriteDestinations.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteDestinations.map((destination) => (
                  <DestinationCard 
                    key={destination.id} 
                    destination={destination}
                    favorites={favorites}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="mt-4 text-2xl font-semibold text-gray-700">No favorites yet</h3>
              <p className="mt-2 text-gray-500 mb-6">
                Start exploring and add destinations to your favorites!
              </p>
              <button
                onClick={() => router.push('/')}
                className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition font-medium"
              >
                Explore Destinations
              </button>
            </div>
          )}
        </div>
      </div>
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
