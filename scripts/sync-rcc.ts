import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // Requires Service Role for writing

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Faltam credenciais do Supabase (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const FEED_URL = 'https://rccbrasil.org.br/feed/';

async function syncRCCNews() {
    console.log('🔄 Iniciando sincronização com RCC Brasil...');
    let entriesSynced = 0;

    try {
        const response = await fetch(FEED_URL);
        const xml = await response.text();

        // Simple RSS Item Parsing (Regex based for zero-dependency)
        const items = xml.split('<item>').slice(1).map(item => {
            const title = item.match(/<title>(.*?)<\/title>/)?.[1] || '';
            const link = item.match(/<link>(.*?)<\/link>/)?.[1] || '';
            const contentEncoded = item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/)?.[1] || '';
            const description = item.match(/<description>([\s\S]*?)<\/description>/)?.[1] || '';
            const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';

            // Try to find image in enclosure or content
            let image_url = 'https://rccbrasil.org.br/wp-content/uploads/2021/04/logo-rcc-brasil.png';

            // 1. Check for enclosure
            const enclosure = item.match(/<enclosure[^>]*url=["'](.*?)["']/i)?.[1];
            if (enclosure) {
                image_url = enclosure;
            } else {
                // 2. Try to find media:content
                const mediaContent = item.match(/<media:content[^>]*url=["'](.*?)["']/i)?.[1];
                if (mediaContent) {
                    image_url = mediaContent;
                } else {
                    // 3. Try to find first image in content/description
                    const imgMatch = (contentEncoded + description).match(/<img[^>]*src=["'](https?:\/\/[^"'>]+\.(?:jpg|jpeg|png|webp))["']/i);
                    if (imgMatch) {
                        image_url = imgMatch[1];
                    }
                }
            }

            // Extract slug from link
            const slug = link.replace(/\/$/, '').split('/').pop() || '';

            return {
                title: decodeHTML(title),
                content: decodeHTML(contentEncoded || description),
                excerpt: stripHTML(decodeHTML(description)).slice(0, 160) + '...',
                slug,
                category: 'RCC Brasil',
                author: 'Portal RCC Brasil',
                date: new Date(pubDate).toLocaleDateString('pt-BR'),
                image_url
            };
        });

        console.log(`📡 Encontradas ${items.length} notícias no feed.`);

        for (const post of items) {
            // Check if post already exists
            const { data: existingPost } = await supabase
                .from('posts')
                .select('id')
                .eq('slug', post.slug)
                .single();

            if (!existingPost) {
                const { error: insertError } = await supabase
                    .from('posts')
                    .insert([post]);

                if (insertError) {
                    console.error(`❌ Erro ao inserir post "${post.title}":`, insertError.message);
                } else {
                    console.log(`✅ Nova notícia importada: ${post.title}`);
                    entriesSynced++;
                }
            }
        }

        // Log success
        await supabase.from('sync_logs').insert([{
            status: 'success',
            entries_synced: entriesSynced,
            message: `Sincronização concluída. ${entriesSynced} novas notícias importadas.`
        }]);

        console.log(`✨ Sincronização finalizada! ${entriesSynced} novos posts adicionados.`);

    } catch (error: any) {
        console.error('💥 Erro crítico na sincronização:', error.message);

        // Log error
        await supabase.from('sync_logs').insert([{
            status: 'error',
            message: `Erro na sincronização: ${error.message}`
        }]);
    }
}

function decodeHTML(str: string) {
    return str
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

function stripHTML(str: string) {
    return str.replace(/<[^>]*>?/gm, '');
}

syncRCCNews();
