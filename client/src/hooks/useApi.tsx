import { useState, useEffect, useCallback } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

interface UseApiOptions {
  immediate?: boolean
  dependencies?: unknown[]
}

export function useApi<T>(
  apiCall: (token?: string) => Promise<T>,
  options: UseApiOptions = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const token = useAuthStore((state) => state.token)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiCall(token || undefined)
      setData(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [apiCall, token])

  useEffect(() => {
    if (options.immediate) {
      execute()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, ...(options.dependencies || [])])

  return {
    data,
    loading,
    error,
    execute,
    refetch: execute,
  }
}