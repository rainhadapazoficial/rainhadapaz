-- 1. Políticas para Notícias (posts)
DO $$ 
BEGIN
    -- Permitir DELETE para usuários autenticados
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'posts' AND policyname = 'Admins podem excluir posts') THEN
        CREATE POLICY "Admins podem excluir posts" ON public.posts FOR DELETE TO authenticated USING (true);
    END IF;
    
    -- Garantir UPDATE também
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'posts' AND policyname = 'Admins podem editar posts') THEN
        CREATE POLICY "Admins podem editar posts" ON public.posts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
    END IF;
END $$;

-- 2. Garantir que o Bucket existe e tem permissões
-- Nota: Buckets são gerenciados na tabela storage.buckets
INSERT INTO storage.buckets (id, name, public)
SELECT 'galeria-fotos', 'galeria-fotos', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'galeria-fotos');

INSERT INTO storage.buckets (id, name, public)
SELECT 'media', 'media', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'media');

-- 3. Políticas de Storage para os Buckets
-- Permitir que usuários autenticados deletem arquivos
CREATE POLICY "Admins podem excluir fotos de galeria" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'galeria-fotos');

CREATE POLICY "Admins podem excluir media" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'media');

-- Permitir upload também para garantir fluxo completo
CREATE POLICY "Admins podem subir fotos" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id IN ('galeria-fotos', 'media'));
