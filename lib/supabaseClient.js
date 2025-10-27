import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Authentication features will not work.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Helper functions for authentication
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Helper functions for favorites
export const addToFavorites = async (userId, destinationId) => {
  const { data, error } = await supabase
    .from('favorites')
    .insert([{ user_id: userId, destination_id: destinationId }])
  return { data, error }
}

export const removeFromFavorites = async (userId, destinationId) => {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('destination_id', destinationId)
  return { error }
}

export const getFavorites = async (userId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
  return { data, error }
}
