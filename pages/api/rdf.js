import { getRelatedDestinations, buildRelationshipMap } from '../../lib/rdfParser'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { destinationId, type } = req.query

      if (destinationId) {
        // Get related destinations for a specific destination
        const related = await getRelatedDestinations(destinationId, type || 'all')
        res.status(200).json({ destinationId, related })
      } else {
        // Return full relationship map
        const relationshipMap = await buildRelationshipMap()
        res.status(200).json({ relationshipMap })
      }
    } catch (error) {
      console.error('Error processing RDF data:', error)
      res.status(500).json({ error: 'Failed to process RDF data' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
