const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL or Key missing in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log("🌱 Iniciando a semeadura de dados...");

    // 1. Seed Blog Post
    const { error: postError } = await supabase.from('posts').insert([
        {
            title: "O Despertar da Fé no Cotidiano",
            excerpt: "Descubra como pequenas práticas de oração podem transformar sua rotina e fortalecer sua conexão com Deus.",
            content: "A vida moderna é agitada, mas a oração não precisa ser um fardo. Reservar 5 minutos pela manhã para agradecer e pedir a intercessão de Maria pode mudar todo o seu dia. Neste post, exploramos dicas práticas para manter a chama do Espírito acesa.",
            category: "Espiritualidade",
            author: "Coordenação",
            image_url: "https://images.unsplash.com/photo-1499209974431-9dac3adaf471?q=80&w=1200",
            slug: "despertar-da-fe-no-cotidiano",
            date: new Date().toLocaleDateString('pt-BR')
        }
    ]);
    if (postError) console.error("Erro ao inserir post:", postError.message);
    else console.log("✅ Post de blog inserido.");

    // 2. Seed Event
    const { error: eventError } = await supabase.from('events').insert([
        {
            title: "Grande Noite de Louvor e Adoração",
            description: "Um momento especial de intercessão e clamor ao Espírito Santo. Teremos pregação, música e adoração ao Santíssimo Sacramento.",
            date: "2024-12-15",
            time: "19:30",
            location: "Matriz da Paróquia Santo Antônio",
            category: "Oração",
            image_url: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=1200"
        }
    ]);
    if (eventError) console.error("Erro ao inserir evento:", eventError.message);
    else console.log("✅ Evento inserido.");

    // 3. Seed Podcast
    const { error: podcastError } = await supabase.from('podcasts').insert([
        {
            title: "Episódio #001 - Maria, Nossa Mãe e Rainha",
            description: "Neste episódio de estreia, mergulhamos no papel de Maria na Renovação Carismática Católica e como seu 'Sim' ressoa até hoje.",
            spotify_url: "https://open.spotify.com/embed/episode/7799u9Ynm9pXn9Yn9pXn9Y",
            youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            category: "Formação"
        }
    ]);
    if (podcastError) console.error("Erro ao inserir podcast:", podcastError.message);
    else console.log("✅ Podcast inserido.");

    console.log("✨ Semeadura concluída!");
}

seed();
