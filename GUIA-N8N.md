# 🚀 Guia de Configuração - Sistema de Notícias com n8n

## 📋 Visão Geral

Este sistema permite que você gerencie as notícias do site através do n8n, fazendo commits automáticos no GitHub.

### O que você vai conseguir fazer:
- ✅ Adicionar novas notícias via webhook
- ✅ Listar todas as notícias
- ✅ Deletar notícias por ID
- ✅ Atualização automática no GitHub
- ✅ Site atualiza sozinho em segundos

---

## 🔐 PASSO 1: Criar Token do GitHub

### 1.1. Acessar Configurações
1. No GitHub, clique no seu avatar (canto superior direito)
2. Vá em **Settings** (Configurações)

### 1.2. Criar Personal Access Token
1. No menu lateral esquerdo, vá até o final e clique em **Developer settings**
2. Clique em **Personal access tokens** → **Tokens (classic)**
3. Clique em **Generate new token** → **Generate new token (classic)**

### 1.3. Configurar o Token
- **Note:** `Token n8n - Rainha da Paz`
- **Expiration:** 90 days (ou No expiration se preferir)
- **Marque as permissões:**
  - ✅ **repo** (todas as subopções)
  - ✅ **workflow**

4. Clique em **Generate token**
5. **IMPORTANTE:** Copie o token E GUARDE - você só verá uma vez!

---

## 🔧 PASSO 2: Configurar Credencial no n8n

### 2.1. Criar Credencial HTTP Header Auth
1. No n8n, vá em **Settings** → **Credentials**
2. Clique em **+ Add Credential**
3. Procure por **HTTP Header Auth**
4. Preencha:
   - **Name:** `GitHub Token`
   - **Header Name:** `Authorization`
   - **Header Value:** `Bearer SEU_TOKEN_AQUI` (substitua pelo token que copiou)
5. Clique em **Save**

---

## 📥 PASSO 3: Importar Workflow no n8n

### 3.1. Abrir n8n
1. Acesse: https://pandolfo.app.n8n.cloud
2. Faça login

### 3.2. Importar o Workflow
1. Clique em **+ Add workflow**
2. Clique nos 3 pontinhos (⋮) no canto superior direito
3. Selecione **Import from File**
4. Selecione o arquivo `workflow-n8n-noticias.json`

### 3.3. Configurar o Workflow
**IMPORTANTE:** Você precisa substituir em TODOS os nós:
- `SEU-USUARIO` → seu usuário do GitHub (ex: `gelsonpandolfo`)
- `SEU_CREDENTIAL_ID` → a credencial `GitHub Token` que você criou

**Onde encontrar:**
- Clique em cada nó que tem "GitHub" no nome
- Procure pela URL e substitua `SEU-USUARIO`
- Na seção **Credentials**, selecione `GitHub Token`

### 3.4. Ativar o Workflow
1. No canto superior direito, mude de **Inactive** para **Active**
2. Pronto! Seus webhooks estão funcionando

---

## 🎯 PASSO 4: Como Usar os Webhooks

### 4.1. URLs dos Webhooks
Após ativar, você terá 3 webhooks:

1. **Adicionar Notícia:**
   ```
   https://pandolfo.app.n8n.cloud/webhook/adicionar-noticia
   ```

2. **Listar Notícias:**
   ```
   https://pandolfo.app.n8n.cloud/webhook/listar-noticias
   ```

3. **Deletar Notícia:**
   ```
   https://pandolfo.app.n8n.cloud/webhook/deletar-noticia/ID
   ```

### 4.2. Adicionar Nova Notícia
Use o Postman, Insomnia ou cURL:

```bash
curl -X POST https://pandolfo.app.n8n.cloud/webhook/adicionar-noticia \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Retiro de Carnaval 2026",
    "descricao": "Participe do nosso retiro de Carnaval! Será nos dias 28/02 a 02/03 em local a definir.",
    "autor": "Coordenação",
    "destaque": true
  }'
```

**Campos:**
- `titulo` (obrigatório): Título da notícia
- `descricao` (obrigatório): Texto da notícia
- `data` (opcional): Data no formato YYYY-MM-DD (se não enviar, usa a data de hoje)
- `autor` (opcional): Nome do autor (padrão: "Equipe Rainha da Paz")
- `destaque` (opcional): true ou false (padrão: false)

### 4.3. Listar Todas as Notícias
```bash
curl https://pandolfo.app.n8n.cloud/webhook/listar-noticias
```

### 4.4. Deletar uma Notícia
```bash
curl -X DELETE https://pandolfo.app.n8n.cloud/webhook/deletar-noticia/1
```
(Substitua o `1` pelo ID da notícia que quer deletar)

---

## 🎨 PASSO 5: Criar Formulário Web Simples (Opcional)

Se você quiser um formulário web pra adicionar notícias sem usar o Postman:

### 5.1. Criar arquivo `admin.html`
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Admin - Adicionar Notícia</title>
    <style>
        body { font-family: Arial; max-width: 600px; margin: 50px auto; padding: 20px; }
        input, textarea { width: 100%; padding: 10px; margin: 10px 0; }
        button { background: #C8102E; color: white; padding: 15px 30px; border: none; cursor: pointer; }
        button:hover { background: #a00d25; }
    </style>
</head>
<body>
    <h1>🔥 Adicionar Notícia</h1>
    <form id="noticiaForm">
        <label>Título:</label>
        <input type="text" id="titulo" required>
        
        <label>Descrição:</label>
        <textarea id="descricao" rows="5" required></textarea>
        
        <label>Autor:</label>
        <input type="text" id="autor" value="Equipe Rainha da Paz">
        
        <label>
            <input type="checkbox" id="destaque"> Marcar como destaque
        </label>
        
        <button type="submit">Publicar Notícia</button>
    </form>
    
    <div id="resultado"></div>
    
    <script>
        document.getElementById('noticiaForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const data = {
                titulo: document.getElementById('titulo').value,
                descricao: document.getElementById('descricao').value,
                autor: document.getElementById('autor').value,
                destaque: document.getElementById('destaque').checked
            };
            
            try {
                const response = await fetch('https://pandolfo.app.n8n.cloud/webhook/adicionar-noticia', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                document.getElementById('resultado').innerHTML = 
                    '<p style="color: green;">✅ ' + result.message + '</p>';
                document.getElementById('noticiaForm').reset();
            } catch (error) {
                document.getElementById('resultado').innerHTML = 
                    '<p style="color: red;">❌ Erro ao publicar</p>';
            }
        });
    </script>
</body>
</html>
```

### 5.2. Usar o Formulário
1. Crie esse arquivo `admin.html` no seu computador
2. Abra no navegador
3. Preencha e publique!

---

## 🔄 Como Funciona o Fluxo

```
1. Você preenche o formulário ou faz POST no webhook
   ↓
2. n8n recebe os dados
   ↓
3. n8n busca o arquivo content.json no GitHub
   ↓
4. n8n adiciona a nova notícia
   ↓
5. n8n faz commit no GitHub com o arquivo atualizado
   ↓
6. GitHub Pages atualiza automaticamente
   ↓
7. Site mostra a nova notícia em segundos!
```

---

## 📱 Integração com WhatsApp (Futuro)

Você pode criar outro workflow n8n que:
1. Recebe mensagem no WhatsApp Business API
2. Processa o texto
3. Chama o webhook de adicionar notícia
4. Responde confirmando a publicação

**Exemplo de mensagem:**
```
@novanoticia
Título: Encontro de Jovens
Descrição: Sábado às 19h teremos encontro especial para jovens!
Destaque: sim
```

---

## 🚨 Troubleshooting

### Erro 401 (Unauthorized)
- Verifique se o token do GitHub está correto
- Certifique-se que o token tem permissão `repo`

### Erro 404 (Not Found)
- Verifique se substituiu `SEU-USUARIO` pelo seu usuário correto
- Verifique se o repositório existe e é público

### Notícia não aparece no site
- Aguarde 1-2 minutos (GitHub Pages demora um pouco)
- Limpe o cache do navegador (Ctrl + F5)
- Verifique se o arquivo `content.json` foi atualizado no GitHub

### Webhook não responde
- Verifique se o workflow está **Active**
- Teste a URL do webhook no navegador primeiro

---

## 📊 Estrutura do content.json

```json
{
  "noticias": [
    {
      "id": 1,
      "titulo": "Título da notícia",
      "descricao": "Texto completo da notícia",
      "data": "2026-01-20",
      "autor": "Nome do Autor",
      "destaque": true
    }
  ]
}
```

---

## 🎓 Próximos Passos

Depois que tudo estiver funcionando, você pode:

1. **Criar painel admin completo** - com login e lista de notícias
2. **Adicionar categorias** - eventos, avisos, formação, etc.
3. **Upload de imagens** - usar Cloudinary ou ImageKit
4. **Agendar publicações** - usar node Schedule do n8n
5. **Notificações** - enviar no WhatsApp quando publicar

---

**Dúvidas?** Entre em contato pelo WhatsApp do grupo! 

🔥 **Vem e Vê!**
