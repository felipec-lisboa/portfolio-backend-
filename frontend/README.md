# Frontend — Portfólio (React + Vite)

Frontend do portfólio feito em **React (JSX)** com **Tailwind CSS** e rotas com React Router.

## Requisitos

- Node.js 18+ (recomendado 20+)

## Rodar localmente

```bash
cd frontend
npm install
npm run dev
```

Abra no navegador: `http://localhost:5173`

## Build e preview

```bash
cd frontend
npm run build
npm run preview
```

## Lint

```bash
cd frontend
npm run lint
```

## Conteúdo (edite aqui)

- `src/data/profile.js` (nome, email, redes, tagline)
- `src/data/projects.js` (projetos)
- `src/data/skills.js` (skills)
- `src/data/insights.js` (métricas mock)

## API (opcional)

Por padrão, o site funciona com **fallback para mocks**.  
Se você tiver o backend Java rodando, configure a variável `VITE_API_URL`.

1) Copie `example.env` para `.env` (não comitar)
2) Preencha, por exemplo:

```bash
VITE_APP_ENV=dev
VITE_API_URL=http://localhost:8080
```

Ambientes aceitos:

- `VITE_APP_ENV=dev`
- `VITE_APP_ENV=staging`
- `VITE_APP_ENV=prod`

Quando não definido, o app assume `dev`.

### CI/CD e ambientes

No GitHub Actions, configure por ambiente:

- Variables:
  - `VITE_API_URL`
- Secrets (opcional, para deploy automático):
  - `DEV_DEPLOY_WEBHOOK_URL`
  - `PROD_DEPLOY_WEBHOOK_URL`

Sugestão de fluxo:

- `develop` -> deploy de desenvolvimento
- `main` -> deploy de produção

## SEO / Social preview

No `index.html`, os metadados sociais usam URLs padrão:

- `https://seu-dominio.com/`
- `https://seu-dominio.com/og-image.png`

Antes de publicar, troque pelos seus links reais para melhorar preview no LinkedIn/X/WhatsApp.

Endpoints esperados (quando houver backend):

- `GET /api/projects`
- `GET /api/projects/:slug`
- `GET /api/insights`
- `POST /api/contact`

## Dark mode

O tema é salvo em `localStorage` na chave `theme` (`light`/`dark`).
