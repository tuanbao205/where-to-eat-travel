import { Link } from 'react-router-dom'
import { placeCatalog } from '../data/mockData'
import { PlaceCard } from '../components/PlaceCard'

const quickFilters = ['Bữa sáng', 'Cà phê', 'Ăn tối', 'Điểm check-in']

export function HomePage() {
  const featured = placeCatalog.slice(0, 3)

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-orange-600 p-8 text-white shadow-soft md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-orange-100">
              Travel recommendation
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                Đi đâu, ăn gì <span className="text-orange-300">vừa nhanh, vừa hợp túi tiền</span>
              </h1>
              <p className="max-w-xl text-base text-slate-200 md:text-lg">
                Khám phá món ăn gần bạn, tìm điểm đến phù hợp và lên kế hoạch đi chơi theo lộ trình tối ưu.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/search"
                className="rounded-full bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400"
              >
                Ăn gì gần đây?
              </Link>
              <Link
                to="/itinerary"
                className="rounded-full border border-white/30 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Lên lộ trình
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="rounded-2xl bg-slate-950/40 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-200">Top 3 hôm nay</p>
              <div className="mt-5 space-y-4">
                {featured.map((place) => (
                  <div key={place.id} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                    {place.image ? (
                      <img src={place.image} alt={place.name} className="h-14 w-14 rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/10" aria-hidden="true">
                        📍
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-white">{place.name}</p>
                      <p className="text-sm text-slate-300">{place.district}</p>
                    </div>
                    <span className="text-sm font-medium text-orange-300">
                      {place.rating === null ? '—' : `⭐ ${place.rating}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Tìm kiếm nhanh</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {quickFilters.map((item) => (
            <button
              key={item}
              type="button"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-orange-300 hover:text-orange-600"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Địa điểm nổi bật</h2>
          <Link to="/search" className="text-sm font-semibold text-orange-600 hover:text-orange-500">
            Xem tất cả →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </div>
  )
}
