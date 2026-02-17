# Portfólio — Frontend + Backend (em evolução)

Este repositório vai hospedar meu **portfólio de programação** e uma camada de **dados/analytics** sobre meus projetos (GitHub + eventos do site).

No momento, o **frontend** já está estruturado e funcionando com dados mock.

## Estrutura

- `frontend/`: React (JSX) + Vite + Tailwind, com rotas (Início/Projetos/Insights/Contato)

## Rodar o frontend

```bash
cd frontend
npm install
npm run dev
```

Mais detalhes e configuração de API no `frontend/README.md`.

## Padrão CI/CD (dev e prod)

Pipelines disponíveis em `.github/workflows`:

- `frontend-ci.yml`: validação (lint + build) em PR e push para `main/develop`.
- `frontend-cd-dev.yml`: build/deploy de desenvolvimento para branch `develop` (`environment: development`).
- `frontend-cd-prod.yml`: build/deploy de produção para branch `main` (`environment: production`).

Para diferenciar ambiente dentro do app frontend, use `VITE_APP_ENV` (`dev`, `staging`, `prod`).

## Backend (Java)

Em breve: API CRUD de projetos + ingestão de dados do GitHub + analytics do site.

