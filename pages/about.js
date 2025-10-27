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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Smart Tourism Guide
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-6">
              Enterprise-grade intelligent tourism platform leveraging cutting-edge Semantic Web technologies to deliver context-aware, personalized travel experiences through advanced knowledge graphs and RDF-based recommendation engines
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold">
                Production-Ready Architecture
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold">
                Scalable Infrastructure
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold">
                AI-Powered Insights
              </span>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mission Section */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-10 border-t-4 border-primary-600">
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Platform Vision & Architecture
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <span className="text-3xl mr-3">🎯</span>
                    Strategic Objective
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Smart Tourism Guide represents a paradigm shift in digital tourism platforms, implementing 
                    enterprise-grade <strong>Semantic Web technologies</strong> to deliver intelligent, 
                    context-aware destination discovery through advanced knowledge representation and reasoning capabilities.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <span className="text-3xl mr-3">🏗️</span>
                    Technical Innovation
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Utilizing industry-standard <strong>RDF (Resource Description Framework)</strong> triples and 
                    <strong>XML schemas</strong>, our platform creates a sophisticated knowledge graph that enables 
                    semantic querying, automated reasoning, and intelligent relationship mapping between destinations, 
                    categories, and contextual attributes.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="text-3xl mr-3">⚡</span>
                  Competitive Differentiation
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Unlike conventional tourism platforms relying on basic relational databases, our application 
                  implements a <strong>semantic layer</strong> that understands contextual relationships, enabling:
                </p>
                <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-2">•</span>
                    <span>Dynamic ontology-based destination clustering and similarity matching</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-2">•</span>
                    <span>Automated inference of geographical and cultural proximity patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-2">•</span>
                    <span>Semantic query expansion for enhanced search relevance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 font-bold mr-2">•</span>
                    <span>Machine-readable data enabling AI-powered recommendation engines</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <span className="text-3xl mr-3">🚀</span>
                  Enterprise Scalability
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Built on modern JAMstack architecture with Next.js 14, our platform ensures optimal performance 
                  through server-side rendering, intelligent code splitting, and edge-optimized content delivery. 
                  The semantic data layer is designed to scale horizontally, supporting enterprise-level data volumes 
                  while maintaining sub-second query response times through optimized RDF triple stores and caching strategies.
                </p>
              </div>
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
            <div className="bg-gradient-to-r from-primary-50 via-purple-50 to-blue-50 rounded-2xl shadow-xl p-10 border-2 border-primary-200">
              <div className="flex items-center justify-center mb-6">
                <span className="text-5xl mr-4">🎓</span>
                <h2 className="text-4xl font-bold text-gray-800">Research & Development Initiative</h2>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 text-center leading-relaxed mb-6">
                  This platform represents an advanced research implementation developed as part of the 
                  <strong> Semantic Web Technologies</strong> specialization curriculum, demonstrating 
                  production-ready applications of W3C standards, ontology engineering, RDF triple stores, 
                  and Linked Open Data (LOD) principles in enterprise-scale systems.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-md text-center">
                    <div className="text-3xl mb-2">🏛️</div>
                    <h3 className="font-bold text-gray-800 mb-2">Academic Institution</h3>
                    <p className="text-gray-600">Leading Technical University<br/>Computer Science & Engineering</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md text-center">
                    <div className="text-3xl mb-2">📚</div>
                    <h3 className="font-bold text-gray-800 mb-2">Research Domain</h3>
                    <p className="text-gray-600">Semantic Web Technologies<br/>Knowledge Representation</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md text-center">
                    <div className="text-3xl mb-2">📅</div>
                    <h3 className="font-bold text-gray-800 mb-2">Development Period</h3>
                    <p className="text-gray-600">Academic Year 2024-2025<br/>Semester 7 Capstone</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🔬</span>
                    Technical Contributions & Standards Compliance
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-600 font-bold mr-2">✓</span>
                      <span>Implementation of W3C RDF 1.1 specifications with SPARQL 1.1 query protocol</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 font-bold mr-2">✓</span>
                      <span>Custom tourism ontology design following OWL 2 Web Ontology Language standards</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 font-bold mr-2">✓</span>
                      <span>Integration of JSON-LD for enhanced semantic markup and schema.org compatibility</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 font-bold mr-2">✓</span>
                      <span>Production-grade full-stack architecture with enterprise security patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 font-bold mr-2">✓</span>
                      <span>Scalable deployment infrastructure with CI/CD pipeline automation</span>
                    </li>
                  </ul>
                </div>
              </div>
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
                  href="https://github.com/rs0657/Smart-Tourist-Guide.git" 
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
