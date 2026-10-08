import { useContext } from 'react'
import { LocationContext } from './locationContextValue'

export function useLocationContext() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error('useLocationContext must be used within LocationProvider')
  }

  return context
}
