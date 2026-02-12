-- Atualização de Páginas para Conformidade Google Ad Grants
-- Este script cria as páginas de Política, Termos e Apoio, e atualiza o Quem Somos.

-- 1. Política de Privacidade
INSERT INTO public.custom_pages (title, slug, content, parent_menu)
VALUES (
    'Política de Privacidade',
    'politica-de-privacidade',
    '<h1>Política de Privacidade</h1><p>Na RCC Diocese de Sinop (CNPJ: 03.162.415/0001-50), a privacidade dos nossos fiéis e visitantes é primordial. Não coletamos dados pessoais para fins lucrativos. Formulários de contato são utilizados apenas para comunicação institucional e evangelização. Nosso site utiliza conexões seguras (HTTPS) para proteger qualquer informação enviada.</p>',
    'institucional'
) ON CONFLICT (slug) DO UPDATE SET content = EXCLUDED.content;

-- 2. Termos de Uso
INSERT INTO public.custom_pages (title, slug, content, parent_menu)
VALUES (
    'Termos de Uso',
    'termos-de-uso',
    '<h1>Termos de Uso</h1><p>Este site é de propriedade da Renovação Carismática Católica da Diocese de Sinop. Ao acessá-lo, você concorda em utilizar este espaço para fins de edificação espiritual e informação religiosa. Este é um site sem fins lucrativos e não hospedamos publicidade comercial de terceiros.</p>',
    'institucional'
) ON CONFLICT (slug) DO UPDATE SET content = EXCLUDED.content;

-- 3. Apoie Nossa Missão (Conversão de Doação)
INSERT INTO public.custom_pages (title, slug, content, parent_menu)
VALUES (
    'Apoie Nossa Missão',
    'apoie-nossa-missao',
    '<div style="text-align: center; max-width: 800px; margin: 0 auto;"><h1>Apoie Nossa Missão Evangelizadora</h1><p>Sua contribuição sustenta os eventos de formação e a manutenção do Escritório Diocesano da RCC em Sinop.</p><div style="background: #f8f8f8; padding: 30px; border-radius: 20px; border: 2px dashed #004d2c; margin: 30px 0;"><h2 style="color: #004d2c;">Contribua via PIX (CNPJ)</h2><p><strong>03.162.415/0001-50</strong></p><p style="font-size: 0.8rem; color: #666;">Titular: Diocese de Sinop - RCC</p></div><p><i>Deus ama quem dá com alegria. (2 Coríntios 9:7)</i></p></div>',
    'institucional'
) ON CONFLICT (slug) DO UPDATE SET content = EXCLUDED.content;

-- 4. Atualizar Quem Somos (Missão)
UPDATE public.custom_pages 
SET content = '<h1>Quem Somos</h1><p>A Renovação Carismática Católica (RCC) é um movimento eclesial da Igreja Católica Apostólica Romana que busca viver e difundir a cultura de Pentecostes.</p><div style="background: #004d2c; color: white; padding: 25px; border-radius: 15px; margin: 20px 0;"><h2 style="color: #ffcc00; margin-top: 0;">Nossa Missão</h2><p>Promover a cultura de Pentecostes, evangelizando as famílias e formando lideranças comprometidas com os valores do Evangelho, sob a autoridade da Diocese de Sinop.</p></div>'
WHERE slug = 'quem-somos';
