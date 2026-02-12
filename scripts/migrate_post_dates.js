const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
    console.log("🚀 Iniciando migração de datas dos posts...");

    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, title, date');

    if (error) {
        console.error("❌ Erro ao buscar posts:", error.message);
        return;
    }

    console.log(`📂 Encontrados ${posts.length} posts para processar.`);

    for (const post of posts) {
        if (!post.date || !post.date.includes('/')) {
            console.log(`- Ignoring post ${post.id} (${post.title}): Invalid or already migrated date: ${post.date}`);
            continue;
        }

        const [day, month, year] = post.date.split('/');
        if (day && month && year) {
            const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            console.log(`📝 Migrando post ${post.id}: ${post.date} -> ${isoDate}`);

            const { error: updateError } = await supabase
                .from('posts')
                .update({ date: isoDate })
                .eq('id', post.id);

            if (updateError) {
                console.error(`❌ Erro ao atualizar post ${post.id}:`, updateError.message);
            }
        } else {
            console.log(`- Skipping post ${post.id}: Could not parse date ${post.date}`);
        }
    }

    console.log("✨ Migração concluída!");
}

migrate();
