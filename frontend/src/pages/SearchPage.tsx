import { useEffect, useMemo, useState } from 'react'
import { PlaceCard } from '../components/PlaceCard'
import { PlaceMap } from '../components/PlaceMap'
import { searchPlaces } from '../services/api'
import { useLocationContext } from '../contexts/useLocationContext'
import type { Place, PriceRange, SearchFilters } from '../types'

const defaultFilters: SearchFilters = {
  keyword: '',
  district: 'Tất cả',
  priceRange: 'all',
  maxDistanceKm: 10,
  sortBy: 'distance',
}

const quickSuggestions = ['Bánh mì', 'Cafe', 'Sushi', 'Giá rẻ', 'Hẹn hò']

export function SearchPage() {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters)
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(false)
  const [searchError, setSearchError] = useState('')
  const { origin, requestLocation } = useLocationContext()
  const displayedPlaces = useMemo(() => {
    const priceOrder: Record<PriceRange, number> = {
      budget: 1,
      mid: 2,
      premium: 3,
      'very-expensive': 4,
    }
    const filtered = places.filter((place) => {
      const districtMatch =
        filters.district === 'Tất cả' || place.district === filters.district
      const priceMatch =
        filters.priceRange === 'all' || place.priceRange === filters.priceRange
      return districtMatch && priceMatch
    })

    switch (filters.sortBy) {
      case 'rating':
        return filtered.sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1))
      case 'price':
        return filtered.sort(
          (a, b) =>
            (a.priceRange ? priceOrder[a.priceRange] : Number.POSITIVE_INFINITY) -
            (b.priceRange ? priceOrder[b.priceRange] : Number.POSITIVE_INFINITY),
        )
      case 'distance':
      default:
        return filtered.sort(
          (a, b) =>
            (a.distanceKm ?? Number.POSITIVE_INFINITY) -
            (b.distanceKm ?? Number.POSITIVE_INFINITY),
        )
    }
  }, [filters.district, filters.priceRange, filters.sortBy, places])
  const districtOptions = useMemo(
    () => [
      'Tất cả',
      ...new Set([
        ...places.map((place) => place.district),
        ...(filters.district === 'Tất cả' ? [] : [filters.district]),
      ]),
    ],
    [filters.district, places],
  )

  const hasActiveFilters = useMemo(
    () =>
      filters.keyword ||
      filters.district !== 'Tất cả' ||
      filters.priceRange !== 'all' ||
      filters.maxDistanceKm !== 10 ||
      filters.sortBy !== 'distance' ||
      Boolean(origin),
    [filters, origin],
  )

  useEffect(() => {
    let active = true

    if (!origin) {
      return
    }

    const timer = window.setTimeout(() => {
      const fetchPlaces = async () => {
        setLoading(true)
        setSearchError('')
        try {
          const result = await searchPlaces({
            ...defaultFilters,
            keyword: filters.keyword,
            maxDistanceKm: filters.maxDistanceKm,
            origin,
          })
          if (active) setPlaces(result)
        } catch (error) {
          if (active) {
            setPlaces([])
            setSearchError(
              error instanceof Error
                ? error.message
                : 'Không thể tải địa điểm. Vui lòng thử lại.',
            )
          }
        } finally {
          if (active) setLoading(false)
        }
      }

      void fetchPlaces()
    }, 500)

    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [filters.keyword, filters.maxDistanceKm, origin])

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-soft">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-500">
              Ăn gì gần đây?
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-800">Tìm địa điểm phù hợp</h2>
          </div>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Đặt lại bộ lọc
            </button>
          ) : null}
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {quickSuggestions.map((suggestion) => {
            const isSelected = filters.keyword.toLowerCase() === suggestion.toLowerCase()

            return (
              <button
                key={suggestion}
                type="button"
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    keyword: suggestion === 'Giá rẻ' || isSelected ? '' : suggestion,
                    district: 'Tất cả',
                    priceRange: suggestion === 'Giá rẻ' && !isSelected ? 'budget' : 'all',
                    maxDistanceKm: 10,
                    sortBy: 'distance',
                  }))
                }
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  isSelected
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
              >
                {suggestion}
              </button>
            )
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-6">
          <label className="space-y-2 lg:col-span-2">
            <span className="text-sm font-medium text-slate-600">Từ khóa / món ăn</span>
            <input
              value={filters.keyword}
              onChange={(event) => setFilters({ ...filters, keyword: event.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-orange-400"
              placeholder="Ví dụ: bánh mì, cà phê, sushi"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600">Khu vực</span>
            <select
              value={filters.district}
              onChange={(event) => setFilters({ ...filters, district: event.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-orange-400"
            >
              {districtOptions.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600">Mức giá tham khảo</span>
            <select
              value={filters.priceRange}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  priceRange: event.target.value as SearchFilters['priceRange'],
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-orange-400"
            >
              <option value="all">Tất cả</option>
              <option value="budget">Giá rẻ</option>
              <option value="mid">Trung bình</option>
              <option value="premium">Cao cấp</option>
              <option value="very-expensive">Rất cao cấp</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600">Phạm vi</span>
            <select
              value={filters.maxDistanceKm}
              disabled={!origin}
              onChange={(event) =>
                setFilters({ ...filters, maxDistanceKm: Number(event.target.value) })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value={3}>3 km</option>
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={15}>15 km</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600">Sắp xếp</span>
            <select
              value={!origin && filters.sortBy === 'distance' ? 'rating' : filters.sortBy}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  sortBy: event.target.value as SearchFilters['sortBy'],
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="distance" disabled={!origin}>Gần nhất</option>
              <option value="rating">Đánh giá</option>
              <option value="price">Giá</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="min-w-0 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Kết quả tìm kiếm</h2>
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
              {origin ? displayedPlaces.length : 0} địa điểm
            </span>
          </div>
          {origin ? (
            <p className="text-xs text-slate-500">
              {`Hiển thị tối đa 20 địa điểm trong phạm vi ${filters.maxDistanceKm} km; khoảng cách tính theo đường chim bay.`}{' '}
              Mức giá là phân loại tham khảo từ Google, không phải giá món cụ thể.{' '}
              Nguồn dữ liệu:{' '}
              <a
                href="https://maps.google.com/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-orange-700 underline"
                translate="no"
              >
                Google Maps
              </a>
            </p>
          ) : null}

          {!origin ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
              <p>Cho phép vị trí để tìm địa điểm Google Maps quanh bạn.</p>
              <button
                type="button"
                onClick={() => void requestLocation()}
                className="mt-4 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
              >
                Dùng vị trí hiện tại
              </button>
            </div>
          ) : loading ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
              Đang tìm địa điểm trên Google Maps…
            </div>
          ) : searchError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700" role="alert">
              {searchError}
            </div>
          ) : displayedPlaces.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {displayedPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
              Không tìm thấy địa điểm phù hợp với bộ lọc hiện tại.
            </div>
          )}
        </div>

        <div className="min-w-0 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Bản đồ địa điểm</h2>
            <p className="mt-1 text-sm text-slate-500">
              {origin
                ?                 'Marker là địa điểm từ Google Places; vòng tròn xanh đánh dấu vị trí của bạn. Mức giá trên thẻ là phân loại tham khảo.'
                : 'Bật quyền vị trí để xem bản đồ tập trung quanh bạn.'}
            </p>
          </div>
          <PlaceMap places={origin ? displayedPlaces : []} origin={origin} />
        </div>
      </div>
    </div>
  )
}
