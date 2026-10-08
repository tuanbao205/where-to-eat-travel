import type { Coordinates, Place, SearchFilters } from '../types'
import { distanceBetweenCoordinates } from './geo'
import { loadGooglePlacesLibrary } from './googleMaps'

const RESULT_LIMIT = 20
const PLACE_FIELDS = [
  'id',
  'displayName',
  'formattedAddress',
  'shortFormattedAddress',
  'addressComponents',
  'location',
  'rating',
  'priceLevel',
  'photos',
  'attributions',
  'regularOpeningHours',
  'types',
  'googleMapsURI',
]

const normalizePrice = (priceLevel: string | null | undefined) => {
  switch (priceLevel) {
    case 'FREE':
    case 'INEXPENSIVE':
      return 'budget'
    case 'MODERATE':
      return 'mid'
    case 'EXPENSIVE':
      return 'premium'
    case 'VERY_EXPENSIVE':
      return 'very-expensive'
    default:
      return null
  }
}

const categoryFor = (types: string[] | undefined): string => {
  if (types?.includes('cafe')) return 'Cà phê'
  if (types?.includes('restaurant')) return 'Nhà hàng'
  if (types?.includes('museum')) return 'Bảo tàng'
  if (types?.includes('tourist_attraction')) return 'Điểm tham quan'
  if (types?.includes('park')) return 'Công viên'
  if (types?.includes('art_gallery')) return 'Phòng trưng bày'
  if (types?.includes('zoo')) return 'Sở thú'
  if (types?.includes('amusement_park')) return 'Công viên giải trí'
  return 'Địa điểm'
}

const normalizePlace = (
  place: google.maps.places.Place,
  origin?: Coordinates,
): Place | null => {
  const location = place.location
  const latitude = location?.lat()
  const longitude = location?.lng()
  const name = place.displayName

  if (!place.id || !name || latitude === undefined || longitude === undefined) {
    return null
  }

  const district =
    place.addressComponents
      ?.find((component) =>
        component.types.some((type) =>
          ['sublocality_level_1', 'administrative_area_level_2', 'locality'].includes(type),
        ),
      )
      ?.longText ?? 'Không rõ khu vực'
  const photo = place.photos?.[0]
  const typeTags = place.types?.filter(
    (type) => !['point_of_interest', 'establishment'].includes(type),
  ) ?? []
  const openingHours =
    place.regularOpeningHours?.weekdayDescriptions?.join(' · ') ?? null

  return {
    id: `google-${place.id}`,
    name,
    category: categoryFor(place.types),
    district,
    address: place.formattedAddress ?? place.shortFormattedAddress ?? 'Chưa có địa chỉ',
    rating: place.rating ?? null,
    priceRange: normalizePrice(place.priceLevel),
    description: `${categoryFor(place.types)} trên Google Maps.`,
    image: photo?.getURI({ maxWidth: 900, maxHeight: 600 }) ?? null,
    imageAttribution: photo?.authorAttributions?.map((author) => ({
      name: author.displayName,
      url: author.uri,
    })) ?? null,
    providerAttributions: place.attributions?.flatMap((attribution) =>
      attribution.provider
        ? [{ name: attribution.provider, url: attribution.providerURI }]
        : [],
    ) ?? null,
    googleMapsUrl: place.googleMapsURI ?? null,
    lat: latitude,
    lng: longitude,
    distanceKm: origin
      ? distanceBetweenCoordinates(origin, { lat: latitude, lng: longitude })
      : null,
    tags: typeTags,
    openingHours,
  }
}

const createSearchBounds = (origin: Coordinates, radiusKm: number) => {
  const latitudeDelta = radiusKm / 111
  const longitudeDelta =
    radiusKm / (111 * Math.max(Math.cos((origin.latitude * Math.PI) / 180), 0.01))

  return {
    south: origin.latitude - latitudeDelta,
    west: origin.longitude - longitudeDelta,
    north: origin.latitude + latitudeDelta,
    east: origin.longitude + longitudeDelta,
  }
}

const searchGooglePlaces = async (
  filters: SearchFilters,
  origin: Coordinates,
): Promise<google.maps.places.Place[]> => {
  const { Place, SearchNearbyRankPreference, SearchByTextRankPreference } =
    await loadGooglePlacesLibrary()
  const radiusMeters = filters.maxDistanceKm * 1000
  const keyword = filters.keyword.trim()

  if (keyword) {
    const { places } = await Place.searchByText({
      textQuery: keyword,
      fields: PLACE_FIELDS,
      locationRestriction: createSearchBounds(origin, filters.maxDistanceKm),
      maxResultCount: RESULT_LIMIT,
      rankPreference: SearchByTextRankPreference.DISTANCE,
      language: 'vi',
      region: 'VN',
    })
    return places
  }

  const { places } = await Place.searchNearby({
    fields: PLACE_FIELDS,
    includedTypes: [
      'restaurant',
      'cafe',
      'tourist_attraction',
      'museum',
      'art_gallery',
      'amusement_park',
      'zoo',
      'aquarium',
      'park',
    ],
    locationRestriction: {
      center: { lat: origin.latitude, lng: origin.longitude },
      radius: radiusMeters,
    },
    maxResultCount: RESULT_LIMIT,
    rankPreference: SearchNearbyRankPreference.DISTANCE,
    language: 'vi',
    region: 'VN',
  })
  return places
}

export const searchGooglePlacesNearby = async (
  filters: SearchFilters,
): Promise<Place[]> => {
  const origin = filters.origin
  if (!origin) {
    throw new Error('Hãy cho phép truy cập vị trí để tìm địa điểm Google Maps quanh bạn.')
  }

  const sourcePlaces = await searchGooglePlaces(filters, origin)
  return sourcePlaces
    .map((place) => normalizePlace(place, origin))
    .filter((place): place is Place => place !== null)
    .filter(
      (place) =>
        place.distanceKm !== null && place.distanceKm <= filters.maxDistanceKm,
    )
    .sort(
      (a, b) =>
        (a.distanceKm ?? Number.POSITIVE_INFINITY) -
        (b.distanceKm ?? Number.POSITIVE_INFINITY),
    )
}

export const getGooglePlaceById = async (id: string): Promise<Place | undefined> => {
  const placeId = id.startsWith('google-') ? id.slice('google-'.length) : ''
  if (!placeId) return undefined

  const { Place } = await loadGooglePlacesLibrary()
  const place = new Place({ id: placeId })
  await place.fetchFields({ fields: PLACE_FIELDS })

  const location = place.location
  const latitude = location?.lat()
  const longitude = location?.lng()
  if (latitude === undefined || longitude === undefined) return undefined

  return normalizePlace(place) ?? undefined
}
