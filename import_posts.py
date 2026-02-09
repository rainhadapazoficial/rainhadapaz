import os
import json
import requests
from supabase import create_client, Client

# Configurações do Supabase
URL = "https://xxewcdrlcwalnrdlesmd.supabase.co"
KEY = "" # O usuário deve prover ou eu pego do arquivo .env/supabase.ts se possível. Aqui já vi em supabase.ts
# Mas como Agent, vou tentar ler do arquivo se possível ou apenas preparar o script.

# Diretório dos posts baixados
POSTS_DIR = r"c:\PANDOLFO\SITE RCC DIOCESE\wp-json\wp\v2\posts"

def get_supabase_client():
    # Tenta ler do arquivo ou env
    supabase_url = URL
    supabase_key = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY", "")
    if not supabase_key:
        print("AVISO: Chave anon do Supabase não encontrada no ambiente. O script pode falhar se não for fornecida.")
    return create_client(supabase_url, supabase_key)

def import_posts():
    supabase = get_supabase_client()
    
    for filename in os.listdir(POSTS_DIR):
        file_path = os.path.join(POSTS_DIR, filename)
        if os.path.isfile(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                try:
                    post_data = json.load(f)
                    
                    # Mapeamento
                    title = post_data.get('title', {}).get('rendered', '')
                    content = post_data.get('content', {}).get('rendered', '')
                    excerpt = post_data.get('excerpt', {}).get('rendered', '')
                    slug = post_data.get('slug', '')
                    date = post_data.get('date', '')
                    
                    # Tenta pegar a imagem do featured_media (precisaria de outro request ou check no wp-json/wp/v2/media)
                    # Por enquanto, deixamos em branco ou tentamos inferir
                    image_url = ""
                    
                    data = {
                        "title": title,
                        "content": content,
                        "excerpt": excerpt,
                        "slug": slug,
                        "date": date,
                        "image_url": image_url,
                        "author": "Diocese de Sinop",
                        "category": "Notícias"
                    }
                    
                    print(f"Importando: {title}")
                    result = supabase.table("posts").upsert(data, on_conflict="slug").execute()
                    
                except Exception as e:
                    print(f"Erro ao importar {filename}: {e}")

if __name__ == "__main__":
    # Como não tenho a KEY real aqui agora (ela estava vazia no export), 
    # vou apenas simular ou avisar que precisa da KEY.
    print("Iniciando processo de importação...")
    import_posts()
