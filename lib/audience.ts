export type Audience = 'recruiter' | 'client'

export const AUDIENCE_STORAGE_KEY = 'portfolioAudience'

const CLIENT_ROUTES = ['/client', '/services', '/work', '/about']

export function parseAudience(value: string | null | undefined): Audience | null {
  return value === 'client' || value === 'recruiter' ? value : null
}

export function audienceHome(audience: Audience): string {
  return audience === 'client' ? '/client' : '/'
}

export function withAudience(path: string, audience: Audience): string {
  const separator = path.includes('?') ? '&' : '?'
  return `${path}${separator}audience=${audience}`
}

/** Route-implied audience: `/` is recruiter, client-only pages are client, shared pages have none. */
export function routeAudience(pathname: string): Audience | null {
  if (pathname === '/') return 'recruiter'
  return CLIENT_ROUTES.some((route) => pathname.startsWith(route)) ? 'client' : null
}

/**
 * Resolves the active audience in priority order:
 * `?audience=` / `?source=` query → route → last stored audience → recruiter.
 */
export function resolveAudience(pathname: string, search: string, stored: string | null): Audience {
  const params = new URLSearchParams(search)
  return (
    parseAudience(params.get('audience')) ||
    parseAudience(params.get('source')) ||
    routeAudience(pathname) ||
    parseAudience(stored) ||
    'recruiter'
  )
}
