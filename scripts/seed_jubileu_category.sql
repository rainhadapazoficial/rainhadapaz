-- Seed the Jubileu de Ouro category
INSERT INTO public.post_categories (name, slug)
VALUES ('Jubileu de Ouro', 'jubileu-de-ouro')
ON CONFLICT (name) DO NOTHING;
