import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SearchPage } from './pages/SearchPage'
import { ItineraryPage } from './pages/ItineraryPage'
import { PlaceDetailPage } from './pages/PlaceDetailPage'
import { LocationProvider } from './contexts/LocationProvider'
import { useLocationContext } from './contexts/useLocationContext'

const navItems = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Ăn gì', to: '/search' },
  { label: 'Lộ trình', to: '/itinerary' },
]

function App() {
  return (
    <BrowserRouter>
      <LocationProvider>
        <div className="min-h-screen bg-slate-100 text-slate-800">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
              <Link to="/" className="text-xl font-black tracking-tight text-slate-900">
                Đi Đâu Ăn Gì
              </Link>

              <nav className="flex items-center gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `rounded-full px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? 'bg-orange-500 text-white'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/itinerary" element={<ItineraryPage />} />
              <Route path="/places/:id" element={<PlaceDetailPage />} />
            </Routes>
          </main>
          <LocationPermissionPrompt />
        </div>
      </LocationProvider>
    </BrowserRouter>
  )
}

function LocationPermissionPrompt() {
  const { promptOpen, locationError, requestLocation, declineLocation } =
    useLocationContext()

  if (!promptOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      role="presentation"
    >
      <section
        aria-labelledby="location-prompt-title"
        aria-describedby="location-prompt-description"
        aria-modal="true"
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
        role="dialog"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
          📍
        </div>
        <h2 id="location-prompt-title" className="text-xl font-bold text-slate-900">
          Tìm địa điểm quanh bạn
        </h2>
        <p id="location-prompt-description" className="mt-2 text-sm leading-6 text-slate-600">
          Cho phép truy cập vị trí để tìm và sắp xếp địa điểm quanh bạn. Khi tìm kiếm,
          tọa độ được gửi đến Google Maps Platform; ứng dụng không gửi vị trí đến máy chủ riêng.
        </p>
        {locationError ? (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {locationError}
          </p>
        ) : null}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={declineLocation}
            className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Không cho phép
          </button>
          <button
            type="button"
            onClick={() => void requestLocation()}
            className="rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400"
          >
            {locationError ? 'Thử lại và cho phép' : 'Cho phép vị trí'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default App
