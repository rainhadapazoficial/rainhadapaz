import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

const POSTS_DIR = path.join(process.cwd(), 'wp-json', 'wp', 'v2', 'posts');

async function importPosts() {
    console.log("🚀 Iniciando importação de posts do WordPress...");

    if (!fs.existsSync(POSTS_DIR)) {
        console.error("❌ Direitório de posts não encontrado:", POSTS_DIR);
        return;
    }

    const files = fs.readdirSync(POSTS_DIR);
    console.log(`📂 Encontrados ${files.length} arquivos de post.`);

    for (const filename of files) {
        const filePath = path.join(POSTS_DIR, filename);
        if (fs.statSync(filePath).isDirectory()) continue;

        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const post = JSON.parse(content);

            const title = post.title?.rendered || 'Sem título';
            const slug = post.slug || '';
            const wpContent = post.content?.rendered || '';
            const excerpt = post.excerpt?.rendered || '';
            const date = post.date ? new Date(post.date).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR');

            // Deixa a imagem como placeholder por enquanto
            const image_url = 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000';

            const dataToInsert = {
                title,
                content: wpContent,
                excerpt: excerpt.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...',
                slug,
                date,
                image_url,
                category: 'Notícias',
                author: 'Diocese de Sinop'
            };

            console.log(`📝 Importando: ${title} (${slug})`);

            // Usamos upsert baseado no slug para não duplicar se rodar de novo
            const { error } = await supabase
                .from('posts')
                .upsert(dataToInsert, { onConflict: 'slug' });

            if (error) {
                console.error(`❌ Erro ao importar ${slug}:`, error.message);
            } else {
                console.log(`✅ ${slug} importado com sucesso!`);
            }

        } catch (err: any) {
            console.error(`💥 Erro ao processar arquivo ${filename}:`, err.message);
        }
    }

    console.log("✨ Processo de importação concluído!");
}

importPosts();
