import { INSIGHTS_MOCK } from '../data/insights'
import { apiRequest } from './client'

export async function getInsights() {
  try {
    const data = await apiRequest('/api/insights')
    return data ?? INSIGHTS_MOCK
  } catch {
    return INSIGHTS_MOCK
  }
}

