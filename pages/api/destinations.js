import { getDestinations } from '../../lib/xmlParser'

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const destinations = getDestinations()
      res.status(200).json({ destinations })
    } catch (error) {
      console.error('Error fetching destinations:', error)
      res.status(500).json({ error: 'Failed to fetch destinations' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
