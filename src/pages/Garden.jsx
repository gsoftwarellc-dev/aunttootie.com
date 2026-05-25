import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import './Garden.css';

const gardenPosts = [
  {
    id: 1,
    title: 'Starting Your First Kitchen Garden',
    excerpt: 'Everything you need to know about planning, planting, and maintaining a productive kitchen garden — even in small spaces.',
    image: '/photo_6098128823703506924_y.jpg',
    category: 'Beginners',
    readTime: '8 min read',
    premium: false,
  },
  {
    id: 2,
    title: 'Growing Tomatoes for the Kitchen',
    excerpt: 'Varieties, planting tips, and how to get peak flavor from your garden tomatoes — and the recipes that make them shine.',
    image: '/photo_6098128823703506923_y.jpg',
    category: 'Vegetables',
    readTime: '10 min read',
    premium: false,
  },
  {
    id: 3,
    title: 'Squash: The Garden Workhorse',
    excerpt: 'Summer and winter squash are some of the most versatile garden vegetables. Here\'s how to grow, harvest, and cook with them all season.',
    image: '/photo_6098128823703506918_y.jpg',
    category: 'Vegetables',
    readTime: '7 min read',
    premium: true,
  },
  {
    id: 4,
    title: 'Companion Planting Guide',
    excerpt: 'Which plants thrive together and which don\'t. A practical guide to planning a companion-planted kitchen garden.',
    image: '/photo_6098128823703506924_y.jpg',
    category: 'Planning',
    readTime: '12 min read',
    premium: true,
  },
];

export default function Garden() {
  return (
    <main className="garden-page page-enter">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="/photo_6098128823703506924_y.jpg" alt="Garden" />
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content container">
          <p className="section-label page-hero-label">From the Ground Up</p>
          <h1 className="page-hero-title">The Garden</h1>
          <p className="page-hero-sub">Guides, tips, and stories from the kitchen garden.</p>
        </div>
      </section>

      {/* Intro */}
      <section className="garden-intro section-pad">
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <p className="section-label">Growing Together</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: 12 }}>
            The Garden That Started It All
          </h2>
          <div className="divider divider-center" />
          <p style={{ color: 'var(--text-medium)', lineHeight: 1.8 }}>
            When I picked up gardening, I had no clue I could love food more. The garden has been
            transformative — it changed how I cook, how I eat, and how I experience the seasons.
            These guides are everything I've learned along the way.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="garden-posts section-pad" style={{ background: 'var(--light-grey)', paddingTop: 0 }}>
        <div className="container">
          <div className="garden-grid">
            {gardenPosts.map(post => (
              <article key={post.id} className="garden-card">
                <div className="garden-card-image">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  {post.premium && (
                    <div className="garden-premium-badge">
                      <Lock size={12} /> Premium
                    </div>
                  )}
                </div>
                <div className="garden-card-body">
                  <div className="garden-card-meta">
                    <span className="garden-cat">{post.category}</span>
                    <span className="garden-time">{post.readTime}</span>
                  </div>
                  <h3 className="garden-card-title">{post.title}</h3>
                  <p className="garden-card-excerpt">{post.excerpt}</p>
                  {post.premium ? (
                    <Link to="/subscribe" className="garden-read-link">
                      <Lock size={13} /> Unlock Guide <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <button className="garden-read-link">
                      Read Guide <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="garden-premium-cta section-pad">
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <Lock size={36} color="var(--gold)" />
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: 16, marginBottom: 12 }}>
            Unlock All Garden Guides
          </h2>
          <div className="divider divider-center" />
          <p style={{ color: 'var(--text-medium)', marginBottom: 32, lineHeight: 1.8 }}>
            Premium members get access to all gardening guides, seasonal planting calendars,
            companion planting charts, and new guides added each season.
          </p>
          <Link to="/subscribe" className="btn btn-gold">
            Get Premium Access <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
