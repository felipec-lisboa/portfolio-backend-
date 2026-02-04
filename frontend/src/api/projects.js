import { getProjectBySlug, PROJECTS } from '../data/projects'
import { apiRequest } from './client'

export async function listProjects() {
  try {
    const data = await apiRequest('/api/projects')
    return Array.isArray(data) ? data : PROJECTS
  } catch {
    return PROJECTS
  }
}

export async function getProject(slug) {
  if (!slug) return null
  try {
    const data = await apiRequest(`/api/projects/${encodeURIComponent(slug)}`)
    return data ?? null
  } catch {
    return getProjectBySlug(slug)
  }
}

