import { createContext } from 'react'
import type { Coordinates } from '../types'

export interface LocationContextValue {
  origin: Coordinates | null
  promptOpen: boolean
  locationError: string
  requestLocation: () => Promise<void>
  declineLocation: () => void
}

export const LocationContext = createContext<LocationContextValue | null>(null)
