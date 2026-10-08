import { useEffect, useRef, useState } from 'react'
import type { Coordinates, Place } from '../types'
import {
  loadGoogleMapsLibrary,
  loadGoogleMarkerLibrary,
} from '../services/googleMaps'

interface PlaceMapProps {
  places: Place[]
  origin?: Coordinates | null
  showRoute?: boolean
}

export function PlaceMap({
  places,
  origin,
  showRoute = false,
}: PlaceMapProps) {
  const mapElement = useRef<HTMLDivElement>(null)
  const [mapError, setMapError] = useState('')

  useEffect(() => {
    if (!mapElement.current || (!places.length && !origin)) return
    let active = true
    let map: google.maps.Map | undefined
    let observer: ResizeObserver | undefined

    const renderMap = async () => {
      try {
        const { Map, Circle, Polyline } = await loadGoogleMapsLibrary()
        if (!active || !mapElement.current) return

        const points = places.map(
          (place) => ({ lat: place.lat, lng: place.lng }),
        )
        if (origin) {
          points.push({ lat: origin.latitude, lng: origin.longitude })
        }

        const bounds = new google.maps.LatLngBounds()
        points.forEach((point) => bounds.extend(point))
        const center = origin
          ? { lat: origin.latitude, lng: origin.longitude }
          : points[0]
        map = new Map(mapElement.current, {
          center,
          zoom: 14,
          mapId: import.meta.env.VITE_GOOGLE_MAP_ID || 'DEMO_MAP_ID',
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        })

        const markerLibrary = await loadGoogleMarkerLibrary()
        if (!active) return

        places.forEach((place) => {
          new markerLibrary.AdvancedMarkerElement({
            map,
            position: { lat: place.lat, lng: place.lng },
            title: place.name,
          })
        })

        if (origin) {
          new Circle({
            map,
            center: { lat: origin.latitude, lng: origin.longitude },
            radius: 45,
            fillColor: '#2563eb',
            fillOpacity: 0.9,
            strokeColor: '#ffffff',
            strokeWeight: 3,
          })
        }

        if (showRoute && places.length > 1) {
          new Polyline({
            map,
            path: places.map((place) => ({ lat: place.lat, lng: place.lng })),
            strokeColor: '#f97316',
            strokeOpacity: 0.85,
            strokeWeight: 4,
          })
        }

        const fitMap = () => {
          if (!active || !map || !mapElement.current?.isConnected) return
          if (points.length > 1) {
            map.fitBounds(bounds, 32)
          } else {
            map.setCenter(center)
            map.setZoom(15)
          }
        }

        observer = new ResizeObserver(() => window.requestAnimationFrame(fitMap))
        observer.observe(mapElement.current)
        window.requestAnimationFrame(fitMap)
      } catch (error) {
        if (active) {
          setMapError(
            error instanceof Error
              ? error.message
              : 'Không thể tải Google Maps.',
          )
        }
      }
    }

    setMapError('')
    void renderMap()

    return () => {
      active = false
      observer?.disconnect()
    }
  }, [origin, places, showRoute])

  if (!places.length && !origin) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
        Cho phép vị trí để xem Google Maps quanh bạn.
      </div>
    )
  }

  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
      {mapError ? (
        <div className="flex h-[320px] items-center justify-center p-6 text-center text-sm text-red-700" role="alert">
          {mapError}
        </div>
      ) : (
        <div ref={mapElement} className="h-[320px] w-full" aria-label="Bản đồ Google Maps" />
      )}
    </div>
  )
}
