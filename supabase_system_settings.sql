-- Tabela de Configurações do Sistema
CREATE TABLE IF NOT EXISTS public.system_settings (
    id BIGSERIAL PRIMARY KEY,
    settings_key TEXT UNIQUE NOT NULL,
    settings_value TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso
DROP POLICY IF EXISTS "Allow authenticated full access on system_settings" ON public.system_settings;
CREATE POLICY "Allow authenticated full access on system_settings" 
ON public.system_settings FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Sem acesso público por segurança (as chaves de API devem ficar protegidas)
