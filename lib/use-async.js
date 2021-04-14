import { useCallback, useEffect, useMemo, useState } from 'react'

export const useAsync = promise => {
  const [isLoading, setLoading] = useState(true)
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)

  const loadData = useCallback(() =>
    promise()
      .then(response => {
        setValue(response)
        setError(null)
      })
      .catch(error => setError(error?.name || error))
      .finally(() => setLoading(false))
  )

  useEffect(() => {
    setLoading(true)
    setValue(null)
    setError(null)
    loadData()
  }, [])

  return {
    data: value,
    isLoading,
    error,
    reload: loadData
  }
}
