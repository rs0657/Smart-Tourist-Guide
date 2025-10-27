// Static list of tourism categories
export const categories = [
  'Heritage',
  'Beach',
  'Adventure',
  'Nature',
  'Spiritual',
  'Wildlife',
  'Hill Station',
  'Cultural',
  'Historical',
  'Urban',
]

// Category descriptions
export const categoryDescriptions = {
  Heritage: 'Historic monuments, palaces, and architectural marvels',
  Beach: 'Coastal destinations with beautiful beaches and water activities',
  Adventure: 'Thrilling activities like trekking, skiing, and paragliding',
  Nature: 'Natural landscapes, forests, and scenic beauty',
  Spiritual: 'Religious sites, temples, and meditation centers',
  Wildlife: 'National parks, sanctuaries, and animal reserves',
  'Hill Station': 'Mountain retreats with cool climate and scenic views',
  Cultural: 'Places showcasing art, traditions, and local culture',
  Historical: 'Sites of historical significance and ancient civilizations',
  Urban: 'Modern cities with shopping, entertainment, and nightlife',
}

// Category icons (emoji)
export const categoryIcons = {
  Heritage: '🏛️',
  Beach: '🏖️',
  Adventure: '🏔️',
  Nature: '🌿',
  Spiritual: '🕉️',
  Wildlife: '🦁',
  'Hill Station': '⛰️',
  Cultural: '🎭',
  Historical: '📜',
  Urban: '🌆',
}

// Get category color class
export const getCategoryColor = (category) => {
  const colors = {
    Heritage: 'bg-amber-100 text-amber-800',
    Beach: 'bg-blue-100 text-blue-800',
    Adventure: 'bg-red-100 text-red-800',
    Nature: 'bg-green-100 text-green-800',
    Spiritual: 'bg-purple-100 text-purple-800',
    Wildlife: 'bg-yellow-100 text-yellow-800',
    'Hill Station': 'bg-indigo-100 text-indigo-800',
    Cultural: 'bg-pink-100 text-pink-800',
    Historical: 'bg-gray-100 text-gray-800',
    Urban: 'bg-cyan-100 text-cyan-800',
  }
  
  return colors[category] || 'bg-gray-100 text-gray-800'
}

// Indian states with popular tourist destinations
export const states = [
  'Uttar Pradesh',
  'Goa',
  'Himachal Pradesh',
  'Rajasthan',
  'Kerala',
  'Karnataka',
  'Maharashtra',
  'Tamil Nadu',
  'Gujarat',
  'West Bengal',
  'Uttarakhand',
  'Jammu and Kashmir',
  'Ladakh',
  'Punjab',
  'Odisha',
]

export default {
  categories,
  categoryDescriptions,
  categoryIcons,
  getCategoryColor,
  states,
}
