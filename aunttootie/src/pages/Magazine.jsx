import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import NewsletterForm from '../components/NewsletterForm';
import './Magazine.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export default function Magazine() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/magazine`)
      .then(r => r.json())
      .then(data => { setPosts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="magazine-page page-enter">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="/photo_6098128823703506924_y.jpg" alt="Magazine" />
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content container">
          <p className="section-label page-hero-label">Marigold Eleven</p>
          <h1 className="page-hero-title">The Periodical</h1>
          <p className="page-hero-sub">Seasonal stories celebrating food, gardening, and the life they inspire.</p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="mag-issues section-pad" style={{ background: 'var(--light-grey)' }}>
        <div className="container">
          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--text-light)', padding: '80px 0' }}>Loading…</p>
          ) : posts.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-light)', padding: '80px 0' }}>No posts yet — check back soon.</p>
          ) : (
            <div className="issues-grid">
              {posts.map(post => (
                <article key={post.id} className={`issue-card ${post.premium ? 'issue-card--premium' : ''}`}>
                  <div className="issue-card-image">
                    {post.cover_image ? (
                      <img src={`${import.meta.env.VITE_SITE_URL || 'http://localhost:5173'}${post.cover_image}`} alt={post.title} loading="lazy" />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'var(--light-grey)' }} />
                    )}
                    {post.premium && (
                      <div className="issue-premium-badge">
                        <Lock size={14} /> Premium
                      </div>
                    )}
                    <div className="issue-season-tag">
                      <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="issue-card-body">
                    <h3 className="issue-title">{post.title}</h3>
                    {post.teaser && <p className="issue-desc">{post.teaser}</p>}
                    {post.premium ? (
                      <Link to="/subscribe" className="btn btn-gold issue-btn">
                        <Lock size={14} /> Unlock Post
                      </Link>
                    ) : (
                      <Link to={`/magazine/${post.slug}`} className="btn btn-dark issue-btn">
                        Read Post <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-pad" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
        <div className="container-narrow">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
