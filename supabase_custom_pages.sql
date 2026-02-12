-- Tabela de Páginas Customizadas
CREATE TABLE IF NOT EXISTS public.custom_pages (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    parent_menu TEXT DEFAULT 'quem-somos', -- Define onde a página aparecerá (ex: quem-somos, formacao)
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.custom_pages ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso
DROP POLICY IF EXISTS "Allow public read-only access on custom_pages" ON public.custom_pages;
CREATE POLICY "Allow public read-only access on custom_pages" 
ON public.custom_pages FOR SELECT 
USING (is_published = true);

-- Inserir página inicial da História da RCC Sinop (opcional, pode ser via admin)
INSERT INTO public.custom_pages (title, slug, content, parent_menu)
VALUES (
    'História RCC Sinop', 
    'historia-rcc-sinop', 
    '<h1>História da RCC na Diocese de Sinop</h1><p>Em breve contaremos aqui toda a trajetória da Renovação Carismática Católica em nossa região...</p>', 
    'quem-somos'
) ON CONFLICT (slug) DO NOTHING;
