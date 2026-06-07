import { Link } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import NewsletterForm from '../components/NewsletterForm';
import './Magazine.css';

const issues = [
  {
    id: 1,
    number: '01',
    season: 'Spring',
    year: '2025',
    title: 'New Beginnings',
    description: 'The season of seeds and fresh starts. Spring recipes from the first garden harvest, plus planting guides for beginners.',
    image: '/photo_6098128823703506921_y.jpg',
    premium: false,
    topics: ['Spring Planting Guide', 'Early Harvest Recipes', 'Seed Starting Tips', 'Garden Layout Planning'],
  },
  {
    id: 2,
    number: '02',
    season: 'Summer',
    year: '2025',
    title: 'Peak Season',
    description: 'Peak growing season means peak flavor. Everything tomatoes, corn, squash and the recipes that celebrate them.',
    image: '/photo_6098128823703506924_y.jpg',
    premium: false,
    topics: ['Tomato Season Recipes', 'Preserving the Harvest', 'Summer Entertaining', 'Herb Garden Guide'],
  },
  {
    id: 3,
    number: '03',
    season: 'Autumn',
    year: '2025',
    title: 'The Harvest Table',
    description: 'Slow-cooked comfort, root vegetables, and the art of putting up summer\'s bounty before the cold arrives.',
    image: '/photo_6098128823703506922_y.jpg',
    premium: true,
    topics: ['Root Vegetable Recipes', 'Canning & Preserving', 'Fall Entertaining', 'Cover Crop Guide'],
  },
  {
    id: 4,
    number: '04',
    season: 'Winter',
    year: '2025',
    title: 'Rest & Restore',
    description: 'The garden sleeps but the kitchen doesn\'t. Hearty warming recipes and a guide to winter garden planning.',
    image: '/photo_6098128823703506918_y.jpg',
    premium: true,
    topics: ['Hearty Winter Meals', 'Indoor Growing', 'Garden Planning for Spring', 'Seed Catalogs & Selection'],
  },
];

export default function Magazine() {
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
          <p className="page-hero-sub">Seasonal issues celebrating food, gardening, and the life they inspire.</p>
        </div>
      </section>

      {/* About the Magazine */}
      <section className="mag-about section-pad">
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <p className="section-label">About the Magazine</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: 12 }}>
            Marigold Eleven
          </h2>
          <div className="divider divider-center" />
          <p style={{ color: 'var(--text-medium)', lineHeight: 1.8, fontSize: '1rem', marginBottom: 32 }}>
            Marigold Eleven is a digital periodical published four times a year. Each seasonal issue
            brings together the best recipes from the garden, gardening guides, and stories about the
            intersection of food, nature, and life. Issues 01–02 are free for all readers.
            Issues 03 and beyond are premium subscriber exclusives.
          </p>
          <Link to="/subscribe" className="btn btn-gold">
            Subscribe for Full Access <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Issues Grid */}
      <section className="mag-issues section-pad" style={{ background: 'var(--light-grey)' }}>
        <div className="container">
          <p className="section-label" style={{ textAlign: 'center' }}>All Issues</p>
          <h2 className="mag-issues-title">Browse the Archives</h2>
          <div className="divider divider-center" style={{ margin: '12px auto 48px' }} />
          <div className="issues-grid">
            {issues.map(issue => (
              <article key={issue.id} className={`issue-card ${issue.premium ? 'issue-card--premium' : ''}`}>
                <div className="issue-card-image">
                  <img src={issue.image} alt={`Issue ${issue.number}`} loading="lazy" />
                  {issue.premium && (
                    <div className="issue-premium-badge">
                      <Lock size={14} /> Premium
                    </div>
                  )}
                  <div className="issue-season-tag">
                    <span>{issue.season} {issue.year}</span>
                  </div>
                </div>
                <div className="issue-card-body">
                  <div className="issue-number">Issue {issue.number}</div>
                  <h3 className="issue-title">{issue.title}</h3>
                  <p className="issue-desc">{issue.description}</p>
                  <ul className="issue-topics">
                    {issue.topics.map(t => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  {issue.premium ? (
                    <Link to="/subscribe" className="btn btn-gold issue-btn">
                      <Lock size={14} /> Unlock Issue
                    </Link>
                  ) : (
                    <button className="btn btn-dark issue-btn">
                      Read Issue {issue.number}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
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
