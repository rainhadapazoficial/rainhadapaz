import { createClient } from '@supabase/supabase-js';

// Se as chaves estiverem faltando (ex: durante o build no Vercel antes de configurar envs), 
// usamos valores dummy para evitar erro fatal de inicialização.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
