import { useEffect, useState } from 'react'
import './Portfolio.css'

const PHOTOS = [
  { id: 1,  src: "/images/11_sunset_rocks.jpg",  title: "Sunset, Montaña de Oro", cat: "landscape", film: "Kodak Gold 200", wide: true, rotation: "left" },
  { id: 2,  src: "/images/05_morro_rock.jpg",     title: "Morro Rock",             cat: "landscape", film: "Kodak Gold 200" },
  { id: 3,  src: "/images/13_golden_hour.jpg",    title: "Golden hour",            cat: "people",    film: "Kodak Gold 200", rotation: "right" },
  { id: 4,  src: "/images/14_coastline.jpg",      title: "Coastline",              cat: "landscape", film: "Kodak Gold 200" },
  { id: 5,  src: "/images/12_sunset_flare.jpg",   title: "Lens flare",             cat: "landscape", film: "Kodak Gold 200" },
  { id: 6,  src: "/images/01_bougainvillea.jpg",  title: "Bougainvillea",          cat: "street",    film: "Kodak Gold 200", vertical: true },
  { id: 7,  src: "/images/07_polyroyale.jpg",     title: "Poly Royale",            cat: "street",    film: "Kodak Gold 200", vertical: true },
  { id: 8,  src: "/images/09_mission.jpg",        title: "Old Mission, 1772",      cat: "street",    film: "Kodak Gold 200", wide: true, rotation: "left" },
  { id: 9,  src: "/images/08_ah_louis.jpg",       title: "Ah Louis Store",         cat: "street",    film: "Kodak Gold 200" },
  { id: 10, src: "/images/06_friends.jpg",        title: "After the show",         cat: "people",    film: "Kodak Gold 200" },
  { id: 11, src: "/images/03_bay_wide.jpg",       title: "Morro Bay",              cat: "landscape", film: "Kodak Gold 200" },
  { id: 12, src: "/images/04_morro_haze.jpg",     title: "Morning haze",           cat: "landscape", film: "Kodak Gold 200" },
  { id: 13, src: "/images/02_beach_walk.jpg",     title: "Beach walk",             cat: "people",    film: "Kodak Gold 200", rotation: "right", vertical: true },
  { id: 14, src: "/images/07_crowd.jpg",          title: "The crowd",              cat: "street",    film: "Kodak Gold 200", vertical: true },
  { id: 15, src: "/images/10_goat.png",           title: "Fair season",            cat: "street",    film: "Kodak Gold 200", vertical: true },
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
            <p className="photo-info">{photo.film} · {photo.cat}</p>
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
      </header>
      <main>
        <div className="port-grid" role="list" aria-label="Photography gallery">
          {filtered.map(photo => <PhotoCard key={photo.id} photo={photo} onSelect={openPhoto} />)}
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
              <p className="viewer-info">{selectedPhoto.film} · {selectedPhoto.cat}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
