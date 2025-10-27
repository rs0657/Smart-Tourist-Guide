import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { supabase, addToFavorites, removeFromFavorites } from '../lib/supabaseClient'
import { isFavorite } from '../lib/dataUtils'

export default function DestinationCard({ destination, favorites = [] }) {
  const [user, setUser] = useState(null)
  const [isFav, setIsFav] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
    setIsFav(isFavorite(destination.id, favorites))
  }, [destination.id, favorites])

  const toggleFavorite = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      alert('Please sign in to add favorites')
      return
    }

    setIsLoading(true)
    
    if (isFav) {
      const { error } = await removeFromFavorites(user.id, destination.id)
      if (!error) {
        setIsFav(false)
      }
    } else {
      const { error } = await addToFavorites(user.id, destination.id)
      if (!error) {
        setIsFav(true)
      }
    }
    
    setIsLoading(false)
  }

  return (
    <Link href={`/destination/${destination.id}`}>
      <div 
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 border border-gray-100 h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
            priority={false}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500"></div>
          
          {/* Favorite Button with Animation */}
          <button
            onClick={toggleFavorite}
            disabled={isLoading}
            className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md ${
              isFav ? 'bg-red-500 scale-100' : 'bg-white/90'
            } shadow-lg transition-all duration-300 ${isLoading ? 'opacity-50' : 'hover:scale-125 active:scale-95'}`}
          >
            {isFav ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>
          
          {/* Category Badge with Shimmer */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-block bg-gradient-to-r from-primary-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform group-hover:scale-105 transition-transform duration-300">
              {destination.category}
            </span>
            <div className="flex items-center bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-gray-800 font-bold">{destination.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Title with Gradient on Hover */}
          <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {destination.name}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>
          
          {/* Location with Icon */}
          <div className="flex items-center text-sm text-gray-500 mb-4 group-hover:text-primary-600 transition-colors duration-300">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{destination.city}, {destination.state}</span>
          </div>
          
          {/* Best Time with Enhanced Styling */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">
                  <span className="font-semibold text-gray-800">Best Time:</span> {destination.bestTimeToVisit}
                </span>
              </div>
            </div>
          </div>
          
          {/* View Details Arrow - Appears on Hover */}
          <div className={`mt-4 flex items-center justify-end text-primary-600 font-semibold transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <span className="mr-2">View Details</span>
            <svg className="w-5 h-5 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-horizontal {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }

        .animate-bounce-horizontal {
          animation: bounce-horizontal 1s ease-in-out infinite;
        }
      `}</style>
    </Link>
  )
}
