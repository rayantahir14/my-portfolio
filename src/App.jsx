import { useEffect, useState } from 'react'
import './Portfolio.css'

const PHOTOS = [
  { id: 1,  src: "/images/11_sunset_rocks.jpg",  title: "Sunset, Montaña de Oro", cat: "landscape", film: "Kodak Ultramax", wide: true, rotation: "left" },
  { id: 2,  src: "/images/05_morro_rock.jpg",     title: "Morro Rock",             cat: "landscape", film: "Kodak Ultramax" },
  { id: 3,  src: "/images/13_golden_hour.jpg",    title: "Golden hour",            cat: "people",    film: "Kodak Ultramax", rotation: "right" },
  { id: 4,  src: "/images/14_coastline.jpg",      title: "Coastline",              cat: "landscape", film: "Kodak Ultramax" },
  { id: 5,  src: "/images/12_sunset_flare.jpg",   title: "Lens flare",             cat: "landscape", film: "Kodak Ultramax" },
  { id: 6,  src: "/images/01_bougainvillea.jpg",  title: "Bougainvillea",          cat: "street",    film: "Kodak Ultramax", vertical: true },
  { id: 7,  src: "/images/07_polyroyale.jpg",     title: "Poly Royale",            cat: "street",    film: "Kodak Ultramax", vertical: true },
  { id: 8,  src: "/images/09_mission.jpg",        title: "Old Mission, 1772",      cat: "street",    film: "Kodak Ultramax", wide: true, rotation: "left" },
  { id: 9,  src: "/images/08_ah_louis.jpg",       title: "Ah Louis Store",         cat: "street",    film: "Kodak Ultramax" },
  { id: 10, src: "/images/06_friends.jpg",        title: "After the show",         cat: "people",    film: "Kodak Ultramax" },
  { id: 11, src: "/images/03_bay_wide.jpg",       title: "Morro Bay",              cat: "landscape", film: "Fujicolor Superia X-TRA 400", camera: "Fuji Disposable" },
  { id: 13, src: "/images/02_beach_walk.jpg",     title: "Beach walk",             cat: "people",    film: "Fujicolor Superia X-TRA 400", camera: "Fuji Disposable", rotation: "right", vertical: true },
  { id: 14, src: "/images/07_crowd.jpg",          title: "The crowd",              cat: "street",    film: "Fujicolor Superia X-TRA 400", camera: "Fuji Disposable", vertical: true },
  { id: 15, src: "/images/10_goat.jpg",           title: "Fair season",            cat: "street",    film: "Kodak Ultramax", vertical: true },
  { id: 16, src: "/images/15_theguys.jpg",        title: "The guys",               cat: "people",    film: "Kodak Ultramax", vertical: true },
  { id: 17, src: "/images/16.jpg",               title: "New photo 16",           cat: "street",    film: "Kodak Ultramax", vertical: true },
  { id: 18, src: "/images/17.jpg",               title: "New photo 17",           cat: "street",    film: "Kodak Ultramax", vertical: true },
  { id: 19, src: "/images/18.jpg",               title: "New photo 18",           cat: "street",    film: "Kodak Ultramax", vertical: true },
]

const CATEGORIES = ['all', 'landscape', 'street', 'people']

function PhotoCard({ photo, onSelect }) {
  const [loaded, setLoaded] = useState(false)
  const cls = ['photo-item', photo.wide && 'wide', photo.vertical && 'vertical'].filter(Boolean).join(' ')
  return (
    <div className={cls} role="listitem">
      <button type="button" className="photo-btn" onClick={() => onSelect(photo)} aria-label={`View ${photo.title}`}>
        <div className="photo-inner">
          {!loaded && <div className="photo-skeleton" />}
          <img
            src={photo.src}
            alt={photo.title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}
          />
          <div className="photo-overlay" aria-hidden="true" />
          <div className="photo-meta">
            <p className="photo-title">{photo.title}</p>
            <p className="photo-info">
              {photo.film} · {photo.cat}
            </p>
            <p className="photo-camera">Shot with {photo.camera || '35mm camera'}</p>
          </div>
        </div>
      </button>
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState('all')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') setSelectedPhoto(null)
    }
    if (selectedPhoto) document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhoto])

  const filtered = active === 'all' ? PHOTOS : PHOTOS.filter(p => p.cat === active)
  const priorityOrder = [7, 6, 16]
  const sortedPhotos = [...filtered].sort((a, b) => {
    const aPriority = priorityOrder.indexOf(a.id)
    const bPriority = priorityOrder.indexOf(b.id)
    if (aPriority !== -1 || bPriority !== -1) {
      if (aPriority === -1) return 1
      if (bPriority === -1) return -1
      return aPriority - bPriority
    }
    return (b.vertical ? 1 : 0) - (a.vertical ? 1 : 0)
  })
  const openPhoto = photo => setSelectedPhoto(photo)
  const closePhoto = () => setSelectedPhoto(null)

  return (
    <div className="portfolio">
      <header className="port-header">
        <div>
          <h1 className="port-name">R. Tahir</h1>
          <p className="port-tagline">35mm · San Luis Obispo</p>
        </div>
        <nav className="port-filters" aria-label="Filter by category">
          {CATEGORIES.map(cat => (
            <button key={cat} className={active === cat ? 'filter-btn active' : 'filter-btn'} onClick={() => setActive(cat)} aria-pressed={active === cat}>
              {cat}
            </button>
          ))}
        </nav>
        <a
          href="https://www.instagram.com/rayanshoots_/"
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Rayanshoots Instagram"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3.25A4.75 4.75 0 0 0 7.25 12 4.75 4.75 0 0 0 12 16.75 4.75 4.75 0 0 0 16.75 12 4.75 4.75 0 0 0 12 7.25zm0 1.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5zm4.75-.9a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
        </a>
      </header>
      <main>
        <div className="port-grid" role="list" aria-label="Photography gallery">
          {sortedPhotos.map(photo => <PhotoCard key={photo.id} photo={photo} onSelect={openPhoto} />)}
        </div>
      </main>
      <footer className="port-footer">shot on 35mm film · kodak gold 200 · san luis obispo, ca</footer>

      {selectedPhoto && (
        <div className="photo-viewer" role="dialog" aria-modal="true" onClick={closePhoto}>
          <div className="viewer-shell" onClick={e => e.stopPropagation()}>
            <button type="button" className="viewer-close" onClick={closePhoto} aria-label="Close photo view">
              ×
            </button>
            <img src={selectedPhoto.src} alt={selectedPhoto.title} />
            <div className="viewer-meta">
              <p className="viewer-title">{selectedPhoto.title}</p>
              <p className="viewer-info">
                {selectedPhoto.film} · {selectedPhoto.cat}
              </p>
              <p className="viewer-camera">Shot with {selectedPhoto.camera || '35mm camera'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
