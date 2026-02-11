const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qbwbipsjbqdqjhakiaji.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFid2JpcHNqYnFkcWpoYWtpYWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MjIyMjksImV4cCI6MjA4NjI5ODIyOX0.8Q2spsp-itx2zgdyXDJ9PHrQDgGQbkVEwUuHRgsACE4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
    console.log("--- Checking Home Page Data (Standalone JS) ---");

    try {
        const posts = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(3);
        console.log(`Posts: ${posts.data?.length || 0} found. Error: ${posts.error?.message || 'None'}`);

        const groups = await supabase
            .from('groups')
            .select('id, nome, cidade, dia, local, slug')
            .order('created_at', { ascending: false })
            .limit(3);
        console.log(`Groups: ${groups.data?.length || 0} found. Error: ${groups.error?.message || 'None'}`);

        const ministries = await supabase
            .from('ministerios')
            .select('id, nome, descricao, coordenador, cor')
            .order('ordem', { ascending: true })
            .limit(3);
        console.log(`Ministries: ${ministries.data?.length || 0} found. Error: ${ministries.error?.message || 'None'}`);

        if (ministries.data) {
            console.log("Ministries sample names:", ministries.data.map(m => m.nome).join(", "));
        }
        if (groups.data) {
            console.log("Groups sample names:", groups.data.map(g => g.nome).join(", "));
        }
    } catch (e) {
        console.error("FATAL ERROR:", e);
    }
}

checkData();
