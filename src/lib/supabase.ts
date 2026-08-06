import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let _supabaseClient: SupabaseClient | null = null
let _supabaseAdminClient: SupabaseClient | null = null

function getClient(key: string, value: string, admin = false): SupabaseClient {
  if (admin) {
    if (!_supabaseAdminClient) {
      _supabaseAdminClient = createClient(key, value)
    }
    return _supabaseAdminClient
  }
  if (!_supabaseClient) {
    _supabaseClient = createClient(key, value)
  }
  return _supabaseClient
}

function createLazyProxy(getter: () => SupabaseClient | null): SupabaseClient {
  return new Proxy({} as SupabaseClient, {
    get(_, prop) {
      const client = getter()
      if (!client) {
        throw new Error("Supabase not configured. Add env vars to .env.local")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const val = (client as any)[prop]
      if (typeof val === "function") {
        return val.bind(client)
      }
      return val
    },
  })
}

export const supabase = createLazyProxy(() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return getClient(url, key)
})

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export const supabaseAdmin = createLazyProxy(() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return getClient(url, key, true)
})