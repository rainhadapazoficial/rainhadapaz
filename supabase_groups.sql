-- Tabela de Grupos de Oração
CREATE TABLE IF NOT EXISTS public.groups (
    id BIGSERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    dia TEXT NOT NULL,
    local TEXT NOT NULL,
    cidade TEXT NOT NULL,
    geolocalizacao TEXT,
    coordenador TEXT,
    whatsapp TEXT,
    site TEXT,
    facebook TEXT,
    instagram TEXT,
    slug TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso
CREATE POLICY "Allow public read-only access on groups" ON public.groups FOR SELECT USING (true);
CREATE POLICY "Allow admin full access on groups" ON public.groups FOR ALL USING (true);
