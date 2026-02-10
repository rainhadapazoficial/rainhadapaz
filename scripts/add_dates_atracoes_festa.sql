-- Add start/end dates and attractions to festa_rei_jesus_editions
ALTER TABLE public.festa_rei_jesus_editions
ADD COLUMN IF NOT EXISTS data_inicio DATE,
ADD COLUMN IF NOT EXISTS data_fim DATE,
ADD COLUMN IF NOT EXISTS atracoes JSONB DEFAULT '[]'::jsonb;

-- atracoes structure: [{ "nome": "...", "descricao": "...", "foto_url": "..." }]

COMMENT ON COLUMN public.festa_rei_jesus_editions.data_inicio IS 'Data de início da festa';
COMMENT ON COLUMN public.festa_rei_jesus_editions.data_fim IS 'Data de término da festa';
COMMENT ON COLUMN public.festa_rei_jesus_editions.atracoes IS 'Array JSON com atrações: [{nome, descricao, foto_url}]';

DO $$
BEGIN
    RAISE NOTICE 'Columns data_inicio, data_fim, atracoes added successfully.';
END $$;
