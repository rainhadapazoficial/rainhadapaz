-- Tabela para log de sincronização (Executar no SQL Editor do Supabase)
CREATE TABLE IF NOT EXISTS public.sync_logs (
    id BIGSERIAL PRIMARY KEY,
    service_name TEXT NOT NULL DEFAULT 'RCC Brasil',
    status TEXT NOT NULL, -- 'success', 'error'
    entries_synced INTEGER DEFAULT 0,
    message TEXT,
    last_synced_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read sync_logs" ON public.sync_logs FOR SELECT USING (true);
CREATE POLICY "Allow service_role insert sync_logs" ON public.sync_logs FOR INSERT WITH CHECK (true);
