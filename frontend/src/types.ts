export type PriceRange = 'budget' | 'mid' | 'premium' | 'very-expensive'
export type TripType = 'foodie' | 'cultural' | 'relax' | 'family'
export type SortMode = 'distance' | 'rating' | 'price'

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface Place {
  id: string
  name: string
  category: string
  district: string
  address: string
  rating: number | null
  priceRange: PriceRange | null
  description: string
  image: string | null
  imageAttribution?: Array<{ name: string; url: string | null }> | null
  providerAttributions?: Array<{ name: string; url: string | null }> | null
  googleMapsUrl?: string | null
  lat: number
  lng: number
  distanceKm: number | null
  tags: string[]
  openingHours: string | null
}

export interface SearchFilters {
  keyword: string
  district: string
  priceRange: PriceRange | 'all'
  maxDistanceKm: number
  sortBy: SortMode
  origin?: Coordinates
}

export interface ItineraryResult {
  id: string
  title: string
  totalDistanceKm: number
  totalDurationMinutes: number
  stops: Place[]
}
