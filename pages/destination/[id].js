import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getDestinations, getDestinationById } from '../../lib/xmlParser'
import { getRelatedDestinations } from '../../lib/rdfParser'
import NearbyAttractions from '../../components/NearbyAttractions'
import Loader from '../../components/Loader'
import { supabase, addToFavorites, removeFromFavorites, getFavorites } from '../../lib/supabaseClient'

export default function DestinationDetail({ destination, allDestinations }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user && destination) {
        const { data } = await getFavorites(user.id)
        const isFav = data?.some(fav => fav.destination_id === destination.id)
        setIsFavorite(isFav || false)
      }
    }

    loadUserData()
  }, [destination])

  const toggleFavorite = async () => {
    if (!user) {
      alert('Please sign in to add favorites')
      router.push('/auth')
      return
    }

    setIsLoading(true)
    
    if (isFavorite) {
      const { error } = await removeFromFavorites(user.id, destination.id)
      if (!error) {
        setIsFavorite(false)
      }
    } else {
      const { error } = await addToFavorites(user.id, destination.id)
      if (!error) {
        setIsFavorite(true)
      }
    }
    
    setIsLoading(false)
  }

  if (router.isFallback) {
    return <Loader />
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Destination not found</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{destination.name} - Smart Tourism Guide</title>
        <meta name="description" content={destination.description} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Image */}
        <div className="relative h-96 w-full">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{destination.name}</h1>
              <p className="text-xl">
                {destination.city}, {destination.state}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center text-primary-600 hover:text-primary-800 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      {destination.name}
                    </h2>
                    <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                      {destination.category}
                    </span>
                  </div>
                  <button
                    onClick={toggleFavorite}
                    disabled={isLoading}
                    className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                  >
                    {isFavorite ? (
                      <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </button>
                </div>

                <div className="prose max-w-none mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {destination.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-gray-800">{destination.city}, {destination.state}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <p className="font-semibold text-gray-800">{destination.rating} / 5.0</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-green-50 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">Best Time to Visit</p>
                      <p className="font-semibold text-gray-800">{destination.bestTimeToVisit}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-semibold text-gray-800">{destination.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Info</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">📍</span>
                    <span><strong>City:</strong> {destination.city}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🗺️</span>
                    <span><strong>State:</strong> {destination.state}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🌏</span>
                    <span><strong>Country:</strong> {destination.country}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🏷️</span>
                    <span><strong>Type:</strong> {destination.category}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">⭐</span>
                    <span><strong>Rating:</strong> {destination.rating}/5</span>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold text-gray-800 mb-2">Coordinates</h4>
                  <p className="text-sm text-gray-600">
                    Lat: {destination.latitude}<br />
                    Long: {destination.longitude}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Attractions */}
          <NearbyAttractions 
            destinationId={destination.id} 
            allDestinations={allDestinations}
          />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const destination = getDestinationById(params.id)
  const allDestinations = getDestinations()
  
  return {
    props: {
      destination: destination || null,
      allDestinations,
    },
  }
}
