import { createClient } from '@supabase/supabase-js'

let supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL
let supabase_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const getSupabase = (access_token) => {
  const supabase = createClient(
    supabase_url,
    supabase_key
  )

  supabase.auth.session = () => ({
    access_token,
    token_type: "",
    user: null
  })

  return supabase
}

export { getSupabase }