const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testDelete() {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    console.log("1. Creating dummy event...");
    const { data: insertData, error: insertError } = await supabase
        .from('events')
        .insert([{
            title: 'TEST_DELETE_ME',
            date: '2025-01-01',
            time: '00:00',
            location: 'Test',
            description: 'To be deleted',
            category: 'Test'
        }])
        .select()
        .single();

    if (insertError) {
        console.error("❌ Insert failed:", JSON.stringify(insertError));
        return;
    }

    console.log("✅ Created event ID:", insertData.id);

    console.log("2. Attempting to DELETE...");
    const { error: deleteError } = await supabase
        .from('events')
        .delete()
        .eq('id', insertData.id);

    if (deleteError) {
        console.error("❌ Delete failed:", JSON.stringify(deleteError));
    } else {
        console.log("✅ Delete success! Database permissions are working.");
    }
}

testDelete();
