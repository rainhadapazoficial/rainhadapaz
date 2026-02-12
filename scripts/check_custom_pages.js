const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function setup() {
    console.log("🚀 Criando tabela custom_pages via RPC ou informando erro se não houver permissão...");

    // Como não podemos rodar SQL arbitrário diretamente via JS client sem uma função RPC específica,
    // vamos tentar inserir um registro. Se a tabela não existir, o erro nos dirá.
    // Idealmente o usuário roda o arquivo .sql no console do Supabase.

    console.log("⚠️ Por favor, execute o conteúdo de 'supabase_custom_pages.sql' no SQL Editor do seu painel Supabase.");
    console.log("Vou tentar verificar se a tabela já existe...");

    const { error } = await supabase.from('custom_pages').select('count', { count: 'exact', head: true });

    if (error && error.code === '42P01') {
        console.error("❌ Tabela 'custom_pages' não existe. Por favor, execute o SQL fornecido.");
    } else if (error) {
        console.error("❌ Erro ao verificar tabela:", error.message);
    } else {
        console.log("✅ Tabela 'custom_pages' já existe ou foi criada!");
    }
}

setup();
