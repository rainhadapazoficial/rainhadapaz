
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Interface para os dados históricos
 */
interface HistoryItem {
    groupName: string;
    historico: {
        nome: string;
        gestao: string;
    }[];
}

/**
 * LISTA DE HISTÓRICO PARA CADASTRAR
 * Adicione aqui os dados conforme desejar.
 */
const historyData: HistoryItem[] = [
    {
        groupName: "Rainha da Paz",
        historico: [
            { nome: "Gelson Pandolfo", gestao: "2024 - Atual" },
            { nome: "Coordenador Anterior 1", gestao: "2022 - 2024" },
            { nome: "Coordenador Anterior 2", gestao: "2020 - 2022" }
        ]
    },
    // Você pode adicionar mais grupos aqui seguindo o mesmo padrão:
    /*
    {
        groupName: "Nome Exato do Grupo",
        historico: [
            { nome: "Nome", gestao: "Anos" },
        ]
    }
    */
];

async function seedHistory() {
    console.log("🌱 Iniciando sementeira de histórico de coordenadores...");

    for (const item of historyData) {
        // 1. Buscar o ID do grupo pelo nome
        const { data: group, error: fetchError } = await supabase
            .from('groups')
            .select('id')
            .eq('nome', item.groupName)
            .single();

        if (fetchError || !group) {
            console.error(`❌ Grupo não encontrado: "${item.groupName}". Pulando...`);
            continue;
        }

        console.log(`📝 Processando histórico para: ${item.groupName} (ID: ${group.id})`);

        // 2. Limpar histórico antigo desse grupo para evitar duplicatas (opcional)
        await supabase.from('group_coordinator_history').delete().eq('group_id', group.id);

        // 3. Inserir novo histórico
        const historyToInsert = item.historico.map((h, index) => ({
            group_id: group.id,
            nome: h.nome,
            gestao: h.gestao,
            ordem: index // Define a ordem de exibição
        }));

        const { error: insertError } = await supabase
            .from('group_coordinator_history')
            .insert(historyToInsert);

        if (insertError) {
            console.error(`❌ Erro ao inserir histórico para ${item.groupName}:`, insertError);
        } else {
            console.log(`✅ Sucesso! ${historyToInsert.length} gestões adicionadas para ${item.groupName}.`);
        }
    }

    console.log("\n✨ Processo concluído!");
}

seedHistory();
