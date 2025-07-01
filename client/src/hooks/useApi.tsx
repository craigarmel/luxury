import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

interface UseApiOptions {
  immediate?: boolean
  dependencies?: any[]
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuthStore()

  const execute = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiCall()
      setData(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (options.immediate) {
      execute()
    }
  }, [token, ...(options.dependencies || [])])

  return {
    data,
    loading,
    error,
    execute,
    refetch: execute
  }
}