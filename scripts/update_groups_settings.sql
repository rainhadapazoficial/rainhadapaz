
-- Insert groups_page setting if not exists
INSERT INTO public.site_settings (key, value)
VALUES (
    'groups_page',
    '{
        "title": "Grupos de Oração",
        "subtitle": "Encontre um Grupo de Oração da Renovação Carismática Católica mais próximo de você e venha vivenciar Pentecostes!",
        "image_url": "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop"
    }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
