-- ============================================
-- TABELA DE MEMBROS DOS MINISTÉRIOS
-- ============================================

-- Tabela: membros individuais de cada ministério
CREATE TABLE IF NOT EXISTS public.ministerio_membros (
    id BIGSERIAL PRIMARY KEY,
    ministerio_id BIGINT NOT NULL REFERENCES public.ministerios(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    foto_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para buscar membros por ministério rapidamente
CREATE INDEX IF NOT EXISTS idx_ministerio_membros_min_id
    ON public.ministerio_membros(ministerio_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.ministerio_membros ENABLE ROW LEVEL SECURITY;

-- Política de Leitura Pública: qualquer pessoa pode ver os membros
CREATE POLICY "Allow public read on ministry members"
    ON public.ministerio_membros FOR SELECT USING (true);

-- Política de Acesso Total para Admin: usuários autenticados podem gerenciar membros
CREATE POLICY "Allow admin full access on ministry members"
    ON public.ministerio_membros FOR ALL USING (auth.role() = 'authenticated');

COMMENT ON TABLE public.ministerio_membros IS 'Membros individuais cadastrados em cada ministério';
