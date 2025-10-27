import { useEffect, useState } from 'react'
import DestinationCard from './DestinationCard'

export default function NearbyAttractions({ destinationId, allDestinations = [] }) {
  const [relatedDestinations, setRelatedDestinations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const response = await fetch(`/api/rdf?destinationId=${destinationId}`)
        const data = await response.json()
        
        // Filter actual destination objects from IDs
        const related = allDestinations.filter(dest => 
          data.related && data.related.includes(dest.id)
        )
        
        setRelatedDestinations(related)
      } catch (error) {
        console.error('Error fetching related destinations:', error)
      } finally {
        setLoading(false)
      }
    }

    if (destinationId) {
      fetchRelated()
    }
  }, [destinationId, allDestinations])

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Attractions</h2>
        <div className="text-gray-600">Loading related destinations...</div>
      </div>
    )
  }

  if (relatedDestinations.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🔗 Related Attractions (Semantic Relationships)
      </h2>
      <p className="text-gray-600 mb-6">
        Based on RDF relationships: nearby locations, similar categories, and cultural connections.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedDestinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  )
}
