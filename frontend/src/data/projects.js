export const PROJECTS = [
  {
    slug: 'portfolio-analytics',
    title: 'Portfólio + Analytics',
    summary:
      'Vitrine profissional + pipeline de métricas (GitHub e eventos do site).',
    description:
      'Um portfólio que também funciona como laboratório: catálogo de projetos, páginas detalhadas e uma camada de insights que combina dados do GitHub com eventos de uso do próprio site.',
    tech: ['React', 'Tailwind', 'Java', 'Postgres', 'ETL'],
    links: {
      repo: 'https://github.com/',
      demo: '#',
    },
    highlights: [
      'Design system leve e consistente (componentes reutilizáveis)',
      'Estrutura preparada para consumir API (fallback para mock)',
      'Base de eventos para analytics (pageviews/cliques)',
    ],
  },
  {
    slug: 'api-crud',
    title: 'API CRUD de Projetos',
    summary: 'Backend para publicar/editar projetos com autenticação e logs.',
    description:
      'Uma API em Java para gerenciar projetos, tags e assets, com autenticação, validação, documentação OpenAPI e pipeline de métricas.',
    tech: ['Java', 'Spring', 'JWT', 'OpenAPI'],
    links: {
      repo: 'https://github.com/',
      demo: '#',
    },
    highlights: [
      'CRUD completo com paginação e filtros',
      'Autenticação e rotas de admin',
      'Logs estruturados e rastreabilidade',
    ],
  },
]

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) ?? null
}

