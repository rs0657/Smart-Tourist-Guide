export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 animate-ping opacity-75"></div>
          <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 shadow-2xl">
            <span className="text-6xl animate-bounce">🌍</span>
          </div>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
          Loading Amazing Destinations...
        </h2>
        
        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-600 via-purple-600 to-blue-600 animate-progress"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse h-full">
      {/* Image Skeleton */}
      <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-animate"></div>
      
      <div className="p-6">
        {/* Title Skeleton */}
        <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-3 bg-animate"></div>
        
        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-animate"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-5/6 bg-animate"></div>
        </div>
        
        {/* Location Skeleton */}
        <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2 mb-4 bg-animate"></div>
        
        {/* Footer Skeleton */}
        <div className="pt-4 border-t border-gray-200">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 bg-animate"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .bg-animate {
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-2 border-4 border-purple-600 rounded-full border-t-transparent animate-spin-reverse"></div>
        </div>
        <p className="text-lg font-semibold text-gray-700 animate-pulse">Processing...</p>
      </div>

      <style jsx>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
      `}</style>
    </div>
  )
}
