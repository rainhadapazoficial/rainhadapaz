-- Seed initial Jubileu de Ouro settings
INSERT INTO public.site_settings (key, value)
VALUES (
    'jubileu_settings',
    '{
        "parish": {
            "title": "A Paróquia Santo Antônio",
            "description": "Matriz da Diocese de Sinop, a Paróquia Santo Antônio é o coração espiritual de nossa cidade. É aqui, sob o manto de Santo Antônio, que o Grupo de Oração Rainha da Paz encontrou sua sede e floresceu ao longo de cinco décadas.",
            "image_url": "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2000"
        },
        "parson": {
            "name": "Pe. Roberto J. Gottardo, SJ",
            "title": "Companhia de Jesus (Jesuítas)",
            "bio": "Com sabedoria e acolhimento, Padre Roberto conduz nossa Paróquia incentivando a vida comunitária e a força dos movimentos e grupos de oração, como o Rainha da Paz.",
            "quote": "O Jubileu é um tempo de memória, mas sobretudo de esperança. Olhamos para o passado com gratidão para construir um futuro com fé.",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwaR_9Bv_fG2TiaD0WUK4hT9pP6nEq_3mI6A&s"
        },
        "history": {
            "title": "50 Anos de História",
            "description": "De um pequeno grupo de amigos a um dos maiores movimentos de fé de Sinop. Descubra os marcos, as pessoas e as graças que definiram nossa trajetória.",
            "image_url": "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1000",
            "timeline": [
                {
                    "year": "1976",
                    "title": "O Início",
                    "description": "Um pequeno grupo de amigos se reúne para rezar o terço e compartilhar a Palavra, dando início à semente do que viria a ser o Rainha da Paz.",
                    "image": "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1000"
                },
                {
                    "year": "1985",
                    "title": "Crescimento e Missão",
                    "description": "O grupo expande sua atuação, iniciando as primeiras missões em bairros e cidades vizinhas, fortalecendo a espiritualidade carismática.",
                    "image": "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000"
                },
                {
                    "year": "1997",
                    "title": "Consolidação na Matriz",
                    "description": "Estabelecimento de reuniões regulares na Matriz Santo Antônio, tornando-se uma referência para a Diocese de Sinop.",
                    "image": "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2000"
                },
                {
                    "year": "2010",
                    "title": "Nova Geração",
                    "description": "Forte investimento na juventude e em novos ministérios, renovando o ardor missionário do grupo.",
                    "image": "https://images.unsplash.com/photo-1523580494863-6f30312248fd?q=80&w=1000"
                },
                {
                    "year": "2026",
                    "title": "Jubileu de Ouro",
                    "description": "Celebração de 50 anos de caminhada, com gratidão pelo passado e esperança no futuro.",
                    "image": "https://images.unsplash.com/photo-1464692805480-a69dfaafdb0d?q=80&w=1000"
                }
            ]
        }
    }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
