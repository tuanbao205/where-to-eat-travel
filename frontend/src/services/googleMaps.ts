import { importLibrary, setOptions } from '@googlemaps/js-api-loader'

let optionsConfigured = false

const configureGoogleMaps = () => {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim()
  if (!key) {
    throw new Error(
      'Thiếu VITE_GOOGLE_MAPS_API_KEY. Hãy tạo frontend/.env.local theo hướng dẫn trong README.md.',
    )
  }

  if (!optionsConfigured) {
    setOptions({ key, v: 'weekly', language: 'vi', region: 'VN' })
    optionsConfigured = true
  }
}

export const loadGoogleMapsLibrary = async () => {
  configureGoogleMaps()
  return importLibrary('maps')
}

export const loadGooglePlacesLibrary = async () => {
  configureGoogleMaps()
  return importLibrary('places')
}

export const loadGoogleMarkerLibrary = async () => {
  configureGoogleMaps()
  return importLibrary('marker')
}
