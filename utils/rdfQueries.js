// Common RDF query patterns for semantic relationships

export const rdfQueries = {
  // Find all destinations in a specific category
  findByCategory: (category) => `
    PREFIX tour: <http://smarttourism.org/ontology#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    
    SELECT ?destination
    WHERE {
      ?destination tour:belongsToCategory "${category}" .
    }
  `,

  // Find nearby destinations
  findNearby: (destinationId) => `
    PREFIX tour: <http://smarttourism.org/ontology#>
    
    SELECT ?nearby
    WHERE {
      <http://smarttourism.org/destination/${destinationId}> tour:isNearby ?nearby .
    }
  `,

  // Find similar destinations
  findSimilar: (destinationId) => `
    PREFIX tour: <http://smarttourism.org/ontology#>
    
    SELECT ?similar
    WHERE {
      <http://smarttourism.org/destination/${destinationId}> tour:similarTo ?similar .
    }
  `,

  // Find destinations in a city
  findByCity: (city) => `
    PREFIX tour: <http://smarttourism.org/ontology#>
    
    SELECT ?destination
    WHERE {
      ?destination tour:isInCity "${city}" .
    }
  `,

  // Find destinations with specific activities
  findByActivity: (activity) => `
    PREFIX tour: <http://smarttourism.org/ontology#>
    
    SELECT ?destination
    WHERE {
      ?destination tour:hasActivity "${activity}" .
    }
  `,

  // Get all relationships for a destination
  getAllRelationships: (destinationId) => `
    PREFIX tour: <http://smarttourism.org/ontology#>
    
    SELECT ?predicate ?object
    WHERE {
      <http://smarttourism.org/destination/${destinationId}> ?predicate ?object .
    }
  `,

  // Find destinations in same category and nearby
  findCategoryAndNearby: (category, destinationId) => `
    PREFIX tour: <http://smarttourism.org/ontology#>
    
    SELECT ?destination
    WHERE {
      ?destination tour:belongsToCategory "${category}" .
      <http://smarttourism.org/destination/${destinationId}> tour:isNearby ?destination .
    }
  `,
}

// Helper function to parse query results
export const parseQueryResults = (results) => {
  if (!results || !Array.isArray(results)) {
    return []
  }
  
  return results.map(result => {
    if (typeof result === 'object') {
      return Object.values(result)[0]
    }
    return result
  })
}

// Helper to extract destination ID from URI
export const extractDestinationId = (uri) => {
  if (!uri) return null
  const parts = uri.split('/')
  return parts[parts.length - 1]
}

export default rdfQueries
