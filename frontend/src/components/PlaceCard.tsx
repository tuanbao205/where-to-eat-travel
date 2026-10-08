import { Link } from 'react-router-dom'
import type { Place, PriceRange } from '../types'

const priceLabel: Record<PriceRange, string> = {
  budget: 'Giá rẻ',
  mid: 'Trung bình',
  premium: 'Cao cấp',
  'very-expensive': 'Rất cao cấp',
}

export function PlaceCard({ place }: { place: Place }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        {place.image ? (
          <>
            <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
            {place.imageAttribution?.length ? (
              <span className="absolute bottom-2 right-2 max-w-[90%] rounded bg-slate-950/70 px-2 py-1 text-[10px] text-white">
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
              </span>
            ) : null}
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-orange-100 to-amber-50 text-5xl" aria-hidden="true">
            📍
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-800">
          {place.category}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-800">{place.name}</h3>
            <p className="text-sm text-slate-500">{place.district}</p>
          </div>
          <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700">
            {place.rating === null ? 'Chưa có đánh giá' : `⭐ ${place.rating}`}
          </span>
        </div>

        <p className="text-sm text-slate-600">{place.description}</p>
        {place.providerAttributions?.length ? (
          <p className="text-xs text-slate-500">
            Nguồn:{' '}
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

        <div className="flex flex-wrap gap-2 text-xs text-slate-600">
          <span className="rounded-full bg-slate-100 px-2 py-1">
            {place.priceRange ? priceLabel[place.priceRange] : 'Chưa có dữ liệu giá'}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-1">
            {place.distanceKm === null ? 'Chưa xác định khoảng cách' : `${place.distanceKm.toFixed(1)} km`}
          </span>
          {place.openingHours ? (
            <span className="rounded-full bg-slate-100 px-2 py-1">{place.openingHours}</span>
          ) : null}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-slate-500">
            {place.tags.slice(0, 2).map((tag) => `#${tag}`).join(' ')}
          </div>
          <Link
            to={`/places/${place.id}`}
            className="rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Xem chi tiết
          </Link>
        </div>
        <p className="text-right text-[10px] text-slate-400" translate="no">
          Google Maps
        </p>
      </div>
    </article>
  )
}
