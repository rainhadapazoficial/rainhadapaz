const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
    const { data, error } = await supabase.from('posts').select('id, title, date, created_at').order('created_at', { ascending: false }).limit(20);
    if (error) {
        console.error("ERRO:", error.message);
    } else {
        console.log("POSTS (Recent by created_at):");
        data.forEach(p => console.log(`- [ID: ${p.id}] [Date: ${p.date}] [Created: ${p.created_at}] ${p.title}`));
    }
}
check();
