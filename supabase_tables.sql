-- Tabela de Eventos (Agenda)
CREATE TABLE IF NOT EXISTS public.events (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Galeria
CREATE TABLE IF NOT EXISTS public.gallery (
    id BIGSERIAL PRIMARY KEY,
    title TEXT,
    image_url TEXT,
    category TEXT,
    event_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Notícias (Posts) - Caso não exista
CREATE TABLE IF NOT EXISTS public.posts (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image_url TEXT,
    category TEXT,
    author TEXT,
    slug TEXT UNIQUE,
    date TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Pedidos de Oração - Caso não exista
CREATE TABLE IF NOT EXISTS public.prayer_requests (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS (Opcional, mas recomendado)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso Público (Leitura)
CREATE POLICY "Allow public read-only access on events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access on gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access on posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access on prayer_requests" ON public.prayer_requests FOR INSERT WITH CHECK (true);
