-- Habilitar DELETE para usuários autenticados nas tabelas principais
-- Isso resolve o erro 403 Forbidden ao tentar excluir itens no painel admin

-- Tabela de Posts (Notícias)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'posts' AND policyname = 'Permitir exclusão para usuários autenticados'
    ) THEN
        CREATE POLICY "Permitir exclusão para usuários autenticados" 
        ON public.posts 
        FOR DELETE 
        TO authenticated 
        USING (true);
    END IF;
END $$;

-- Tabela de Eventos
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'events' AND policyname = 'Permitir exclusão para usuários autenticados'
    ) THEN
        CREATE POLICY "Permitir exclusão para usuários autenticados" 
        ON public.events 
        FOR DELETE 
        TO authenticated 
        USING (true);
    END IF;
END $$;

-- Tabela de Galeria
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'gallery' AND policyname = 'Permitir exclusão para usuários autenticados'
    ) THEN
        CREATE POLICY "Permitir exclusão para usuários autenticados" 
        ON public.gallery 
        FOR DELETE 
        TO authenticated 
        USING (true);
    END IF;
END $$;

-- Tabela de Pedidos de Oração
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'prayer_requests' AND policyname = 'Permitir exclusão para usuários autenticados'
    ) THEN
        CREATE POLICY "Permitir exclusão para usuários autenticados" 
        ON public.prayer_requests 
        FOR DELETE 
        TO authenticated 
        USING (true);
    END IF;
END $$;
