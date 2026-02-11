
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

const ministerios = [
    {
        nome: "Ministério de Pregação",
        descricao: "A voz que anuncia a Boa Nova, proclamando o Evangelho com unção e poder para tocar corações e transformar vidas.",
        cor: "bg-blue-100 text-blue-600",
        ordem: 1
    },
    {
        nome: "Oração por Cura e Libertação",
        description: "Ministério que, pela fé, intercede e proclama a cura e a libertação que vêm de Jesus Cristo para as feridas da alma e do corpo.",
        cor: "bg-red-100 text-red-600",
        ordem: 2
    },
    {
        nome: "Ministério para Crianças e Adolescentes",
        descricao: "Semeando a Palavra de Deus nos corações dos mais novos, guiando-os em seus primeiros passos na fé com alegria e criatividade.",
        cor: "bg-yellow-100 text-yellow-600",
        ordem: 3
    },
    {
        nome: "Ministério Jovem",
        descricao: "A juventude em chamas pelo Espírito Santo! Formando jovens líderes e evangelizadores, ativos na Igreja e no mundo.",
        cor: "bg-orange-100 text-orange-600",
        ordem: 4
    },
    {
        nome: "Ministério para as Famílias",
        descricao: "Levando a experiência do amor de Deus ao coração dos lares, fortalecendo as famílias como igrejas domésticas.",
        cor: "bg-green-100 text-green-600",
        ordem: 5
    },
    {
        nome: "Ministério de Intercessão",
        descricao: "Sustentando a missão da RCC e da Igreja pela oração contínua, em um clamor silencioso e poderoso pelas necessidades de todos.",
        cor: "bg-purple-100 text-purple-600",
        ordem: 6
    },
    {
        nome: "Ministério de Formação",
        descricao: "Aprofundando a fé e o conhecimento da doutrina católica e dos carismas, capacitando líderes e servos para a missão.",
        cor: "bg-indigo-100 text-indigo-600",
        ordem: 7
    },
    {
        nome: "Ministério de Música e Artes",
        descricao: "Louvor que eleva a alma e artes que evangelizam. A serviço da liturgia e da evangelização através do canto, da dança e do teatro.",
        cor: "bg-pink-100 text-pink-600",
        ordem: 8
    },
    {
        nome: "Ministério de Comunicação Social",
        descricao: "Anunciando a Palavra de Deus em todos os meios. Responsável por levar a mensagem da RCC além das fronteiras físicas.",
        cor: "bg-cyan-100 text-cyan-600",
        ordem: 9
    },
    {
        nome: "Ministério de Fé e Política",
        descricao: "Formando cristãos conscientes de seu papel na sociedade, para que atuem nos meios políticos à luz do Evangelho.",
        cor: "bg-slate-100 text-slate-600",
        ordem: 10
    },
    {
        nome: "Ministério de Promoção Humana",
        descricao: "O amor em ação, servindo aos mais necessitados e promovendo a dignidade humana através de obras de misericórdia.",
        cor: "bg-emerald-100 text-emerald-600",
        ordem: 11
    },
    {
        nome: "Ministério Universidades Renovadas",
        descricao: "Levando a cultura de Pentecostes para o ambiente acadêmico, evangelizando estudantes e profissionais.",
        cor: "bg-violet-100 text-violet-600",
        ordem: 12
    }
].map(m => ({
    nome: m.nome,
    descricao: (m as any).description || m.descricao,
    cor: m.cor,
    ordem: m.ordem
}));

async function seed() {
    console.log("🌱 Semeando ministérios no banco de dados...");

    // Limpar se necessário (opcional - cuidado se o usuário já tiver dados novos)
    // const { error: deleteError } = await supabase.from('ministerios').delete().neq('id', 0);

    const { data, error } = await supabase.from('ministerios').insert(ministerios).select();

    if (error) {
        console.error("❌ Erro ao semear ministérios:", error);
    } else {
        console.log(`✅ Sucesso! ${data.length} ministérios restaurados.`);
    }
}

seed();
