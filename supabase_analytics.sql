-- Tabela de Estatísticas de Acesso
CREATE TABLE IF NOT EXISTS public.page_views (
    id BIGSERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    views INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso
DROP POLICY IF EXISTS "Allow public upsert on page_views" ON public.page_views;
-- Usamos uma função RPC para incrementar com segurança no server-side, 
-- ou permitimos que o service role (API) gerencie isso.
CREATE POLICY "Allow public read access on page_views" ON public.page_views FOR SELECT USING (true);
