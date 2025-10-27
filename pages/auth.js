import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

export default function Auth() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push('/favorites')
      }
    }
    checkUser()
  }, [router])

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (isSignUp) {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        })

        if (error) throw error

        setSuccess('Account created successfully! Please check your email for verification.')
        setTimeout(() => {
          setIsSignUp(false)
        }, 2000)
      } else {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        setSuccess('Signed in successfully! Redirecting...')
        setTimeout(() => {
          router.push('/favorites')
        }, 1000)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: '❤️',
      title: 'Save Your Favorites',
      description: 'Bookmark destinations you love and access them anytime from your personalized dashboard',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: '🎯',
      title: 'Personalized Recommendations',
      description: 'Get AI-powered suggestions based on your saved destinations and browsing history',
      color: 'from-blue-500 to-purple-500',
    },
    {
      icon: '🗺️',
      title: 'Trip Planning',
      description: 'Create and manage custom itineraries with your favorite destinations',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Receive updates about seasonal changes, events, and best times to visit your saved places',
      color: 'from-orange-500 to-yellow-500',
    },
    {
      icon: '📊',
      title: 'Travel Insights',
      description: 'Access detailed analytics and insights about your travel preferences and patterns',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: '🌐',
      title: 'Sync Across Devices',
      description: 'Access your favorites and preferences seamlessly across all your devices',
      color: 'from-cyan-500 to-blue-500',
    },
  ]

  return (
    <>
      <Head>
        <title>{isSignUp ? 'Sign Up' : 'Sign In'} - Smart Tourism Guide</title>
        <meta name="description" content="Sign in to access personalized features and save your favorite destinations" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isSignUp ? 'Join Our Community' : 'Welcome Back'}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {isSignUp 
                ? 'Create an account to unlock personalized travel experiences and intelligent recommendations'
                : 'Sign in to access your saved destinations and personalized travel insights'
              }
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Features Section */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Unlock Premium Features
              </h2>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`text-4xl p-3 rounded-lg bg-gradient-to-r ${feature.color} bg-opacity-10`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary-600">10K+</div>
                    <div className="text-sm text-gray-600 mt-1">Active Users</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">50K+</div>
                    <div className="text-sm text-gray-600 mt-1">Saved Favorites</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">4.9★</div>
                    <div className="text-sm text-gray-600 mt-1">User Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Auth Form Section */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-2xl p-8 lg:sticky lg:top-8">
                <div className="text-center mb-8">
                  <div className="inline-block p-4 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full mb-4">
                    <span className="text-5xl">🔐</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </h2>
                  <p className="text-gray-600">
                    {isSignUp 
                      ? 'Join thousands of travelers discovering amazing destinations'
                      : 'Access your personalized travel dashboard'
                    }
                  </p>
                </div>

                {error && (
                  <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex items-center">
                      <span className="text-red-500 text-xl mr-2">⚠️</span>
                      <p className="text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                {success && (
                  <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <div className="flex items-center">
                      <span className="text-green-500 text-xl mr-2">✓</span>
                      <p className="text-green-700">{success}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleAuth} className="space-y-6">
                  {isSignUp && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={isSignUp}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-200 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-200 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-200 transition-all"
                      placeholder="••••••••"
                    />
                    {isSignUp && (
                      <p className="mt-2 text-sm text-gray-500">
                        Minimum 6 characters
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-primary-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span>{isSignUp ? 'Create Account' : 'Sign In'} →</span>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      setIsSignUp(!isSignUp)
                      setError(null)
                      setSuccess(null)
                    }}
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                  </button>
                </div>

                {/* Security Badge */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <span>🔒</span>
                    <span>Secured with enterprise-grade encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
