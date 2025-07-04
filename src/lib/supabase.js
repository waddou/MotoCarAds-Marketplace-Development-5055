import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://kkfcivjyksayqgakylow.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrZmNpdmp5a3NheXFnYWt5bG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNTU2NTksImV4cCI6MjA2NTczMTY1OX0.aGpku2ioWSjM_zci5pTOVN-HtDkl0OwOULPOPYE22fI'

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

export default supabase