import { supabase } from "../src/lib/supabase";

async function checkData() {
    console.log("--- Checking Home Page Data ---");

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
        console.log("Ministries details:", JSON.stringify(ministries.data, null, 2));
    }
}

checkData();
