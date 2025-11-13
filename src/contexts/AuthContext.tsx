import { createContext, useContext, useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { migrateLocalData } from '../utils'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, displayName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName }
      }
    })

    if (!error && data.user) {
      // Create user profile
      await supabase.from('user_profiles').insert({
        id: data.user.id,
        display_name: displayName
      })

      // Initialize user stats
      await supabase.from('user_stats').insert({
        user_id: data.user.id
      })
    }

    return { error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) return { error }

    // Migrate local data after successful login
    if (data.user) {
      try {
        await migrateLocalData(data.user.id)
        console.log('Migration completed for user:', data.user.id)
      } catch (migrationError) {
        console.error('Migration failed:', migrationError)
      }
    }

    return { error: null }
  }

  const signOut = async () => {
    try {
      setUser(null)
      setSession(null)

      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('Logout error:', error)
      }

      window.location.href = '/login'
    } catch (error) {
      console.error('Failed to sign out:', error)
      window.location.href = '/login'
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}