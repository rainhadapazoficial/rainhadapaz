import os
import urllib.request
import urllib.error
import urllib.parse
import ssl
import re

# Configurações
BASE_URL = "https://www.rccdesinop.com.br/"
DOMAIN = urllib.parse.urlparse(BASE_URL).netloc
OUTPUT_DIR = os.path.abspath("c:/PANDOLFO/SITE RCC DIOCESE")
VISITED_URLS = set()

# Ignorar verificação de SSL
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def get_local_path(url):
    """Converte uma URL em um caminho de arquivo local."""
    parsed = urllib.parse.urlparse(url)
    path = parsed.path
    if not path or path.endswith('/'):
        path += 'index.html'
    
    # Limpa o path e garante que seja relativo
    relative_path = path.lstrip('/')
    # No Windows, paths podem dar problemas com caracteres especiais
    relative_path = re.sub(r'[<>:"|?*]', '_', relative_path)
    return os.path.join(OUTPUT_DIR, relative_path)

def download_file(url, local_path):
    """Baixa um arquivo da URL para o caminho local usando urllib."""
    if url in VISITED_URLS:
        return False
    VISITED_URLS.add(url)
    
    try:
        print(f"Processando: {url}")
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        
        # Headers para parecer um navegador
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        req = urllib.request.Request(url, headers=headers)
        
        with urllib.request.urlopen(req, context=ctx, timeout=10) as response:
            content = response.read()
            
            with open(local_path, 'wb') as f:
                f.write(content)
            
            # Se for HTML, extrai mais links
            content_type = response.getheader('Content-Type', '')
            if 'text/html' in content_type:
                try:
                    html_text = content.decode('utf-8', errors='ignore')
                    # Regex simples para encontrar links
                    links = re.findall(r'href=["\'](.[^"\']+)["\']', html_text)
                    srcs = re.findall(r'src=["\'](.[^"\']+)["\']', html_text)
                    
                    for link in set(links + srcs):
                        full_url = urllib.parse.urljoin(url, link)
                        full_url = full_url.split('#')[0].split('?')[0]
                        
                        if DOMAIN in full_url:
                            # Se for dentro do site, continua o crawl
                            if full_url.startswith(BASE_URL) and full_url not in VISITED_URLS:
                                download_file(full_url, get_local_path(full_url))
                            # Se for um recurso estático (mesmo que em subdominio ou CDN se quiser, mas aqui limitamos ao dominio)
                            elif any(ext in full_url.lower() for ext in ['.jpg', '.jpeg', '.png', '.gif', '.css', '.js', '.pdf', '.svg']) and full_url not in VISITED_URLS:
                                download_file(full_url, get_local_path(full_url))
                except Exception as e:
                    print(f"Erro ao parsear HTML de {url}: {e}")
        return True
    except Exception as e:
        print(f"Erro ao baixar {url}: {e}")
        return False

if __name__ == "__main__":
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
    
    print(f"Iniciando download recursivo em: {OUTPUT_DIR}")
    download_file(BASE_URL, get_local_path(BASE_URL))
    print("Download concluído!")
