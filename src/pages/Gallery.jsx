import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Gallery.css';

const photos = [
  { id: 1, src: '/photo_6098128823703506918_y.jpg', alt: 'Squash & Beef Enchilada Casserole', caption: 'Squash & Beef Enchilada Casserole', category: 'Kitchen' },
  { id: 2, src: '/photo_6098128823703506920_y.jpg', alt: 'Sausage & Broccolini Pizza', caption: 'Garden Sausage & Broccolini Pizza', category: 'Kitchen' },
  { id: 3, src: '/photo_6098128823703506921_y.jpg', alt: 'Raspberry Rose Pastry', caption: 'Raspberry Rose Pastries', category: 'Baking' },
  { id: 4, src: '/photo_6098128823703506922_y.jpg', alt: 'Squash Ravioli', caption: 'Garden Squash Ravioli in Brown Butter', category: 'Kitchen' },
  { id: 5, src: '/photo_6098128823703506923_y.jpg', alt: 'Tomato Corn Soup', caption: 'Charred Corn Tomato Soup & Quesadillas', category: 'Kitchen' },
  { id: 6, src: '/photo_6098128823703506924_y.jpg', alt: 'Garden butterflies', caption: 'Butterflies in the Summer Garden', category: 'Garden' },
];

const categories = ['All', 'Kitchen', 'Baking', 'Garden'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeCategory === 'All' ? photos : photos.filter(p => p.category === activeCategory);

  const openLightbox = (photo) => {
    setLightbox(photo);
    document.body.classList.add('lock');
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.classList.remove('lock');
  };

  const navLightbox = (dir) => {
    const idx = filtered.findIndex(p => p.id === lightbox.id);
    const next = filtered[(idx + dir + filtered.length) % filtered.length];
    setLightbox(next);
  };

  return (
    <main className="gallery-page page-enter">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="/photo_6098128823703506924_y.jpg" alt="Gallery" />
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content container">
          <p className="section-label page-hero-label">Visual Stories</p>
          <h1 className="page-hero-title">Gallery</h1>
          <p className="page-hero-sub">A collection of moments from the kitchen and the garden.</p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="gallery-filters">
        <div className="container">
          <div className="gallery-filter-btns">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-btn ${activeCategory === cat ? 'cat-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="gallery-grid-section section-pad">
        <div className="container">
          <div className="gallery-grid">
            {filtered.map((photo, i) => (
              <div
                key={photo.id}
                className={`gallery-item ${i % 5 === 0 ? 'gallery-item--wide' : ''}`}
                onClick={() => openLightbox(photo)}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <div className="gallery-item-overlay">
                  <p className="gallery-item-caption">{photo.caption}</p>
                  <span className="gallery-item-cat">{photo.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}><X size={28} /></button>
          <button className="lightbox-nav lightbox-nav--prev" onClick={e => { e.stopPropagation(); navLightbox(-1); }}>
            <ChevronLeft size={32} />
          </button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} />
            <p className="lightbox-caption">{lightbox.caption}</p>
          </div>
          <button className="lightbox-nav lightbox-nav--next" onClick={e => { e.stopPropagation(); navLightbox(1); }}>
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </main>
  );
}
