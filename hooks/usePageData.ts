'use client'

import { useEffect, useState, type DependencyList } from 'react'
import { useLoading } from '@/contexts/LoadingContext'

interface PageDataOptions {
  /** Keep the loading screen up if the load fails instead of rendering the page without data. */
  holdOnError?: boolean
}

type Settled<T> = { key: string; data: T | null }

/**
 * Loads a page's data behind the global loading screen (which also hides the
 * header and footer), scrolling to the top whenever a new load starts.
 *
 * `loading` stays true until the load for the current `deps` settles. On failure
 * the error is logged and `data` is null, unless `holdOnError` is set.
 */
export function usePageData<T>(load: () => Promise<T>, deps: DependencyList = [], options: PageDataOptions = {}) {
  const { setLoading } = useLoading()
  const [settled, setSettled] = useState<Settled<T> | null>(null)
  const { holdOnError = false } = options
  const key = JSON.stringify(deps)

  useEffect(() => {
    let mounted = true
    window.scrollTo(0, 0)
    setLoading(true)

    load()
      .then((data) => {
        if (!mounted) return
        setSettled({ key, data })
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load page data', error)
        if (!mounted || holdOnError) return
        setSettled({ key, data: null })
        setLoading(false)
      })

    return () => {
      mounted = false
    }
    // `load` is recreated every render; its inputs are captured by `key`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, holdOnError, setLoading])

  const loading = settled?.key !== key
  return { data: loading ? null : (settled?.data ?? null), loading }
}
