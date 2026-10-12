'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AUDIENCE_STORAGE_KEY, resolveAudience, routeAudience, type Audience } from '@/lib/audience'

/**
 * Returns the visitor's audience (recruiter or client) for the current route and
 * remembers it for the session so shared pages (blog, contact) keep the same context.
 */
export function useAudience(): Audience {
  const pathname = usePathname()
  const [audience, setAudience] = useState<Audience>(routeAudience(pathname) ?? 'recruiter')

  useEffect(() => {
    const next = resolveAudience(pathname, window.location.search, sessionStorage.getItem(AUDIENCE_STORAGE_KEY))
    sessionStorage.setItem(AUDIENCE_STORAGE_KEY, next)
    // Deferred so the state update doesn't run synchronously inside the effect
    const timeout = window.setTimeout(() => setAudience(next), 0)
    return () => window.clearTimeout(timeout)
  }, [pathname])

  return audience
}
