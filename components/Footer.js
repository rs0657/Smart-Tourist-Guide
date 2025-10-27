export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">🌍 Smart Tourism Guide</h3>
            <p className="text-gray-400 text-sm">
              Discover amazing destinations using semantic web technologies. 
              Explore heritage sites, adventure spots, and spiritual places across India.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition">Home</a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition">About</a>
              </li>
              <li>
                <a href="/favorites" className="text-gray-400 hover:text-white transition">Favorites</a>
              </li>
              <li>
                <a href="/about#contact" className="text-gray-400 hover:text-white transition">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Technologies</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Next.js & React</li>
              <li>• Tailwind CSS</li>
              <li>• Supabase</li>
              <li>• XML & RDF</li>
              <li>• Semantic Web</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Smart Tourism Guide. Built with semantic web technologies.
          </p>
        </div>
      </div>
    </footer>
  )
}
