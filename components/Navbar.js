import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase, signOut } from '../lib/supabaseClient'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
  }

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-primary-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">🌍 Smart Tourism</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-white hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium transition">
              Home
            </Link>
            <Link href="/about" className="text-white hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium transition">
              About
            </Link>
            <Link href="/favorites" className="text-white hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium transition">
              Favorites
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="bg-white text-primary-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/auth" className="bg-white text-primary-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-primary-700 p-2 rounded-md"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/about" className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <Link href="/favorites" className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium">
              Favorites
            </Link>
            {user ? (
              <>
                <div className="text-white px-3 py-2 text-sm">
                  {user.email}
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-white hover:bg-primary-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth" className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
