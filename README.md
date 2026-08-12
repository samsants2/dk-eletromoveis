# DK Eletromóveis — Site Vitrine & Catálogo

Site vitrine e catálogo digital da **DK Eletromóveis**, distribuidora de móveis e
eletromóveis novos de fábrica para lojistas. O objetivo é substituir o envio
manual de fotos por WhatsApp por um catálogo público onde o cliente navega,
filtra e fala com um vendedor com a **mensagem já pré-preenchida** (`wa.me`).

Construído com **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, com design
minimalista inspirado no **Material Design 3** e na paleta da marca.

---

## ✅ Pré-requisitos

- **Node.js 18.18+** (recomendado 20 LTS) — <https://nodejs.org>
- **npm** (vem com o Node). Opcionalmente `pnpm` ou `yarn`.

Verifique com:

```bash
node -v
npm -v
```

---

## 🚀 Como rodar em outra máquina

1. Copie/clone esta pasta para o computador.
2. Abra a pasta no **VS Code** (o editor sugere as extensões recomendadas).
3. No terminal, dentro da pasta do projeto, instale as dependências:

   ```bash
   npm install
   ```

4. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra <http://localhost:3000> no navegador.

### Build de produção

```bash
npm run build
npm run start
```

---

## 🗂️ Estrutura do projeto

```
dk-eletromoveis/
├── public/
│   └── produtos/           # fotos reais dos produtos (ver LEIA-ME.txt)
├── src/
│   ├── app/                # rotas (App Router)
│   │   ├── layout.tsx      # layout raiz, header/footer, tema
│   │   ├── page.tsx        # Home
│   │   ├── catalogo/       # listagem + página de produto [id]
│   │   ├── sobre/          # Sobre a empresa
│   │   ├── contato/        # Contato + mapa + formulário
│   │   ├── admin/          # placeholder do CMS (fase futura)
│   │   ├── sitemap.ts      # SEO: sitemap.xml
│   │   ├── robots.ts       # SEO: robots.txt
│   │   └── globals.css     # tokens de tema (claro/escuro) + utilidades
│   ├── components/         # Header, Footer, Hero, Catálogo, Cards, etc.
│   ├── config/site.ts      # ⚙️ dados do site (nome, endereço, navegação)
│   ├── data/
│   │   ├── products.ts     # 📦 catálogo (dados de exemplo)
│   │   └── sellers.ts      # 👤 vendedores + números de WhatsApp
│   └── lib/                # tipos e helper de WhatsApp
├── tailwind.config.ts      # paleta e design tokens
└── package.json
```

---

## 🎨 Paleta da marca

| Token   | Hex       | Uso                                  |
|---------|-----------|--------------------------------------|
| sand    | `#D9B698` | acento quente / detalhes             |
| olive   | `#ABB369` | destaque (primário no tema escuro)   |
| moss    | `#5B7A3A` | secundário                           |
| forest  | `#3E632F` | **primário** (botões, links)         |
| pine    | `#234A29` | gradientes / hover                   |
| ink     | `#182625` | texto / fundo escuro                 |

As cores semânticas (`bg`, `surface`, `primary`, …) são controladas por CSS
variables em `globals.css`, então **tema claro e escuro** funcionam sem duplicar
estilos. O tema respeita a preferência do sistema e pode ser alternado no header.

---

## ✏️ O que ajustar na Fase 0 (com o cliente)

Estes pontos estão marcados como **dados de exemplo** e precisam ser confirmados:

- **`src/config/site.ts`** — nome oficial, endereço real, telefone, e-mail e a
  `mapsQuery` do endereço (usada no mapa embutido).
- **`src/data/sellers.ts`** — nomes e **números de WhatsApp reais** dos vendedores
  (formato `55` + DDD + número, só dígitos).
- **`src/data/products.ts`** — produtos, códigos, especificações e fotos reais.
- **`public/produtos/`** — imagens dos produtos (ver `LEIA-ME.txt`).

---

## 🧩 O que já está pronto (MVP)

- [x] Home com banner, destaques (carrossel) e atalhos de categoria
- [x] Catálogo responsivo com **filtros** (categoria, linha, marca, disponibilidade) e **busca**
- [x] Página de produto com galeria/placeholder, especificações e **CTA de WhatsApp por vendedor**
- [x] Sobre a empresa (missão, visão, valores)
- [x] Contato com formulário validado, mapa e WhatsApp
- [x] Tema claro/escuro, acessibilidade (foco, ARIA, teclado, "pular para o conteúdo")
- [x] SEO básico (metadados, sitemap.xml, robots.txt), fontes do sistema (offline-friendly)
- [x] **Área administrativa** (`/admin`): login, cadastro de produtos, upload de imagens e mídias (ver seção abaixo)

## 🔜 Próximas fases (requer supervisão/decisão humana)

- [ ] **CMS headless** (Payload/Directus/Strapi) para o cliente gerenciar o conteúdo
- [ ] Autenticação real + papéis (admin/editor) + **log de alterações**
- [ ] Banco de dados (PostgreSQL — Supabase/Neon) no lugar dos dados estáticos
- [ ] Envio do formulário por e-mail/CRM (hoje encaminha via WhatsApp)
- [ ] Deploy (Vercel/Netlify), domínio e HTTPS
- [ ] Analytics (Google Analytics) e área de revendedores

---

## 🔐 Área administrativa (`/admin`)

Painel para a equipe gerenciar o conteúdo, acessível em <http://localhost:3000/admin>.

- **Login:** senha única (padrão de desenvolvimento **`dkadmin`**). Configure em
  `.env.local` via `ADMIN_PASSWORD` e `ADMIN_SECRET` (veja `.env.example`).
- **Cadastrar produtos:** formulário com upload de imagem, categoria, linha, marca,
  vendedor do CTA, especificações e flags (disponível / destaque). O produto novo
  aparece imediatamente no catálogo.
- **Editar produtos:** botão **Editar** em cada item carrega o formulário; é possível
  **trocar a imagem** (envie um novo arquivo para substituir) ou removê-la, e alterar
  qualquer campo. Também há **Excluir** com confirmação.
- **Upload de imagens de produto:** salvas em `public/produtos`.
- **Mídias do site:** envio de banners/fotos institucionais para `public/midia`,
  com galeria e botão para copiar o caminho.

**Como os dados são guardados:** os produtos ficam em `content/products.json`
(semeado a partir de `src/data/products.ts` na primeira execução) e as imagens em
`public/`. Isso funciona em `npm run dev` e em um **servidor Node/VPS** (`npm start`).

> ⚠️ **Hospedagem serverless (Vercel/Netlify):** o disco é somente-leitura, então
> uploads e cadastros **não persistem** lá. Para produção nesse modelo, troque o
> armazenamento por um **CMS headless + banco + storage de objetos** (ex.: Payload/
> Directus + Postgres + S3/Cloudinary). A UI do painel já serve de referência do fluxo.
> O login por senha única é uma proteção básica — use autenticação real em produção.

## 🚀 Deploy num host Node (mantém a área admin)

O projeto está pronto para rodar em container (Next em modo `standalone` +
`Dockerfile`). Assim a área administrativa continua funcionando (upload, cadastro
e edição de produtos). Passos:

### 1. Subir o código para o GitHub

```bash
git init
git add .
git commit -m "DK Eletromóveis - site vitrine"
git branch -M main
git remote add origin https://github.com/<seu-usuario>/dk-eletromoveis.git
git push -u origin main
```

### 2a. Render (recomendado — tem `render.yaml`)

1. Crie conta em <https://render.com> e conecte seu GitHub.
2. **New → Blueprint** e aponte para o repositório (ele lê o `render.yaml`).
3. Em **Environment**, defina `ADMIN_PASSWORD` (o `ADMIN_SECRET` é gerado sozinho).
4. Deploy. O Render builda o `Dockerfile` e publica numa URL `*.onrender.com`.

### 2b. Railway — com volume persistente (recomendado p/ manter os dados)

1. <https://railway.app> → **New Project → Deploy from GitHub repo**.
2. O Railway detecta o `Dockerfile` automaticamente e faz o primeiro deploy.
3. Em **Variables**, defina:
   - `ADMIN_PASSWORD` — sua senha do painel.
   - `ADMIN_SECRET` — um valor aleatório longo.
   - `DATA_DIR` — **`/data`** (o mountPath do volume, passo 4).
4. **Crie o volume:** no serviço, aba **Volumes → New Volume**, com **Mount path
   `/data`**. Assim os produtos (`/data/content/products.json`) e as imagens
   (`/data/uploads/...`) **persistem entre deploys**.
5. Em **Settings → Networking**, gere o domínio público.

> Já está tudo preparado no código: quando `DATA_DIR` está definido, o app grava
> os dados e uploads dentro dele, e as imagens são servidas pela rota `/uploads/*`.
> Sem `DATA_DIR`/volume, tudo funciona igual, mas o conteúdo é **efêmero** (some no
> redeploy).

### Persistência — resumo

| Cenário | Uploads/cadastros persistem? |
|---|---|
| Railway/Render **sem** volume (grátis) | ❌ efêmero (some no redeploy) |
| **Railway com volume** em `/data` + `DATA_DIR=/data` | ✅ sim |
| Render **com disco** (plano pago) em `/data` + `DATA_DIR=/data` | ✅ sim |

Alternativa robusta para produção em escala: mover dados para **Postgres**
(Supabase/Neon) e imagens para **storage de objetos** (Cloudinary/S3). Você também
pode versionar um catálogo fixo editando `src/data/products.ts` e colocando fotos
em `public/produtos` (referenciadas como `/produtos/arquivo.jpg`).

## 🔒 Segurança (ler antes do deploy)

O projeto usa **Next.js 14.2.35** (última versão estável da linha 14), que roda e
compila sem problemas. Alguns avisos do `npm audit` permanecem — todos de
**baixo risco real** neste contexto e a resolver **com supervisão humana antes de
produção**:

- **`brace-expansion` (dev)** — vulnerabilidade de DoS em ferramenta de lint.
  Está apenas em `devDependencies` (ESLint) e **não vai para o site publicado**.
  O conserto exige ESLint 10 (breaking); mantivemos ESLint 8, suportado pelo Next 14.
- **Avisos de DoS do Next** (Image Optimizer `remotePatterns` e RSC) — só têm
  correção no **Next 16** (mudança de major: `params` das páginas passa a ser
  assíncrono). Como o site usa `remotePatterns` vazio e roda atrás de Vercel/Netlify,
  a exposição real é baixa.

**Recomendação:** antes de publicar, faça a migração para o Next 16 em uma branch
(`npm install next@latest react@latest react-dom@latest`), ajuste as páginas que
usam `params` para `async`, e valide com `npm run build`. Faça isso com revisão humana.

## 📜 Scripts

| Comando          | Ação                              |
|------------------|-----------------------------------|
| `npm run dev`    | Servidor de desenvolvimento       |
| `npm run build`  | Build de produção                 |
| `npm run start`  | Sobe o build de produção          |
| `npm run lint`   | Verificação de lint (ESLint)      |

---

© DK Distribuidora de Móveis. Projeto de site vitrine — dados de exemplo sujeitos a confirmação.
