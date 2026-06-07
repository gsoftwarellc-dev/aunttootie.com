import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Leaf } from 'lucide-react';
import { getFeaturedRecipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import NewsletterForm from '../components/NewsletterForm';
import './Home.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const DEFAULTS = {
  hero:     { label: 'Recipes • Gardening • Community', title: 'Where the Garden Meets the Table' },
  about:    { label: 'Our Story', title: 'Cooking Is My Love Language', body1: 'I\'ve enjoyed cooking for over 25 years and feeding people is most certainly my love language. When I picked up gardening, I had no clue I could love food more — and I surely didn\'t think my life would change as much as it has.', body2: 'Aunt Tootie is a place to celebrate both gardening and great recipes — the intersection of two joys and life. If you have an appreciation for food or nature, I hope you find some joy here.' },
  premium:  { title: 'Break Bread & Grow Together', desc: 'Join the community for exclusive recipes, monthly digital magazines, gardening guides, and seasonal meal plans — all rooted in love of food and nature.' },
  magazine: { title: 'The Periodical', desc: 'A digital magazine celebrating food, gardening, and the life they inspire. Seasonal issues, subscriber-exclusive.' },
};

export default function Home() {
  const featured = getFeaturedRecipes();
  const [c, setC] = useState(DEFAULTS);

  useEffect(() => {
    fetch(`${API}/content/home`)
      .then(r => r.json())
      .then(data => {
        if (data && !data.message) setC(prev => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

  // Live preview — receive updates from admin panel
  useEffect(() => {
    function onMessage(e) {
      if (e.data?.type === 'PREVIEW_UPDATE') {
        setC(prev => ({ ...prev, ...e.data.content }));
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <main className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <img src={c.hero?.image || '/photo_6098128823703506924_y.jpg'} alt="Garden" className="hero-img" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content container">
          <p className="section-label hero-label">{c.hero?.label}</p>
          <h1 className="hero-title">
            {c.hero?.title?.includes('Meets') ? (
              <>Where the Garden<br /><em>Meets the Table</em></>
            ) : c.hero?.title}
          </h1>
          <div className="hero-btns">
            <Link to="/recipes" className="btn btn-primary">Browse Recipes</Link>
            <Link to="/subscribe" className="btn btn-outline-white">Join Premium</Link>
            <Link to="/magazine" className="btn btn-outline-white">Subscribe to Marigold Eleven</Link>
          </div>
        </div>
        <div className="hero-scroll-hint"><span /></div>
      </section>

      {/* Featured Recipes */}
      <section className="home-recipes section-pad">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Recipes</h2>
            <div className="divider" />
          </div>
          <div className="recipe-grid">
            {featured.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div className="recipes-cta">
            <Link to="/recipes" className="btn btn-secondary">
              View All Recipes <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="home-about">
        <div className="container">
          <div className="home-about-inner">
            <div className="home-about-images">
              <img src={c.about?.image1 || '/photo_6098128823703506924_y.jpg'} alt="Garden butterflies" className="about-img-main" />
              <img src={c.about?.image2 || '/photo_6098128823703506923_y.jpg'} alt="Soup and quesadillas" className="about-img-secondary" />
            </div>
            <div className="home-about-text">
              <p className="section-label">{c.about?.label}</p>
              <h2>{c.about?.title}</h2>
              <div className="divider" />
              <p>{c.about?.body1}</p>
              <p>{c.about?.body2}</p>
              <Link to="/about" className="btn btn-dark">
                Read Our Story <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Teaser */}
      <section className="home-premium section-pad">
        <div className="container">
          <div className="premium-banner">
            <div className="premium-banner-content">
              <p className="section-label" style={{ color: 'var(--gold)' }}>Premium Membership</p>
              <h2 className="premium-banner-title">{c.premium?.title}</h2>
              <div className="divider divider-tomato" />
              <p className="premium-banner-desc">{c.premium?.desc}</p>
              <ul className="premium-features">
                <li><Lock size={14} /> Unlimited premium recipes</li>
                <li><Leaf size={14} /> Monthly gardening guides</li>
                <li><span className="feat-icon">📖</span> Digital magazine issues</li>
                <li><span className="feat-icon">🌿</span> Seasonal meal planning</li>
              </ul>
              <Link to="/subscribe" className="btn btn-gold">
                Get Premium Access <ArrowRight size={16} />
              </Link>
            </div>
            <div className="premium-banner-img">
              <img src={c.premium?.image || '/photo_6098128823703506921_y.jpg'} alt="Raspberry rose pastry" />
            </div>
          </div>
        </div>
      </section>

      {/* Magazine Strip */}
      <section className="home-magazine">
        <div className="container">
          <div className="magazine-strip">
            <div className="magazine-strip-text">
              <p className="section-label">Marigold Eleven</p>
              <h2>{c.magazine?.title}</h2>
              <p>{c.magazine?.desc}</p>
              <Link to="/magazine" className="btn btn-secondary">Explore the Magazine</Link>
            </div>
            <div className="magazine-strip-covers">
              <div className="magazine-cover">
                <img src={c.magazine?.cover1 || '/photo_6098128823703506921_y.jpg'} alt="Issue 1" />
                <div className="magazine-cover-label">
                  <span>Issue 01</span>
                  <span>Spring 2025</span>
                </div>
              </div>
              <div className="magazine-cover">
                <img src={c.magazine?.cover2 || '/photo_6098128823703506924_y.jpg'} alt="Issue 2" />
                <div className="magazine-cover-label">
                  <span>Issue 02</span>
                  <span>Summer 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="home-newsletter section-pad">
        <div className="container-narrow">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
