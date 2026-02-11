import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
async function check() {
    const { data, error } = await supabase.from('posts').select('id, title, slug');
    if (error) {
        console.error("ERRO:", error.message);
    } else {
        console.log("QUANTIDADE:", data?.length);
        data?.forEach(p => console.log(`- ${p.title} (${p.slug})`));
    }
}
check();
