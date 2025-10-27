import { Parser } from 'n3'

let fs, path

// Only import fs and path on server-side
if (typeof window === 'undefined') {
  fs = require('fs')
  path = require('path')
}

// Parse RDF file and return triples
export const parseRDFFile = (filePath) => {
  // Only allow this function to run on server-side
  if (typeof window !== 'undefined') {
    console.error('parseRDFFile can only be called on the server')
    return Promise.reject(new Error('parseRDFFile can only be called on the server'))
  }

  return new Promise((resolve, reject) => {
    const rdfData = fs.readFileSync(filePath, 'utf-8')
    const parser = new Parser()
    const triples = []

    parser.parse(rdfData, (error, triple, prefixes) => {
      if (error) {
        reject(error)
      } else if (triple) {
        triples.push(triple)
      } else {
        // Parsing is done
        resolve(triples)
      }
    })
  })
}

// Build relationship map from RDF triples
export const buildRelationshipMap = async () => {
  // Only allow this function to run on server-side
  if (typeof window !== 'undefined') {
    console.error('buildRelationshipMap can only be called on the server')
    return {}
  }

  try {
    const rdfPath = path.join(process.cwd(), 'public', 'data', 'destinations.rdf')
    const triples = await parseRDFFile(rdfPath)
    
    const relationshipMap = {}

    triples.forEach(triple => {
      const subject = extractId(triple.subject.value)
      const predicate = extractPredicate(triple.predicate.value)
      const object = triple.object.value

      if (!relationshipMap[subject]) {
        relationshipMap[subject] = {
          nearby: [],
          similar: [],
          category: null,
          city: null,
          state: null,
          activities: [],
        }
      }

      if (predicate === 'isNearby') {
        relationshipMap[subject].nearby.push(extractId(object))
      } else if (predicate === 'similarTo') {
        relationshipMap[subject].similar.push(extractId(object))
      } else if (predicate === 'belongsToCategory') {
        relationshipMap[subject].category = object
      } else if (predicate === 'isInCity') {
        relationshipMap[subject].city = object
      } else if (predicate === 'isInState') {
        relationshipMap[subject].state = object
      } else if (predicate === 'hasActivity') {
        relationshipMap[subject].activities.push(object)
      }
    })

    return relationshipMap
  } catch (error) {
    console.error('Error building relationship map:', error)
    return {}
  }
}

// Extract destination ID from URI
const extractId = (uri) => {
  const parts = uri.split('/')
  return parts[parts.length - 1]
}

// Extract predicate name from URI
const extractPredicate = (uri) => {
  const parts = uri.split('#')
  if (parts.length > 1) {
    return parts[1]
  }
  const lastPart = uri.split('/').pop()
  return lastPart
}

// Get related destinations by type
export const getRelatedDestinations = async (destinationId, relationType = 'all') => {
  const relationshipMap = await buildRelationshipMap()
  const relationships = relationshipMap[destinationId]

  if (!relationships) {
    return []
  }

  if (relationType === 'nearby') {
    return relationships.nearby
  } else if (relationType === 'similar') {
    return relationships.similar
  } else if (relationType === 'all') {
    return [...relationships.nearby, ...relationships.similar]
  }

  return []
}

// Get destinations by category using RDF
export const getDestinationsByCategory = async (category) => {
  const relationshipMap = await buildRelationshipMap()
  const destinationIds = []

  Object.keys(relationshipMap).forEach(id => {
    if (relationshipMap[id].category === category) {
      destinationIds.push(id)
    }
  })

  return destinationIds
}

// Get activities for a destination
export const getDestinationActivities = async (destinationId) => {
  const relationshipMap = await buildRelationshipMap()
  return relationshipMap[destinationId]?.activities || []
}
