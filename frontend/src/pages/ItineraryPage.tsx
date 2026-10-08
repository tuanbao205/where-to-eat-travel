import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PlaceMap } from '../components/PlaceMap'
import { placeCatalog } from '../data/mockData'
import { generateItinerary } from '../services/api'
import type { ItineraryResult, TripType } from '../types'

export function ItineraryPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(['banh-mi-26', 'sushi-zone'])
  const [travelHours, setTravelHours] = useState(6)
  const [tripType, setTripType] = useState<TripType>('foodie')
  const [result, setResult] = useState<ItineraryResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const selectedPlaces = useMemo(
    () => placeCatalog.filter((place) => selectedIds.includes(place.id)),
    [selectedIds],
  )

  const tripTypeLabel: Record<TripType, string> = {
    foodie: 'Ăn uống',
    cultural: 'Văn hóa',
    relax: 'Thư giãn',
    family: 'Gia đình',
  }

  const summary = result ?? {
    id: 'draft-itinerary',
    title: 'Lộ trình đang chờ chọn điểm',
    totalDistanceKm: Number(
      selectedPlaces
        .reduce((sum, place) => sum + (place.distanceKm ?? 0), 0)
        .toFixed(1),
    ),
    totalDurationMinutes: Math.max(60, Math.round((travelHours * 60 * selectedPlaces.length) / 2)),
    stops: selectedPlaces,
  }

  const mapPlaces = summary.stops.length ? summary.stops : selectedPlaces

  const timeline = summary.stops.map((stop, index) => {
    const offset = 25 + index * 20
    const etaText = `${offset} phút`
    const priceHint = stop.priceRange === null
      ? 'Chưa có thông tin giá'
      : stop.priceRange === 'budget'
        ? 'Tiết kiệm'
        : stop.priceRange === 'mid'
          ? 'Vừa phải'
          : stop.priceRange === 'premium'
            ? 'Cao cấp'
            : 'Rất cao cấp'

    return {
      ...stop,
      etaText,
      priceHint,
    }
  })

  const handleToggle = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const handleGenerate = async () => {
    if (!selectedIds.length) return

    setSaved(false)
    setLoading(true)
    const generated = await generateItinerary(selectedIds, travelHours, tripType)
    setResult(generated)
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-soft">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-500">
              Lộ trình của bạn
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-800">Tạo kế hoạch đi ăn</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
              {tripTypeLabel[tripType]}
            </span>
            <button
              type="button"
              onClick={() => setSaved((current) => !current)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                saved
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {saved ? 'Đã lưu' : 'Lưu lộ trình'}
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600">Thời gian chuyến đi</span>
            <select
              value={travelHours}
              onChange={(event) => setTravelHours(Number(event.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-orange-400"
            >
              <option value={3}>3 giờ</option>
              <option value={6}>6 giờ</option>
              <option value={8}>8 giờ</option>
              <option value={12}>12 giờ</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600">Kiểu chuyến đi</span>
            <select
              value={tripType}
              onChange={(event) => setTripType(event.target.value as TripType)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-orange-400"
            >
              <option value="foodie">Ăn uống</option>
              <option value="cultural">Văn hóa</option>
              <option value="relax">Thư giãn</option>
              <option value="family">Gia đình</option>
            </select>
          </label>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!selectedIds.length || loading}
              className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? 'Đang tạo...' : 'Tạo lộ trình'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Chọn điểm đến</h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-600">
              {selectedIds.length} đã chọn
            </span>
          </div>

          <div className="space-y-3">
            {placeCatalog.map((place) => (
              <label
                key={place.id}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-3 transition ${
                  selectedIds.includes(place.id)
                    ? 'border-orange-300 bg-orange-50'
                    : 'border-slate-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(place.id)}
                    onChange={() => handleToggle(place.id)}
                    className="h-4 w-4 accent-orange-500"
                  />
                  <div>
                    <p className="font-semibold text-slate-800">{place.name}</p>
                    <p className="text-sm text-slate-500">{place.district}</p>
                  </div>
                </div>
                <span className="text-sm text-slate-500">
                  {place.rating === null ? 'Chưa có đánh giá' : `⭐ ${place.rating}`}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-slate-800">Tổng quan lộ trình</h2>
              <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-orange-700">
                {summary.stops.length} điểm
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Khoảng cách</p>
                <p className="mt-2 text-2xl font-black text-slate-800">{summary.totalDistanceKm} km</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Thời gian</p>
                <p className="mt-2 text-2xl font-black text-slate-800">{summary.totalDurationMinutes} m</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Phù hợp</p>
                <p className="mt-2 text-lg font-black text-slate-800">
                  {tripType === 'foodie' ? 'Đặt món' : tripType === 'family' ? 'Gia đình' : tripType === 'relax' ? 'Thoải mái' : 'Khám phá'}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm text-orange-800">
              <span className="font-semibold">Gợi ý:</span> Lộ trình này chọn các địa điểm có điểm giao nhau tốt nhất theo{' '}
              {tripTypeLabel[tripType].toLowerCase()} và giữ khoảng cách di chuyển hợp lý cho một buổi đi ngắn.
            </div>

            <div className="mt-6 space-y-3">
              {timeline.map((stop, index) => (
                <div
                  key={stop.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-800">{stop.name}</p>
                      <p className="text-sm text-slate-500">
                        {stop.district} • {stop.priceHint}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-700">{stop.etaText}</p>
                    <Link
                      to={`/places/${stop.id}`}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-500"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Bản đồ lộ trình</h2>
              <span className="text-sm text-slate-500">{summary.title}</span>
            </div>
            <PlaceMap places={mapPlaces} showRoute />
          </div>
        </div>
      </div>
    </div>
  )
}
