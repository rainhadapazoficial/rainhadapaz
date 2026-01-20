# 🔥 Grupo de Oração Rainha da Paz - Sinop/MT

Site oficial do Grupo de Oração Rainha da Paz da Paróquia Santo Antônio em Sinop/MT.  
Parte da Renovação Carismática Católica do Brasil.

## 📋 Sobre o Site

Este site foi desenvolvido seguindo a identidade visual da RCC Brasil, com cores e elementos que refletem a espiritualidade carismática católica.

### Características:
- ✅ Design responsivo (funciona em celular, tablet e desktop)
- ✅ Identidade visual RCC Brasil (vermelho, amarelo, branco)
- ✅ Formulário de pedidos de oração via WhatsApp
- ✅ Mapa de localização integrado
- ✅ Animações suaves e modernas
- ✅ Menu mobile
- ✅ Links para redes sociais
- ✅ **Sistema de notícias integrado com n8n** 🔥
- ✅ **Atualização automática via webhook**

## 🚀 Como Colocar no Ar (GitHub Pages)

### Passo 1: Criar Conta no GitHub
1. Acesse [github.com](https://github.com)
2. Clique em "Sign up" (Cadastrar)
3. Preencha seus dados e confirme o email

### Passo 2: Criar um Repositório
1. Após fazer login, clique no botão **"+"** no canto superior direito
2. Selecione **"New repository"**
3. Preencha:
   - **Repository name:** `grupo-rainha-da-paz` (ou outro nome que preferir)
   - **Description:** Site do Grupo de Oração Rainha da Paz
   - Marque **"Public"** (público)
   - Marque **"Add a README file"**
4. Clique em **"Create repository"**

### Passo 3: Fazer Upload dos Arquivos
1. No repositório criado, clique em **"Add file"** → **"Upload files"**
2. Arraste os 3 arquivos para a área indicada:
   - `index.html`
   - `style.css`
   - `script.js`
3. Na caixa "Commit changes" embaixo, escreva: `Adicionar arquivos do site`
4. Clique em **"Commit changes"**

### Passo 4: Ativar o GitHub Pages
1. No seu repositório, clique em **"Settings"** (Configurações)
2. No menu lateral esquerdo, clique em **"Pages"**
3. Em **"Source"**, selecione:
   - Branch: **main**
   - Folder: **/ (root)**
4. Clique em **"Save"**
5. Aguarde 1-2 minutos

### Passo 5: Acessar Seu Site
Após alguns minutos, seu site estará disponível em:
```
https://SEU-USUARIO.github.io/grupo-rainha-da-paz/
```

Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub.

---

## 🎨 Personalizações Fáceis

### Alterar Cores
Abra o arquivo `style.css` e na seção `:root` no topo, você pode modificar:
```css
--rcc-red: #C8102E;      /* Vermelho principal */
--rcc-yellow: #FFD100;   /* Amarelo/dourado */
--rcc-white: #FFFFFF;    /* Branco */
```

### Alterar Textos
Abra o arquivo `index.html` e procure pelo texto que deseja mudar. Tudo está em português e bem organizado.

### Adicionar Fotos
Para adicionar uma foto de fundo no Hero (topo), procure no `style.css` pela seção `.hero` e substitua a cor sólida por uma imagem:
```css
background: linear-gradient(rgba(200, 16, 46, 0.8), rgba(200, 16, 46, 0.9)), 
            url('caminho-da-sua-foto.jpg');
```

---

## 📱 Funcionalidades

### 1. Formulário de Pedidos de Oração
- Formulário envia automaticamente para o WhatsApp do grupo
- Número configurado: (66) 98136-5456

### 2. Menu Responsivo
- Menu hambúrguer automático em telas pequenas
- Navegação suave entre seções

### 3. Mapa Integrado
- Localização da Paróquia Santo Antônio
- Link direto para Google Maps

### 4. Animações
- Elementos aparecem suavemente ao fazer scroll
- Efeito de digitação no título principal
- Hover effects em cards e botões

---

## 📰 Sistema de Notícias com n8n

O site possui um sistema completo de gerenciamento de notícias integrado com n8n!

### Como Funciona:
1. Você envia uma requisição HTTP para o webhook do n8n
2. O n8n processa e atualiza o arquivo `content.json` no GitHub
3. O site carrega automaticamente as notícias do arquivo
4. Atualização em tempo real - sem precisar mexer no código!

### Configuração:
📖 **Guia completo de configuração:** Veja o arquivo `GUIA-N8N.md`

### Recursos:
- ✅ Adicionar notícias via webhook
- ✅ Listar todas as notícias
- ✅ Deletar notícias por ID
- ✅ Marcar notícias como "destaque"
- ✅ Commits automáticos no GitHub
- ✅ Formulário web de administração (opcional)

### Exemplo de Uso:
```bash
curl -X POST https://pandolfo.app.n8n.cloud/webhook/adicionar-noticia \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Nova notícia",
    "descricao": "Conteúdo da notícia aqui",
    "destaque": true
  }'
```

---

## 🔧 Estrutura de Arquivos

```
grupo-rainha-da-paz/
│
├── index.html                    # Estrutura e conteúdo do site
├── style.css                     # Estilos e cores
├── script.js                     # Funcionalidades e interatividade
├── content.json                  # Arquivo de notícias (gerenciado pelo n8n)
├── workflow-n8n-noticias.json    # Workflow para importar no n8n
├── GUIA-N8N.md                   # Guia completo de configuração do n8n
└── README.md                     # Este arquivo (instruções)
```

---

## 📞 Contatos do Grupo

- **WhatsApp:** (66) 98136-5456
- **Endereço:** Av. das Sibipirunas, 3092 - Centro, Sinop/MT
- **Horário:** Quartas-feiras às 19:30
- **Instagram Paróquia:** @paroquiasantoantoniosinop
- **Facebook:** rainhadapazoficialsinop

---

## 🛠️ Suporte Técnico

Se precisar de ajuda com o site, entre em contato através do WhatsApp do grupo.

---

## 📄 Licença

Este site foi desenvolvido para o Grupo de Oração Rainha da Paz.  
Livre para uso e modificação pela equipe do grupo.

---

**Desenvolvido com 🔥 para a Renovação Carismática Católica**

*"Onde cair a água da chuva, aí deve haver um Grupo de Oração"*
