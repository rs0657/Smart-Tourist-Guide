// Helper utility functions for data manipulation

// Calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  
  return distance
}

const toRadians = (degrees) => {
  return degrees * (Math.PI / 180)
}

// Sort destinations by distance from a given location
export const sortByDistance = (destinations, fromLat, fromLon) => {
  return destinations
    .map(dest => ({
      ...dest,
      distance: calculateDistance(fromLat, fromLon, dest.latitude, dest.longitude),
    }))
    .sort((a, b) => a.distance - b.distance)
}

// Sort destinations by rating
export const sortByRating = (destinations, order = 'desc') => {
  return [...destinations].sort((a, b) => {
    if (order === 'desc') {
      return b.rating - a.rating
    }
    return a.rating - b.rating
  })
}

// Group destinations by category
export const groupByCategory = (destinations) => {
  return destinations.reduce((acc, dest) => {
    if (!acc[dest.category]) {
      acc[dest.category] = []
    }
    acc[dest.category].push(dest)
    return acc
  }, {})
}

// Group destinations by state
export const groupByState = (destinations) => {
  return destinations.reduce((acc, dest) => {
    if (!acc[dest.state]) {
      acc[dest.state] = []
    }
    acc[dest.state].push(dest)
    return acc
  }, {})
}

// Get unique categories from destinations
export const getUniqueCategories = (destinations) => {
  const categories = destinations.map(dest => dest.category)
  return [...new Set(categories)].sort()
}

// Get unique states from destinations
export const getUniqueStates = (destinations) => {
  const states = destinations.map(dest => dest.state)
  return [...new Set(states)].sort()
}

// Format date for best time to visit
export const formatBestTime = (timeString) => {
  return timeString || 'Year round'
}

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Check if user has favorited a destination
export const isFavorite = (destinationId, favorites) => {
  if (!favorites || favorites.length === 0) return false
  return favorites.some(fav => fav.destination_id === destinationId)
}
