import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gkqyyshkgxhugapcxspv.supabase.co'
const supabaseAnonKey = 'sb_publishable_edO_0qfGWqREo1fcEH1ZIQ_4lM5m__h'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
