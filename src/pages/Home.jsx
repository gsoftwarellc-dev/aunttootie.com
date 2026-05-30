import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Leaf } from 'lucide-react';
import { getFeaturedRecipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import NewsletterForm from '../components/NewsletterForm';
import './Home.css';

export default function Home() {
  const featured = getFeaturedRecipes();

  return (
    <main className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <img src="/photo_6098128823703506924_y.jpg" alt="Garden" className="hero-img" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content container">
          <p className="section-label hero-label">Recipes • Gardening • Community</p>
          <h1 className="hero-title">
            Where the Garden<br />
            <em>Meets the Table</em>
          </h1>
          <p className="hero-sub">
            25 years of cooking. A lifetime of growing. Come break bread with us.
          </p>
          <div className="hero-btns">
            <Link to="/recipes" className="btn btn-primary">Browse Recipes</Link>
            <Link to="/subscribe" className="btn btn-outline-white">Join Premium</Link>
            <Link to="/magazine" className="btn btn-outline-white">Subscribe to Marigold Eleven</Link>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span />
        </div>
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
              <img src="/photo_6098128823703506924_y.jpg" alt="Garden butterflies" className="about-img-main" />
              <img src="/photo_6098128823703506923_y.jpg" alt="Soup and quesadillas" className="about-img-secondary" />
            </div>
            <div className="home-about-text">
              <p className="section-label">Our Story</p>
              <h2>Cooking Is My Love Language</h2>
              <div className="divider" />
              <p>
                I've enjoyed cooking for over 25 years and feeding people is most certainly my love language.
                When I picked up gardening, I had no clue I could love food more — and I surely didn't think my
                life would change as much as it has.
              </p>
              <p>
                Aunt Tootie is a place to celebrate both gardening and great recipes — the intersection of
                two joys and life. If you have an appreciation for food or nature, I hope you find some joy here.
              </p>
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
              <h2 className="premium-banner-title">Break Bread &amp; Grow Together</h2>
              <div className="divider divider-tomato" />
              <p className="premium-banner-desc">
                Join the community for exclusive recipes, monthly digital magazines, gardening guides,
                and seasonal meal plans — all rooted in love of food and nature.
              </p>
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
              <img src="/photo_6098128823703506921_y.jpg" alt="Raspberry rose pastry" />
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
              <h2>The Periodical</h2>
              <p>A digital magazine celebrating food, gardening, and the life they inspire. Seasonal issues, subscriber-exclusive.</p>
              <Link to="/magazine" className="btn btn-secondary">Explore the Magazine</Link>
            </div>
            <div className="magazine-strip-covers">
              <div className="magazine-cover">
                <img src="/photo_6098128823703506921_y.jpg" alt="Issue 1" />
                <div className="magazine-cover-label">
                  <span>Issue 01</span>
                  <span>Spring 2025</span>
                </div>
              </div>
              <div className="magazine-cover">
                <img src="/photo_6098128823703506924_y.jpg" alt="Issue 2" />
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
