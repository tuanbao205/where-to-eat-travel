import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PlaceMap } from '../components/PlaceMap'
import { getPlaceById } from '../services/api'
import type { Place } from '../types'

export function PlaceDetailPage() {
  const { id } = useParams()
  const [detail, setDetail] = useState<{
    id: string
    place: Place | null
    error: string
  } | null>(null)
  const loading = !detail || detail.id !== id
  const place = detail && detail.id === id ? detail.place : null
  const error = detail && detail.id === id ? detail.error : ''

  useEffect(() => {
    if (!id) return
    let active = true

    void getPlaceById(id)
      .then((result) => {
        if (active) setDetail({ id, place: result ?? null, error: '' })
      })
      .catch((loadError: unknown) => {
        if (active) {
          setDetail({
            id,
            place: null,
            error: loadError instanceof Error
              ? loadError.message
              : 'Không thể tải thông tin địa điểm.',
          })
        }
      })

    return () => {
      active = false
    }
  }, [id])

  if (loading) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
        Đang tải thông tin địa điểm...
      </div>
    )
  }

  if (error || !place) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
        {error || 'Không tìm thấy địa điểm này.'}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl bg-white shadow-soft">
        {place.image ? (
          <div className="relative">
            <img src={place.image} alt={place.name} className="h-80 w-full object-cover" />
            {place.imageAttribution?.length ? (
              <p className="absolute bottom-3 right-3 rounded bg-slate-950/70 px-2 py-1 text-xs text-white">
                Ảnh:{' '}
                {place.imageAttribution.map((author, index) => (
                  <span key={`${author.name}-${index}`}>
                    {index > 0 ? ', ' : null}
                    {author.url ? (
                      <a
                        href={author.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        {author.name}
                      </a>
                    ) : author.name}
                  </span>
                ))}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="flex h-48 items-center justify-center bg-gradient-to-br from-orange-100 to-amber-50 text-6xl" aria-hidden="true">
            📍
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">{place.category}</p>
              <h1 className="mt-2 text-3xl font-black text-slate-800">{place.name}</h1>
            </div>
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
              {place.rating === null ? 'Chưa có đánh giá' : `⭐ ${place.rating}`}
            </span>
          </div>

          <p className="text-base text-slate-600">{place.description}</p>
          {place.providerAttributions?.length ? (
            <p className="text-xs text-slate-500">
              Nguồn dữ liệu:{' '}
              {place.providerAttributions.map((attribution, index) => (
                <span key={`${attribution.name}-${index}`}>
                  {index > 0 ? ', ' : null}
                  {attribution.url ? (
                    <a
                      href={attribution.url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      {attribution.name}
                    </a>
                  ) : attribution.name}
                </span>
              ))}
            </p>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Khu vực</p>
              <p className="mt-2 font-semibold text-slate-800">{place.district}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Mức giá tham khảo</p>
              <p className="mt-2 font-semibold text-slate-800">
                {place.priceRange === null
                  ? 'Chưa có thông tin'
                  : place.priceRange === 'budget'
                    ? 'Giá rẻ'
                    : place.priceRange === 'mid'
                      ? 'Trung bình'
                      : place.priceRange === 'premium'
                        ? 'Cao cấp'
                        : 'Rất cao cấp'}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Khoảng cách</p>
              <p className="mt-2 font-semibold text-slate-800">
                {place.distanceKm === null ? 'Chưa xác định' : `${place.distanceKm.toFixed(1)} km`}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Giờ mở cửa</p>
              <p className="mt-2 font-semibold text-slate-800">{place.openingHours ?? 'Chưa có thông tin'}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {place.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <aside className="space-y-6 rounded-3xl bg-white p-6 shadow-soft">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Địa chỉ</p>
            <p className="mt-2 text-base font-medium text-slate-800">{place.address}</p>
          </div>

          <div className="space-y-3">
            <a
              href={place.googleMapsUrl ?? `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(place.id.replace(/^google-/, ''))}`}
              target="_blank"
              rel="noreferrer"
              className="block w-full rounded-full bg-orange-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-orange-400"
            >
              Chỉ đường
            </a>
            <Link
              to="/itinerary"
              className="block w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-center font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-600"
            >
              Thêm vào lộ trình
            </Link>
          </div>
        </aside>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-soft">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">Vị trí trên bản đồ</h2>
        <PlaceMap places={[place]} />
      </div>
    </div>
  )
}
