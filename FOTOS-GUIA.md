# 📸 Como Adicionar Fotos na Galeria

## Hospedagem de Fotos no GitHub

O GitHub permite até **1GB** de espaço por repositório, o que é suficiente para aproximadamente **500-1000 fotos** (dependendo do tamanho).

---

## 🖼️ Passo a Passo para Adicionar Fotos

### 1. Preparar as Fotos

**Antes de subir, otimize as fotos:**
- **Tamanho recomendado:** 1920x1080px (Full HD)
- **Peso máximo:** 200-500KB por foto
- **Formato:** JPG (melhor compressão)

**Ferramentas gratuitas para otimizar:**
- [TinyJPG.com](https://tinyjpg.com) - Comprime sem perder qualidade
- [Squoosh.app](https://squoosh.app) - By Google

---

### 2. Nomear as Fotos

Use nomes descritivos e sem espaços:
- ✅ `encontro-2026-01-20.jpg`
- ✅ `louvor-quarta-feira.jpg`
- ❌ `Foto da Câmera 123.jpg`

---

### 3. Fazer Upload no GitHub

#### Opção A: Pelo Site (Mais Fácil)

1. Acesse seu repositório no GitHub
2. Navegue até a pasta: `images/galeria/`
3. Clique em **"Add file"** → **"Upload files"**
4. Arraste as fotos otimizadas
5. Escreva uma descrição: `Adicionar fotos do encontro de [data]`
6. Clique em **"Commit changes"**

#### Opção B: Por Git (Linha de Comando)

```bash
cd grupo-rainha-da-paz
git add images/galeria/*.jpg
git commit -m "Adicionar fotos da galeria"
git push
```

---

### 4. Atualizar o Script (script.js)

Abra o arquivo `script.js` e procure pela função `carregarGaleria()`.

Adicione as fotos no array:

```javascript
const fotos = [
    { src: 'images/galeria/encontro-2026-01-20.jpg', alt: 'Encontro de 20/01/2026' },
    { src: 'images/galeria/louvor-quarta-feira.jpg', alt: 'Momento de louvor' },
    { src: 'images/galeria/oracao-comunitaria.jpg', alt: 'Oração comunitária' },
];
```

**Salve e faça commit:**
```bash
git add script.js
git commit -m "Atualizar galeria de fotos"
git push
```

---

## 🚀 Alternativas ao GitHub (Se Passar de 1GB)

### Cloudinary (Recomendado)
- ✅ **25GB grátis**
- ✅ Otimização automática
- ✅ CDN rápido
- [Criar conta grátis](https://cloudinary.com)

### ImgBB
- ✅ Upload ilimitado (grátis)
- ✅ Links diretos
- [Acessar ImgBB](https://imgbb.com)

### Google Photos
- ✅ Fotos ilimitadas (qualidade comprimida)
- ✅ Embeds fáceis
- [Google Photos](https://photos.google.com)

---

## 🔄 Automatizar com n8n (Avançado)

Você pode criar um workflow n8n para:
1. Receber foto por WhatsApp ou email
2. Otimizar automaticamente
3. Fazer upload no GitHub
4. Atualizar o script.js

---

## 📏 Limites e Recomendações

### GitHub:
- **Limite:** 1GB total
- **Arquivo máximo:** 100MB por arquivo (mas evite > 1MB)
- **Ideal:** Fotos otimizadas de 200-500KB

### Cloudinary (Plano Grátis):
- **Limite:** 25GB
- **Largura de banda:** 25GB/mês
- **Transformações:** 25 créditos/mês

---

## 💡 Dicas Importantes

1. **Sempre otimize as fotos** antes de subir
2. **Nomeie de forma organizada** (por data ou evento)
3. **Faça backup** das fotos originais em outro lugar
4. **Não suba fotos com rostos de crianças** sem autorização dos pais

---

## 📊 Monitorar Uso do GitHub

Para ver quanto espaço está usando:
1. Vá em **Settings** do repositório
2. Role até **"Repository size"**
3. Verifique o tamanho total

---

**Dúvidas?** Entre em contato pelo WhatsApp do grupo! 🔥
