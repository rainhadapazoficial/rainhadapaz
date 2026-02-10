
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

const events = [
    // Seminário de Vida
    { title: "Início do Seminário de Vida - Diocese de Sinop", date: "2026-03-07", time: "19:30", category: "Seminário", description: "Início da nossa caminhada de 8 semanas de Seminário de Vida no Espírito Santo na Diocese de Sinop." },
    { title: "Encerramento do Seminário de Vida - Diocese de Sinop", date: "2026-04-25", time: "19:30", category: "Seminário", description: "Grande encerramento do Seminário de Vida no Espírito Santo." },

    // Experiência de Oração
    { title: "Experiência de Oração - Diocese de Sinop (Dia 1)", date: "2026-05-09", time: "13:30", category: "Retiro", description: "Um final de semana de profunda imersão e oração." },
    { title: "Experiência de Oração - Diocese de Sinop (Dia 2)", date: "2026-05-10", time: "07:30", category: "Retiro", description: "Continuação da nossa Experiência de Oração." },

    // Formação - Apostilas
    { title: "Formação Básica: Apostila 1 (Sáb)", date: "2026-06-13", time: "13:30", category: "Formação", description: "Módulo Básico de Formação da RCC." },
    { title: "Formação Básica: Apostila 1 (Dom)", date: "2026-06-14", time: "07:30", category: "Formação", description: "Módulo Básico de Formação da RCC." },

    { title: "Formação Básica: Apostila 2 (Sáb)", date: "2026-06-27", time: "13:30", category: "Formação", description: "Continuação dos estudos do Módulo Básico." },
    { title: "Formação Básica: Apostila 2 (Dom)", date: "2026-06-28", time: "07:30", category: "Formação", description: "Continuação dos estudos do Módulo Básico." },

    { title: "Formação Básica: Apostila 3 (Sáb)", date: "2026-07-11", time: "13:30", category: "Formação", description: "Aprofundamento na doutrina e identidade da RCC." },
    { title: "Formação Básica: Apostila 3 (Dom)", date: "2026-07-12", time: "07:30", category: "Formação", description: "Aprofundamento na doutrina e identidade da RCC." },

    { title: "Formação Básica: Apostila 4 (Sáb)", date: "2026-08-01", time: "13:30", category: "Formação", description: "Formação para servos e ministérios." },
    { title: "Formação Básica: Apostila 4 (Dom)", date: "2026-08-02", time: "07:30", category: "Formação", description: "Formação para servos e ministérios." },

    { title: "Formação Básica: Apostila 5 (Sáb)", date: "2026-09-19", time: "13:30", category: "Formação", description: "Estudos bíblicos e carismas." },
    { title: "Formação Básica: Apostila 5 (Dom)", date: "2026-09-20", time: "07:30", category: "Formação", description: "Estudos bíblicos e carismas." },

    { title: "Formação Básica: Apostila 6 (Sáb)", date: "2026-10-24", time: "13:30", category: "Formação", description: "Liderança e serviço na Igreja." },
    { title: "Formação Básica: Apostila 6 (Dom)", date: "2026-10-25", time: "07:30", category: "Formação", description: "Liderança e serviço na Igreja." },

    { title: "Formação Básica: Apostila 7 (Sáb)", date: "2026-11-07", time: "13:30", category: "Formação", description: "Vida comunitária e missão." },
    { title: "Formação Básica: Apostila 7 (Dom)", date: "2026-11-08", time: "07:30", category: "Formação", description: "Vida comunitária e missão." },

    { title: "Formação Básica: Apostila 8 (Sáb)", date: "2026-12-05", time: "13:30", category: "Formação", description: "Encerramento do Módulo Básico." },
    { title: "Formação Básica: Apostila 8 (Dom)", date: "2026-12-06", time: "07:30", category: "Formação", description: "Encerramento do Módulo Básico." },

    // Recesso
    { title: "Início do Recesso 2026", date: "2026-12-16", time: "19:30", category: "Aviso", description: "Encerramento das atividades anuais do Grupo de Oração." }
];

const LOCATION_DEFAULT = "Matriz da Paróquia Santo Antônio";

async function seed() {
    console.log("🌱 Iniciando cadastro de eventos 2026...");

    // Opcional: Limpar eventos antigos? O usuário disse "somente aos eventos... a partir de 07/03"
    // Vou assumir que ele quer adicionar estes. Se ele quiser limpar, posso deletar tudo antes.
    // "Sem ruído, só o que interessa" sugere que o resto deve sair?
    // Vou deletar eventos futuros de 2026 para evitar duplicatas, mas manter histórico antigo?
    // Melhor apenas inserir.

    const eventsWithLocation = events.map(e => ({
        ...e,
        location: LOCATION_DEFAULT,
        image_url: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000" // Default image
    }));

    const { data, error } = await supabase.from('events').insert(eventsWithLocation).select();

    if (error) {
        console.error("❌ Erro ao inserir eventos:", error);
    } else {
        console.log(`✅ Sucesso! ${data.length} eventos adicionados.`);
    }
}

seed();
