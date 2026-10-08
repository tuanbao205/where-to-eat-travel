import { placeCatalog } from '../data/mockData'
import type { ItineraryResult, Place, TripType } from '../types'
import { searchGooglePlacesNearby, getGooglePlaceById } from './googlePlaces'

const wait = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms))

export const searchPlaces = searchGooglePlacesNearby

export const getPlaceById = async (id: string): Promise<Place | undefined> => {
  if (id.startsWith('google-')) return getGooglePlaceById(id)

  await wait(200)
  return placeCatalog.find((place) => place.id === id)
}

export const generateItinerary = async (
  selectedIds: string[],
  travelHours: number,
  tripType: TripType,
): Promise<ItineraryResult> => {
  await wait(300)

  const selectedPlaces = placeCatalog.filter((place) => selectedIds.includes(place.id))

  const orderedStops = [...selectedPlaces].sort((a, b) => {
    if (tripType === 'foodie') {
      return (b.rating ?? -1) - (a.rating ?? -1)
    }

    return (a.distanceKm ?? Number.POSITIVE_INFINITY) - (b.distanceKm ?? Number.POSITIVE_INFINITY)
  })

  const totalDistanceKm = orderedStops.reduce(
    (sum, place) => sum + (place.distanceKm ?? 0),
    0,
  )
  const totalDurationMinutes = Math.max(
    60,
    Math.round((travelHours * 60 * totalDistanceKm) / 10),
  )

  return {
    id: 'itinerary-1',
    title: 'Lộ trình khám phá theo tiêu chí ' + tripType,
    totalDistanceKm: Number(totalDistanceKm.toFixed(1)),
    totalDurationMinutes,
    stops: orderedStops,
  }
}
