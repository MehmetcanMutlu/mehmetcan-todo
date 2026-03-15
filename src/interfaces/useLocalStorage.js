import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue, options = {}) {
  const { serialize = JSON.stringify, deserialize = JSON.parse, mapFromStorage } = options

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item === null) {
        return initialValue instanceof Function ? initialValue() : initialValue
      }

      const parsed = deserialize(item)
      return mapFromStorage ? mapFromStorage(parsed) : parsed
    } catch (error) {
      console.error('LocalStorage okunurken hata olustu:', error)
      return initialValue instanceof Function ? initialValue() : initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue((currentValue) => {
        const valueToStore = value instanceof Function ? value(currentValue) : value
        window.localStorage.setItem(key, serialize(valueToStore))
        return valueToStore
      })
    } catch (error) {
      console.error('LocalStorage yazilirken hata olustu:', error)
    }
  }

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== key) return

      try {
        const parsed = event.newValue === null ? initialValue : deserialize(event.newValue)
        setStoredValue(mapFromStorage ? mapFromStorage(parsed) : parsed)
      } catch (error) {
        console.error('Storage eventi parse edilemedi:', error)
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key, initialValue, deserialize, mapFromStorage])

  return [storedValue, setValue]
}
