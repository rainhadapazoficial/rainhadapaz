-- SOLUÇÃO DEFINITIVA (NUCLEAR) PARA APAGAR EVENTOS E GALERIA
-- Segue o mesmo padrão que usou para desbloquear as notícias.

-- ---------------------------------------------------------
-- 1. TABELA DE EVENTOS (events)
-- ---------------------------------------------------------
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;

-- Remove TODAS as políticas
DO $$ 
DECLARE pol record;
BEGIN
    FOR pol IN (SELECT policyname FROM pg_policies WHERE tablename = 'events' AND schemaname = 'public') 
    LOOP
        EXECUTE format('DROP POLICY %I ON public.events', pol.policyname);
    END LOOP;
END $$;

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Cria a permissão universal (Admin pode apagar, editar, criar)
CREATE POLICY "Universal Events Access" 
ON public.events 
FOR ALL 
USING (true) 
WITH CHECK (true);


-- ---------------------------------------------------------
-- 2. TABELA DE GALERIA (gallery)
-- ---------------------------------------------------------
ALTER TABLE public.gallery DISABLE ROW LEVEL SECURITY;

-- Remove TODAS as políticas
DO $$ 
DECLARE pol record;
BEGIN
    FOR pol IN (SELECT policyname FROM pg_policies WHERE tablename = 'gallery' AND schemaname = 'public') 
    LOOP
        EXECUTE format('DROP POLICY %I ON public.gallery', pol.policyname);
    END LOOP;
END $$;

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Cria a permissão universal
CREATE POLICY "Universal Gallery Access" 
ON public.gallery 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- ---------------------------------------------------------
-- 3. STORAGE (Apagar imagens)
-- ---------------------------------------------------------
-- Garante que pode apagar arquivos dos buckets
DROP POLICY IF EXISTS "Universal Storage Delete" ON storage.objects;
CREATE POLICY "Universal Storage Delete" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id IN ('events', 'gallery', 'galeria-fotos', 'media'));
