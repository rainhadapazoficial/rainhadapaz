
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Interface para os dados históricos de ministérios
 */
interface MinistryHistoryItem {
    ministryName: string;
    historico: {
        nome: string;
        gestao: string;
    }[];
}

/**
 * LISTA DE HISTÓRICO PARA CADASTRAR (MINISTÉRIOS)
 */
const historyData: MinistryHistoryItem[] = [
    {
        ministryName: "Ministério de Pregação",
        historico: [
            { nome: "Nome do Coordenador Atual", gestao: "2025 - Atual" },
            { nome: "Coordenador Anterior", gestao: "2023 - 2025" }
        ]
    },
    // Adicione mais ministérios conforme necessário
];

async function seedMinistryHistory() {
    console.log("🌱 Iniciando sementeira de histórico de coordenadores (Ministérios)...");

    for (const item of historyData) {
        // 1. Buscar o ID do ministério pelo nome
        const { data: ministry, error: fetchError } = await supabase
            .from('ministerios')
            .select('id')
            .eq('nome', item.ministryName)
            .single();

        if (fetchError || !ministry) {
            console.error(`❌ Ministério não encontrado: "${item.ministryName}". Pulando...`);
            continue;
        }

        console.log(`📝 Processando histórico para: ${item.ministryName} (ID: ${ministry.id})`);

        // 2. Limpar histórico antigo
        await supabase.from('ministerio_coordinator_history').delete().eq('ministerio_id', ministry.id);

        // 3. Inserir novo histórico
        const historyToInsert = item.historico.map((h, index) => ({
            ministerio_id: ministry.id,
            nome: h.nome,
            gestao: h.gestao,
            ordem: index
        }));

        const { error: insertError } = await supabase
            .from('ministerio_coordinator_history')
            .insert(historyToInsert);

        if (insertError) {
            console.error(`❌ Erro ao inserir histórico para ${item.ministryName}:`, insertError);
        } else {
            console.log(`✅ Sucesso! ${historyToInsert.length} gestões adicionadas para ${item.ministryName}.`);
        }
    }

    console.log("\n✨ Processo concluído!");
}

seedMinistryHistory();
