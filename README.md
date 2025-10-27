# 🌍 Smart Tourism Guide

A modern, intelligent tourism guide application built with Next.js, leveraging Semantic Web technologies (XML/RDF) and Supabase for personalized travel recommendations.

![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.3.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-2.43.0-3ECF8E?style=for-the-badge&logo=supabase)

## ✨ Features

### 🔍 Semantic Web Intelligence
- **XML Data Structure**: Structured destination data with rich metadata
- **RDF Relationships**: Semantic relationships between destinations using RDF triples
- **Ontology-Based Connections**: Discover related attractions through intelligent semantic queries

### 🎯 Core Functionality
- **Smart Search & Filtering**: Filter destinations by category, location, and search terms
- **Related Destinations**: AI-powered recommendations based on RDF relationships
- **Favorites System**: Save and manage your favorite destinations with user authentication
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Server-Side Rendering**: Fast initial page loads with Next.js SSR

### 🎨 Modern UI/UX
- **Beautiful Animations**: Smooth fade-in, slide-up, and staggered card animations
- **Interactive Cards**: Hover effects with image zoom and gradient overlays
- **Gradient Designs**: Modern gradient backgrounds and text effects
- **Loading States**: Elegant shimmer skeleton loaders
- **Custom Scrollbar**: Styled scrollbar matching the theme

## 🚀 Tech Stack

### Frontend
- **Next.js 14.2.0** - React framework with SSR and API routes
- **React 18.3.0** - UI component library
- **Tailwind CSS 3.4.3** - Utility-first CSS framework

### Backend & Database
- **Supabase 2.43.0** - Authentication and PostgreSQL database
- **Node.js** - Server-side runtime

### Semantic Web Technologies
- **fast-xml-parser 4.3.6** - XML parsing for destination data
- **n3 1.17.2** - RDF triple parsing
- **rdflib 2.2.34** - RDF semantic querying

## 📁 Project Structure

```
smart-tourism-guide/
├── components/           # React components
│   ├── DestinationCard.js    # Destination card with animations
│   ├── FilterBar.js          # Search and filter component
│   ├── Navbar.js             # Navigation bar with auth
│   ├── Footer.js             # Footer component
│   ├── Loader.js             # Loading states and skeletons
│   └── NearbyAttractions.js  # RDF-based related destinations
├── pages/               # Next.js pages
│   ├── _app.js              # App wrapper
│   ├── index.js             # Home page with animations
│   ├── about.js             # About page
│   ├── favorites.js         # User favorites page
│   ├── api/                 # API routes
│   │   ├── destinations.js  # Destination data endpoint
│   │   ├── rdf.js          # RDF relationships endpoint
│   │   └── auth.js         # Authentication reference
│   └── destination/
│       └── [id].js         # Dynamic destination detail page
├── lib/                 # Utility libraries
│   ├── xmlParser.js         # XML parsing functions
│   ├── rdfParser.js         # RDF parsing and queries
│   ├── dataUtils.js         # Helper functions
│   └── supabaseClient.js    # Supabase configuration
├── public/              # Static assets
│   ├── data/
│   │   ├── destinations.xml # XML destination data
│   │   └── destinations.rdf # RDF semantic relationships
│   └── images/              # Destination images
├── styles/              # Global styles
│   └── globals.css         # Tailwind and custom CSS
├── utils/               # Utility functions
│   ├── rdfQueries.js       # SPARQL-like query patterns
│   └── categoryList.js     # Category definitions
└── .env.local          # Environment variables (not tracked)
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16.x or higher
- npm or yarn
- Supabase account (free tier available)

### Step 1: Clone the Repository
```bash
git clone https://github.com/rs0657/Smart-Tourist-Guide.git
cd Smart-Tourist-Guide
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Get your Supabase credentials:**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > API
4. Copy the Project URL and anon/public key

### Step 4: Database Setup
Run this SQL in your Supabase SQL Editor:

```sql
-- Create favorites table
CREATE TABLE favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  destination_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, destination_id)
);

-- Enable Row Level Security
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_destination_id ON favorites(destination_id);
```

### Step 5: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

### Browsing Destinations
1. **Home Page**: View all destinations with beautiful animations
2. **Search**: Use the search bar to find specific destinations
3. **Filter**: Filter by category (Heritage, Adventure, Spiritual, etc.)
4. **View Details**: Click any card to see full destination details

### Managing Favorites
1. **Sign Up/Login**: Create an account using email/password
2. **Add Favorites**: Click the heart icon on any destination card
3. **View Favorites**: Navigate to the Favorites page from the navbar
4. **Remove Favorites**: Click the heart icon again to remove

### Discovering Related Places
- Visit any destination detail page
- Scroll to "Related Attractions" section
- Discover semantically connected destinations based on RDF relationships

## 🗺️ Data Structure

### XML Format (destinations.xml)
```xml
<destination>
  <id>taj-mahal</id>
  <name>Taj Mahal</name>
  <category>Heritage</category>
  <city>Agra</city>
  <state>Uttar Pradesh</state>
  <description>UNESCO World Heritage Site...</description>
  <image>/images/tajmahal.jpeg</image>
  <coordinates>
    <latitude>27.1751</latitude>
    <longitude>78.0421</longitude>
  </coordinates>
  <rating>4.8</rating>
  <bestTimeToVisit>October to March</bestTimeToVisit>
</destination>
```

### RDF Format (destinations.rdf)
```turtle
@prefix tour: <http://example.org/tourism#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

tour:taj-mahal tour:isNearby tour:agra-fort .
tour:taj-mahal tour:similarTo tour:jaipur-city-palace .
tour:taj-mahal tour:belongsToCategory "Heritage" .
```

## 👥 Team

### Developers
- **Mr. Raghuram S** - Lead Developer & Project Architect
- **Ms. Sweta Singh** - Frontend Developer & UI/UX Designer
- **Ms. Vanshika** - Backend Developer & Data Engineer

### Academic Context
- **Course**: Semantic Web Technologies (SEM-7)
- **Year**: 2025

## 🎨 Design Features

### Animations
- **Hero Section**: Fade-in-up animations with staggered delays
- **Destination Cards**: Hover zoom effects and gradient overlays
- **Loading States**: Shimmer skeleton loaders
- **Interactive Elements**: Scale transforms and smooth transitions

### Color Palette
- **Primary**: Blue gradient (#3B82F6 to #8B5CF6)
- **Secondary**: Purple (#8B5CF6)
- **Accent**: Yellow (#FBBF24)
- **Background**: Soft gradients (Blue-50 to Purple-50)

## 🔧 Configuration

### Next.js Config (next.config.js)
```javascript
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
}
```

### Tailwind Config (tailwind.config.js)
Custom primary colors configured for consistent theming.

## 📊 Features in Detail

### 1. Semantic Search
Uses RDF relationships to find destinations based on:
- Location proximity (`tour:isNearby`)
- Similar characteristics (`tour:similarTo`)
- Category matching (`tour:belongsToCategory`)
- City/State connections (`tour:isInCity`, `tour:isInState`)

### 2. Authentication
- Email/Password authentication via Supabase
- Secure session management
- Row Level Security (RLS) for database

### 3. Image Optimization
- Next.js Image component for automatic optimization
- Lazy loading for performance
- Responsive image sizing

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

## 🐛 Troubleshooting

### Module not found errors (fs/path)
- Ensure server-side only imports use `typeof window === 'undefined'` checks
- XML/RDF parsing is only done on the server side

### Image loading issues
- Check image paths in `public/images/`
- Verify `next.config.js` image domains
- Ensure images are optimized (< 2MB recommended)

### Supabase connection errors
- Verify `.env.local` credentials
- Check Supabase project is active
- Ensure RLS policies are properly configured

## 📝 License

This project is created for educational purposes as part of the Semantic Web Technologies course.

## 🤝 Contributing

This is an academic project. For suggestions or improvements, please contact the development team.

## 📧 Contact

For queries or support:
- **Lead Developer**: Raghuram S
- **GitHub**: [rs0657](https://github.com/rs0657)
- **Project Repository**: [Smart-Tourist-Guide](https://github.com/rs0657/Smart-Tourist-Guide)

---

**Built with ❤️ using Next.js, Semantic Web Technologies, and Modern Design Principles**

*© 2025 Smart Tourism Guide Team*
