-- SCRIPT DEFINITIVO DE CORREÇÃO DE PERMISSÕES (SQL EDITOR)
-- Este script remove políticas antigas e recria do zero para evitar conflitos de nomes.

-- 1. LIMPEZA DE POLÍTICAS ANTIGAS (POSTS)
DROP POLICY IF EXISTS "Allow delete for authenticated" ON public.posts;
DROP POLICY IF EXISTS "Admins podem excluir posts" ON public.posts;
DROP POLICY IF EXISTS "Permitir exclusão para usuários autenticados" ON public.posts;

-- 2. CRIAÇÃO DA NOVA POLÍTICA (POSTS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Exclusão permitida para usuários logados" 
ON public.posts 
FOR DELETE 
TO authenticated 
USING (true);

-- 3. LIMPEZA E CRIAÇÃO PARA EVENTOS (Opcional, mas recomendado)
DROP POLICY IF EXISTS "Admins podem excluir eventos" ON public.events;
DROP POLICY IF EXISTS "Permitir exclusão para usuários autenticados" ON public.events;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Exclusão de eventos para usuários logados" 
ON public.events 
FOR DELETE 
TO authenticated 
USING (true);

-- 4. LIMPEZA E CRIAÇÃO PARA STORAGE (FOTOS)
-- Removemos políticas genéricas que podem estar bloqueando
DROP POLICY IF EXISTS "Admins podem excluir arquivos" ON storage.objects;
DROP POLICY IF EXISTS "Admins podem excluir fotos de galeria" ON storage.objects;
DROP POLICY IF EXISTS "Admins podem excluir media" ON storage.objects;

-- Criamos uma política única e poderosa para o Admin no Storage
CREATE POLICY "Admin total sobre arquivos" 
ON storage.objects 
FOR ALL 
TO authenticated 
USING (bucket_id IN ('galeria-fotos', 'media', 'posts'))
WITH CHECK (bucket_id IN ('galeria-fotos', 'media', 'posts'));
