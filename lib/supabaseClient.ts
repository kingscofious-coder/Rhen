import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// During build time, env vars might not be available, so create a mock client to prevent crashes
const isBuildTime = !supabaseUrl || !supabaseAnonKey

// Create a mock client that doesn't actually connect to Supabase during build time
const createMockClient = (): SupabaseClient => ({
  auth: {
    signUp: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Build time' } }),
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Build time' } }),
    signOut: () => Promise.resolve({ error: { message: 'Build time' } }),
    getSession: () => Promise.resolve({ data: { session: null }, error: { message: 'Build time' } }),
    getUser: () => Promise.resolve({ data: { user: null }, error: { message: 'Build time' } }),
    resetPasswordForEmail: () => Promise.resolve({ data: null, error: { message: 'Build time' } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    updateUser: () => Promise.resolve({ data: { user: null }, error: { message: 'Build time' } }),
    setSession: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Build time' } }),
    refreshSession: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Build time' } }),
    resend: () => Promise.resolve({ data: null, error: { message: 'Build time' } }),
  },
  rpc: () => Promise.resolve({ data: null, error: { message: 'Build time' } }),
  from: () => ({
    select: () => ({
      data: [],
      error: { message: 'Build time' },
      in: () => Promise.resolve({ data: [], error: { message: 'Build time' } }),
      eq: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: { message: 'Build time' } })
        }),
        single: () => Promise.resolve({ data: null, error: { message: 'Build time' } }),
        order: () => ({
          ascending: () => Promise.resolve({ data: [], error: { message: 'Build time' } })
        }),
        maybeSingle: () => Promise.resolve({ data: null, error: { message: 'Build time' } })
      }),
      order: () => ({
        ascending: () => Promise.resolve({ data: [], error: { message: 'Build time' } })
      }),
      upsert: () => Promise.resolve({ data: null, error: { message: 'Build time' } }),
      range: () => ({
        range: () => Promise.resolve({ data: [], error: { message: 'Build time' } })
      })
    }),
    insert: () => ({
      select: () => ({
        single: () => Promise.resolve({ data: null, error: { message: 'Build time' } })
      })
    }),
    update: () => ({
      eq: () => Promise.resolve({ error: { message: 'Build time' } })
    }),
    upsert: () => Promise.resolve({ data: null, error: { message: 'Build time' } }),
    delete: () => ({
      eq: () => Promise.resolve({ error: { message: 'Build time' } })
    }),
    rpc: () => Promise.resolve({ data: null, error: { message: 'Build time' } })
  }),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ error: { message: 'Build time' } }),
      getPublicUrl: () => ({ data: { publicUrl: '' } })
    })
  },
  channel: () => ({
    on: (type: any, filter: any, callback: any) => ({
      subscribe: () => {}
    }),
    subscribe: () => {}
  }),
  removeChannel: () => {},
  realtime: {
    subscribe: () => ({
      unsubscribe: () => {}
    })
  }
} as any)

export const supabase = isBuildTime
  ? createMockClient()
  : createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })

// Export mock functions for build time
export const signUp = isBuildTime
  ? () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Build time' } })
  : async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) console.error('Supabase SignUp Error:', error.message)
      return { data, error }
    }

export const signIn = isBuildTime
  ? () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Build time' } })
  : async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) console.error('Supabase SignIn Error:', error.message)
      return { data, error }
    }

export const signOut = isBuildTime
  ? () => Promise.resolve({ error: { message: 'Build time' } })
  : async () => {
      const { error } = await supabase.auth.signOut()
      return { error }
    }

export const getSession = isBuildTime
  ? () => Promise.resolve({ data: { session: null }, error: { message: 'Build time' } })
  : async () => {
      const { data, error } = await supabase.auth.getSession()
      return { data, error }
    }

export const getUser = isBuildTime
  ? () => Promise.resolve({ data: { user: null }, error: { message: 'Build time' } })
  : async () => {
      const { data, error } = await supabase.auth.getUser()
      return { data, error }
    }

export const resetPassword = isBuildTime
  ? () => Promise.resolve({ data: null, error: { message: 'Build time' } })
  : async (email: string) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
      })
      if (error) console.error('Supabase Reset Password Error:', error.message)
      return { data, error }
    }
