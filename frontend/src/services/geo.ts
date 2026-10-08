import type { Coordinates, Place } from '../types'

export const distanceBetweenCoordinates = (
  origin: Coordinates,
  destination: Pick<Place, 'lat' | 'lng'>,
) => {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180
  const earthRadiusKm = 6371
  const latitudeDelta = toRadians(destination.lat - origin.latitude)
  const longitudeDelta = toRadians(destination.lng - origin.longitude)
  const originLatitude = toRadians(origin.latitude)
  const destinationLatitude = toRadians(destination.lat)
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(originLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDelta / 2) ** 2

  return 2 * earthRadiusKm * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
}
