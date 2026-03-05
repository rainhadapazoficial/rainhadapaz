import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
async function check() {
    console.log("Checking 'post_categories_rel' table...");

    // Check if table exists by trying a count
    const { count, error } = await supabase
        .from('post_categories_rel')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error("Error (Table likely missing):", error.message);
    } else {
        console.log("Table 'post_categories_rel' EXISTS. Count:", count);
    }
}
check();
