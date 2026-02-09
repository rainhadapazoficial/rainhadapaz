-- SCRIPT DEFINITIVO DE PERMISSÕES PARA POSTS (SQL EDITOR)
-- Este script limpa TUDO e garante que o admin e o script de sync funcionem.

-- 1. Habilitar RLS (caso não esteja)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 2. Remover absolutamente TODAS as políticas antigas de posts para evitar conflitos
DO $$ 
DECLARE 
    pol record;
BEGIN
    FOR pol IN (SELECT policyname FROM pg_policies WHERE tablename = 'posts' AND schemaname = 'public') 
    LOOP
        EXECUTE format('DROP POLICY %I ON public.posts', pol.policyname);
    END LOOP;
END $$;

-- 3. Criar a Política MESTRE (Poder total para usuários logados / Service Role)
-- Esta regra permite Inserir, Ler, Editar e Deletar.
CREATE POLICY "Admin All Access" 
ON public.posts 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 4. Garantir que Leitura Pública continue funcionando (para o site)
CREATE POLICY "Public Read Access" 
ON public.posts 
FOR SELECT 
TO anon 
USING (true);

-- 5. Mesma lógica para a tabela de logs (para o admin ver se deu erro)
ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read sync_logs" ON public.sync_logs;
DROP POLICY IF EXISTS "Allow service_role insert sync_logs" ON public.sync_logs;

CREATE POLICY "Logs All Access Authenticated" ON public.sync_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Logs Public Select" ON public.sync_logs FOR SELECT TO anon USING (true);
