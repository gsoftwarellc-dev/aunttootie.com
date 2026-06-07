import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import './MagazinePost.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const SITE = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';

export default function MagazinePost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/magazine/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { setPost(data); setLoading(false); })
      .catch(() => { navigate('/magazine'); });
  }, [slug]);

  if (loading) return (
    <main className="mp-page page-enter">
      <div className="container" style={{ padding: '120px 0', textAlign: 'center', color: 'var(--text-light)' }}>Loading…</div>
    </main>
  );

  if (!post) return null;

  const richBody = (post.body || '').split('src="/').join(`src="${SITE}/`);

  // ── Premium gate ──────────────────────────────────────────────────────────
  if (post.premium) {
    return (
      <main className="mp-page page-enter">
        {post.cover_image && (
          <div className="mp-hero">
            <img src={`${SITE}${post.cover_image}`} alt={post.title} />
            <div className="mp-hero-overlay" />
          </div>
        )}
        <div className="container">
          <div className="mp-back">
            <Link to="/magazine"><ArrowLeft size={16} /> Back to Magazine</Link>
          </div>
          <article className="mp-article">
            <header className="mp-header">
              <p className="mp-date">
                {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                <span className="mp-badge"><Lock size={11} /> Premium</span>
              </p>
              <h1 className="mp-title">{post.title}</h1>
              {post.teaser && <p className="mp-teaser">{post.teaser}</p>}
              <div className="mp-divider" />
            </header>

            <div className="mp-gate">
              <Lock size={40} color="var(--gold)" />
              <h3>This is a Premium Post</h3>
              <p>Unlock the full article by becoming a premium member.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link to="/subscribe" className="btn btn-gold">Get Premium Access</Link>
                <Link to="/magazine" className="btn btn-secondary">Browse Free Posts</Link>
              </div>
            </div>
          </article>
        </div>
      </main>
    );
  }

  // ── Free post ─────────────────────────────────────────────────────────────
  return (
    <main className="mp-page page-enter">
      {post.cover_image && (
        <div className="mp-hero">
          <img src={`${SITE}${post.cover_image}`} alt={post.title} />
          <div className="mp-hero-overlay" />
        </div>
      )}
      <div className="container">
        <div className="mp-back">
          <Link to="/magazine"><ArrowLeft size={16} /> Back to Magazine</Link>
        </div>
        <article className="mp-article">
          <header className="mp-header">
            <p className="mp-date">
              {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              <span className="mp-badge mp-badge--free">Free</span>
            </p>
            <h1 className="mp-title">{post.title}</h1>
            {post.teaser && <p className="mp-teaser">{post.teaser}</p>}
            <div className="mp-divider" />
          </header>

          <div className="mp-body rd-rich-content" dangerouslySetInnerHTML={{ __html: richBody }} />
        </article>
      </div>
    </main>
  );
}
