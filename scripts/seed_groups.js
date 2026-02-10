
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

const groups = [
    { nome: "Sagrado Coração de Jesus", dia: "Segunda, às 19:30", local: "Catedral Sagrado Coração de Jesus", cidade: "Sinop" },
    { nome: "Nossa Senhora das Graças", dia: "Segunda, às 19:00", local: "Capela Nossa Senhora de Fátima", cidade: "Sinop" },
    { nome: "Rainha da Paz", dia: "Quarta-feira, às 19:30", local: "Paróquia Santo Antônio", cidade: "Sinop", coordenador: "Gelson Pandolfo", whatsapp: "https://wa.me/556681365456" },
    { nome: "São Cristóvão", dia: "Quarta, às 19:30", local: "Paróquia São Cristóvão", cidade: "Sinop" },
    { nome: "Nossa Senhora Aparecida", dia: "Quinta, às 19:30", local: "Comunidade N. Sra. Aparecida", cidade: "Sinop" },
    { nome: "Santa Clara", dia: "Quinta, às 19:30", local: "Paróquia Todos os Santos", cidade: "Sinop" },
    { nome: "Cristo Rei", dia: "Quinta, às 19:30", local: "Paróquia São Camilo", cidade: "Sinop" },
    { nome: "São Miguel Arcanjo", dia: "Terça, às 19:30", local: "Comunidade Divino Pai Eterno", cidade: "Cláudia" },
    { nome: "Divina Luz", dia: "Terça, às 19:00", local: "Paróquia Cristo Rei", cidade: "União do Sul" },
    { nome: "Imaculado Coração de Maria", dia: "Terça, às 19:30", local: "Salão da Comunidade", cidade: "Gleba Mercedes (BR-080)" },
    { nome: "Chama de Amor", dia: "Terça, às 19:30", local: "Paróquia Sagrado Coração de Jesus", cidade: "Vera" },
    { nome: "Anjos da Luz", dia: "Quarta, às 19:30", local: "Comunidade N. Sra. do Perpétuo Socorro", cidade: "Vera" },
    { nome: "Caminhando com Cristo", dia: "Quinta, às 19:30", local: "Salão Paroquial", cidade: "Feliz Natal" },
    { nome: "São Rafael", dia: "Terça, às 19:00", local: "Salão Paroquial", cidade: "Santa Carmem" },
    { nome: "Bom Pastor", dia: "Segunda, às 19:00", local: "Paróquia N. Sra. da Consolata", cidade: "Sorriso" },
    { nome: "Anuncia-me", dia: "Terça, às 19:30", local: "Paróquia São Pedro Apóstolo", cidade: "Sorriso" },
    { nome: "O Bom Samaritano", dia: "Quarta, às 19:30", local: "Paróquia São José", cidade: "Juara" },
    { nome: "Sagrada Família", dia: "Quinta, às 19:30", local: "Paróquia N. Sra. Aparecida", cidade: "Porto dos Gaúchos" },
    { nome: "N. Sra. de Fátima", dia: "Terça, às 19:30", local: "Paróquia N. Sra. de Fátima", cidade: "Marcelândia" },
    { nome: "Filhos da Mãe da Misericórdia", dia: "Quarta, às 19:30", local: "Salão Paroquial", cidade: "Colíder" },
    { nome: "Jesus Misericordioso", dia: "Quinta, às 19:00", local: "Paróquia N. Sra. de Fátima", cidade: "Itaúba" },
    { nome: "Nova Aliança", dia: "Segunda, às 19:30", local: "Paróquia N. Sra. Aparecida", cidade: "Nova Santa Helena" },
    { nome: "Fonte de Luz", dia: "Quarta, às 19:30", local: "Paróquia São Judas Tadeu", cidade: "Guarantã do Norte" },
    { nome: "Beata Helena Guerra", dia: "Quarta, às 19:00", local: "Paróquia N. Sra. da Guia", cidade: "Nova Canaã do Norte" },
    { nome: "Mergulho na Misericórdia Divina", dia: "Segunda, às 19:30", local: "Paróquia N. Sra. Aparecida", cidade: "Matupá" },
    { nome: "Adoração e Graça", dia: "Quarta, às 19:30", local: "Paróquia N. Sra. Aparecida", cidade: "Peixoto de Azevedo" },
    { nome: "Incendeia", dia: "Quinta, às 19:30", local: "Salão Paroquial", cidade: "Alta Floresta" },
    { nome: "Chave Do Céu", dia: "Segunda, às 19:30", local: "Paróquia N. Sra. da Salete", cidade: "Novo Horizonte do Norte" },
    { nome: "Amigos de Jesus", dia: "Terça, às 19:30", local: "Paróquia N. Sra. da Conceição", cidade: "Apiacás" },
    { nome: "São Padre Pio", dia: "Quarta, às 19:30", local: "Salão da Comunidade", cidade: "Nova Monte Verde" },
    { nome: "Renascer", dia: "Quinta, às 19:30", local: "Paróquia Santo Agostinho", cidade: "Paranaíta" }
];

async function seed() {
    console.log("🌱 Semeando grupos de oração (JS)...");

    const { error: deleteError } = await supabase.from('groups').delete().neq('id', 0);
    if (deleteError) console.error("Aviso: Erro ao limpar grupos antigos:", deleteError);

    const groupsWithSlug = groups.map(g => ({
        ...g,
        slug: g.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-").replace(/[^\w-]+/g, "")
    }));

    const { data, error } = await supabase.from('groups').insert(groupsWithSlug).select();

    if (error) {
        console.error("❌ Erro ao inserir grupos:", error);
    } else {
        console.log(`✅ Sucesso! ${data.length} grupos adicionados.`);
    }
}

seed();
