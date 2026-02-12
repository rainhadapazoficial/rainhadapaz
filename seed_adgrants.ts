import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const s = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
    console.log("Seeding Ad Grants pages...");

    const pages = [
        {
            title: 'Política de Privacidade',
            slug: 'politica-de-privacidade',
            content: `
                <h1>Política de Privacidade</h1>
                <p>Na RCC Diocese de Sinop (Pessoa Jurídica sem fins lucrativos - CNPJ: 03.162.415/0001-50), a privacidade dos nossos fiéis e visitantes é primordial.</p>
                <h3>1. Coleta de Dados</h3>
                <p>Não coletamos dados pessoais para fins lucrativos. Formulários de contato ou pedidos são utilizados apenas para comunicação institucional e evangelização.</p>
                <h3>2. Cookies e Navegação</h3>
                <p>Utilizamos ferramentas de estatística (como Google Analytics) para entender o alcance da nossa missão digital. Estes dados são anônimos.</p>
                <h3>3. Segurança</h3>
                <p>Nosso site utiliza conexões seguras (HTTPS) para proteger qualquer informação enviada.</p>
            `,
            parent_menu: 'institucional'
        },
        {
            title: 'Termos de Uso',
            slug: 'termos-de-uso',
            content: `
                <h1>Termos de Uso</h1>
                <p>Este site é de propriedade da Renovação Carismática Católica da Diocese de Sinop. Ao acessá-lo, você concorda em utilizar este espaço para fins de edificação espiritual e informação religiosa.</p>
                <h3>Propriedade Intelectual</h3>
                <p>Textos e imagens são de uso institucional. Pedimos que qualquer compartilhamento seja feito com os devidos créditos à RCC Sinop.</p>
                <h3>Atividade Comercial</h3>
                <p>Este é um site sem fins lucrativos. Não comercializamos anúncios de terceiros nem hospedamos banners publicitários comerciais.</p>
            `,
            parent_menu: 'institucional'
        },
        {
            title: 'Apoie Nossa Missão',
            slug: 'apoie-nossa-missao',
            content: `
                <div style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <h1>Apoie Nossa Missão Evangelizadora</h1>
                    <p>Sua contribuição sustenta os eventos de formação, retiros de espiritualidade e a manutenção do Escritório Diocesano da RCC em Sinop.</p>
                    <div style="background: #f8f8f8; padding: 30px; border-radius: 20px; border: 2px dashed #004d2c; margin: 30px 0;">
                        <h2 style="color: #004d2c;">Contribua via PIX</h2>
                        <p><strong>Chave (CNPJ):</strong> 03.162.415/0001-50</p>
                        <p style="font-size: 0.8rem; color: #666;">Titular: Diocese de Sinop - RCC</p>
                    </div>
                    <p><i>"Cada um dê conforme determinou em seu coração, não com pesar nem por obrigação, pois Deus ama quem dá com alegria." (2 Coríntios 9:7)</i></p>
                </div>
            `,
            parent_menu: 'institucional'
        },
        {
            title: 'Quem Somos',
            slug: 'quem-somos',
            content: `
                <h1>Quem Somos</h1>
                <p>A Renovação Carismática Católica (RCC) é um movimento eclesial da Igreja Católica Apostólica Romana que busca viver e difundir a cultura de Pentecostes.</p>
                <div style="background: #004d2c; color: white; padding: 25px; border-radius: 15px; margin: 20px 0;">
                    <h2 style="color: #ffcc00; margin-top: 0;">Nossa Missão</h2>
                    <p>Promover a cultura de Pentecostes, evangelizando as famílias e formando lideranças comprometidas com os valores do Evangelho, sob a autoridade da Diocese de Sinop.</p>
                </div>
                <p>Estamos presentes em diversas paróquias da nossa Diocese, através de Grupos de Oração, Ministérios e eventos que levam a experiência do Batismo no Espírito Santo a todos.</p>
            `,
            parent_menu: 'institucional'
        }
    ];

    for (const page of pages) {
        const { error } = await s.from('custom_pages').upsert(page, { onConflict: 'slug' });
        if (error) console.error(\`Error seeding \${page.slug}:\`, error.message);
        else console.log(\`Successfully seeded \${page.slug}\`);
    }
}

seed();
