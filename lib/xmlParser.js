import { XMLParser } from 'fast-xml-parser'

let fs, path

// Only import fs and path on server-side
if (typeof window === 'undefined') {
  fs = require('fs')
  path = require('path')
}

export const parseXMLFile = (filePath) => {
  // Only allow this function to run on server-side
  if (typeof window !== 'undefined') {
    console.error('parseXMLFile can only be called on the server')
    return null
  }

  try {
    const xmlData = fs.readFileSync(filePath, 'utf-8')
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    })
    const result = parser.parse(xmlData)
    return result
  } catch (error) {
    console.error('Error parsing XML:', error)
    return null
  }
}

export const getDestinations = () => {
  // Only allow this function to run on server-side
  if (typeof window !== 'undefined') {
    console.error('getDestinations can only be called on the server')
    return []
  }

  const xmlPath = path.join(process.cwd(), 'public', 'data', 'destinations.xml')
  const parsed = parseXMLFile(xmlPath)
  
  if (!parsed || !parsed.destinations || !parsed.destinations.destination) {
    return []
  }

  const destinations = Array.isArray(parsed.destinations.destination)
    ? parsed.destinations.destination
    : [parsed.destinations.destination]

  return destinations.map(dest => ({
    id: dest['@_id'],
    name: dest.name,
    category: dest.category,
    city: dest.city,
    state: dest.state,
    country: dest.country,
    description: dest.description,
    image: dest.image,
    latitude: parseFloat(dest.latitude),
    longitude: parseFloat(dest.longitude),
    rating: parseFloat(dest.rating),
    bestTimeToVisit: dest.bestTimeToVisit,
  }))
}

export const getDestinationById = (id) => {
  const destinations = getDestinations()
  return destinations.find(dest => dest.id === id)
}

export const filterDestinations = (destinations, filters) => {
  let filtered = [...destinations]

  // Filter by category
  if (filters.category && filters.category !== 'All') {
    filtered = filtered.filter(dest => dest.category === filters.category)
  }

  // Filter by state
  if (filters.state && filters.state !== 'All') {
    filtered = filtered.filter(dest => dest.state === filters.state)
  }

  // Filter by city
  if (filters.city) {
    filtered = filtered.filter(dest => 
      dest.city.toLowerCase().includes(filters.city.toLowerCase())
    )
  }

  // Search by name, description, city, or state
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(dest =>
      dest.name.toLowerCase().includes(searchLower) ||
      dest.description.toLowerCase().includes(searchLower) ||
      dest.city.toLowerCase().includes(searchLower) ||
      dest.state.toLowerCase().includes(searchLower)
    )
  }

  return filtered
}
