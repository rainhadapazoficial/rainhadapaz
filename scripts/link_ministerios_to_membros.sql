-- Add ministerio_id to conselho_membros table
ALTER TABLE public.conselho_membros ADD COLUMN IF NOT EXISTS ministerio_id BIGINT REFERENCES public.ministerios(id) ON DELETE SET NULL;

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_conselho_membros_ministerio ON public.conselho_membros(ministerio_id);
