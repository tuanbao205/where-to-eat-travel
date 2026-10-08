import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { getCurrentLocation } from '../services/location'
import type { Coordinates } from '../types'
import { LocationContext } from './locationContextValue'

const LOCATION_KEY = 'where-to-eat.location'
const LOCATION_PROMPT_KEY = 'where-to-eat.location-prompt'

const readSavedLocation = (): Coordinates | null => {
  const savedLocation = sessionStorage.getItem(LOCATION_KEY)
  if (!savedLocation) return null

  try {
    const coordinates: unknown = JSON.parse(savedLocation)
    if (
      typeof coordinates === 'object' &&
      coordinates !== null &&
      'latitude' in coordinates &&
      'longitude' in coordinates &&
      typeof coordinates.latitude === 'number' &&
      typeof coordinates.longitude === 'number'
    ) {
      return {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      }
    }
  } catch {
    sessionStorage.removeItem(LOCATION_KEY)
  }

  return null
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const [origin, setOrigin] = useState<Coordinates | null>(readSavedLocation)
  const [promptOpen, setPromptOpen] = useState(
    () => sessionStorage.getItem(LOCATION_PROMPT_KEY) !== 'dismissed',
  )
  const [locationError, setLocationError] = useState('')

  const requestLocation = async () => {
    setLocationError('')

    try {
      const coordinates = await getCurrentLocation()
      sessionStorage.setItem(LOCATION_KEY, JSON.stringify(coordinates))
      sessionStorage.setItem(LOCATION_PROMPT_KEY, 'dismissed')
      setOrigin(coordinates)
      setPromptOpen(false)
    } catch (error) {
      setLocationError(
        error instanceof Error ? error.message : 'Không thể lấy vị trí hiện tại.',
      )
    }
  }

  const declineLocation = () => {
    sessionStorage.setItem(LOCATION_PROMPT_KEY, 'dismissed')
    setPromptOpen(false)
  }

  const value = useMemo(
    () => ({ origin, promptOpen, locationError, requestLocation, declineLocation }),
    [origin, promptOpen, locationError],
  )

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}
