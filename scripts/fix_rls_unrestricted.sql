-- SCRIPT DE DESBLOQUEIO TOTAL (POSTS)
-- Use este script se as notícias ainda não estiverem entrando.

-- 1. Desabilita RLS temporariamente para garantir que o banco aceita dados
ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;

-- 2. Limpa todas as políticas antigas
DO $$ 
DECLARE 
    pol record;
BEGIN
    FOR pol IN (SELECT policyname FROM pg_policies WHERE tablename = 'posts' AND schemaname = 'public') 
    LOOP
        EXECUTE format('DROP POLICY %I ON public.posts', pol.policyname);
    END LOOP;
END $$;

-- 3. Habilita RLS novamente
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 4. Cria política de acesso total para TODOS os papéis (incluindo o robô do GitHub)
CREATE POLICY "Unrestricted Access to Posts" 
ON public.posts 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- 5. Garante que os logs também funcionem
ALTER TABLE public.sync_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Logs All Access Authenticated" ON public.sync_logs;
CREATE POLICY "Unrestricted Access to Logs" ON public.sync_logs FOR ALL USING (true) WITH CHECK (true);
