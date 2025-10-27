// This file serves as a reference for Supabase authentication
// Authentication is handled directly in components using lib/supabaseClient.js

export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Authentication is handled via Supabase client',
    note: 'Use the supabase client in lib/supabaseClient.js for auth operations'
  })
}
