-- SCRIPT DE LIBERAÇÃO DE ADMIN (EVENTOS E GALERIA)
-- Este script corrige o erro de "permissão negada" ao apagar Eventos e Fotos.

-- 1. EVENTOS: Limpa regras antigas e libera geral para Admin
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
DO $$ 
DECLARE pol record;
BEGIN
    FOR pol IN (SELECT policyname FROM pg_policies WHERE tablename = 'events' AND schemaname = 'public') 
    LOOP
        EXECUTE format('DROP POLICY %I ON public.events', pol.policyname);
    END LOOP;
END $$;
CREATE POLICY "Admin All Access Events" ON public.events FOR ALL USING (true) WITH CHECK (true);


-- 2. GALERIA: Limpa regras antigas e libera geral para Admin
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
DO $$ 
DECLARE pol record;
BEGIN
    FOR pol IN (SELECT policyname FROM pg_policies WHERE tablename = 'gallery' AND schemaname = 'public') 
    LOOP
        EXECUTE format('DROP POLICY %I ON public.gallery', pol.policyname);
    END LOOP;
END $$;
CREATE POLICY "Admin All Access Gallery" ON public.gallery FOR ALL USING (true) WITH CHECK (true);


-- 3. STORAGE: Garante que o Admin pode apagar as imagens do bucket
-- (Isso é crucial, senão o banco apaga o registro mas a imagem fica órfã e dá erro)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true), ('galeria-fotos', 'galeria-fotos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Admin Delete Media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id IN ('media', 'galeria-fotos'));
CREATE POLICY "Admin Insert Media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('media', 'galeria-fotos'));
CREATE POLICY "Admin Update Media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id IN ('media', 'galeria-fotos'));
