-- ========================================================
-- UPDATE SCHEMA FOR CONSELHO_MEMBROS
-- Adds missing columns for member linkage and descriptions
-- ========================================================

-- 1. Add missing columns to conselho_membros
ALTER TABLE public.conselho_membros 
ADD COLUMN IF NOT EXISTS membro_id BIGINT REFERENCES public.ministerio_membros(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS descricao TEXT,
ADD COLUMN IF NOT EXISTS ministerio_id BIGINT REFERENCES public.ministerios(id) ON DELETE SET NULL;

-- 2. Create indexes for the new columns to improve performance
CREATE INDEX IF NOT EXISTS idx_conselho_membros_membro_id ON public.conselho_membros(membro_id);
CREATE INDEX IF NOT EXISTS idx_conselho_membros_ministerio_id ON public.conselho_membros(ministerio_id);

-- 3. Comment for documentation
COMMENT ON COLUMN public.conselho_membros.membro_id IS 'Link to the original member in the ministerio_membros table';
COMMENT ON COLUMN public.conselho_membros.descricao IS 'Short biography or description of the member in the context of management';
