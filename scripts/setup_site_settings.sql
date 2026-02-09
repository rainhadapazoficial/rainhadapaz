-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Insert initial banner data if not exists
INSERT INTO public.site_settings (key, value)
VALUES (
    'home_banner',
    '{
        "title": "Grupo de Oração Rainha da Paz",
        "subtitle": "Um lugar de encontro com o amor de Deus e a efusão do Espírito Santo.",
        "image_url": "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop",
        "button1_text": "Conheça o Grupo",
        "button1_link": "/quem-somos",
        "button2_text": "Pedido de Oração",
        "button2_link": "/contato#pedido-oracao"
    }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
