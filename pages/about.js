import Head from 'next/head'
import Image from 'next/image'

export default function About() {
  const developers = [
    {
      name: 'Mr. Raghuram S',
      role: 'Lead Developer & Project Architect',
      description: 'Specialized in full-stack development and semantic web technologies. Responsible for system architecture and RDF integration.',
      avatar: 'RS',
    },
    {
      name: 'Ms. Sweta Singh',
      role: 'Frontend Developer & UI/UX Designer',
      description: 'Expert in modern web technologies including React, Next.js, and advanced CSS frameworks. Passionate about crafting pixel-perfect, accessible interfaces with exceptional user experiences. Specializes in responsive design patterns and state-of-the-art frontend architecture.',
      avatar: 'SS',
    },
    {
      name: 'Ms. Vanshika',
      role: 'Backend Developer & Data Engineer',
      description: 'Focused on XML/RDF data modeling, Supabase integration, and ensuring robust data relationships across the platform.',
      avatar: 'V',
    },
  ]

  const technologies = [
    { name: 'Next.js', icon: '⚛️', description: 'React framework for production' },
    { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS framework' },
    { name: 'Supabase', icon: '🔥', description: 'Backend as a Service' },
    { name: 'XML', icon: '📄', description: 'Structured data representation' },
    { name: 'RDF', icon: '🔗', description: 'Semantic web relationships' },
    { name: 'Vercel', icon: '▲', description: 'Deployment platform' },
  ]

  return (
    <>
      <Head>
        <title>About Us - Smart Tourism Guide</title>
        <meta name="description" content="Learn about the team behind Smart Tourism Guide and our mission" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Smart Tourism Guide
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Revolutionizing travel discovery through semantic web technologies
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mission Section */}
          <section className="mb-16">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Smart Tourism Guide is more than just a travel website—it's an innovative platform that leverages 
                the power of <strong>Semantic Web technologies</strong> to provide intelligent, context-aware 
                recommendations for travelers exploring India's rich cultural heritage.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Unlike traditional tourism platforms that simply list destinations, we use <strong>RDF 
                (Resource Description Framework)</strong> and <strong>XML</strong> to create meaningful 
                relationships between places, enabling smart discovery of nearby attractions, similar 
                destinations, and thematic connections that traditional databases cannot provide.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our goal is to make travel planning more intuitive, personalized, and enriching by helping 
                you discover not just where to go, but understanding the cultural and geographical connections 
                between destinations.
              </p>
            </div>
          </section>

          {/* Development Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Meet Our Development Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {developers.map((developer, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                      {developer.avatar}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                      {developer.name}
                    </h3>
                    <p className="text-primary-600 font-semibold mb-3 text-center">
                      {developer.role}
                    </p>
                    <p className="text-gray-600 text-center text-sm">
                      {developer.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {technologies.map((tech, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-3">{tech.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{tech.name}</h3>
                  <p className="text-xs text-gray-600">{tech.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Features Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What Makes Us Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">🧠</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Semantic Intelligence</h3>
                    <p className="text-gray-600">
                      Our RDF-based knowledge graph understands relationships between destinations, 
                      enabling smart recommendations that go beyond simple keyword matching.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">🔗</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Linked Data</h3>
                    <p className="text-gray-600">
                      Using semantic web standards, we create meaningful connections between places, 
                      categories, and cultural themes for richer discovery experiences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">⚡</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Modern Performance</h3>
                    <p className="text-gray-600">
                      Built with Next.js for blazing-fast page loads, server-side rendering, 
                      and optimal SEO performance across all devices.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">🎯</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">User-Centric Design</h3>
                    <p className="text-gray-600">
                      Intuitive interface with powerful filtering, search capabilities, 
                      and personalized favorites to enhance your travel planning journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Academic Project Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Academic Excellence</h2>
              <p className="text-lg text-gray-700 text-center mb-4">
                This project was developed as part of the <strong>Semantic Web</strong> course curriculum 
                for Semester 7, demonstrating practical applications of ontologies, RDF triples, 
                and linked data principles in real-world scenarios.
              </p>
              <p className="text-center text-gray-600">
                <strong>Institution:</strong> [Your College/University Name]<br />
                <strong>Department:</strong> Computer Science & Engineering<br />
                <strong>Academic Year:</strong> 2024-2025
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h2>
              <p className="text-lg text-gray-700 mb-6">
                We'd love to hear your feedback and suggestions for improvement!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="mailto:contact@smarttourism.com" 
                  className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition font-medium"
                >
                  📧 Email Us
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition font-medium"
                >
                  💻 View on GitHub
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
