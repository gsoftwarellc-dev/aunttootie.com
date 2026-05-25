import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import NewsletterForm from '../components/NewsletterForm';
import './About.css';

export default function About() {
  return (
    <main className="about-page page-enter">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="/photo_6098128823703506924_y.jpg" alt="Garden" />
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content container">
          <p className="section-label page-hero-label">Our Story</p>
          <h1 className="page-hero-title">About Aunt Tootie</h1>
          <p className="page-hero-sub">25 years of cooking. A love affair with the garden.</p>
        </div>
      </section>

      {/* Main Story */}
      <section className="about-story section-pad">
        <div className="container">
          <div className="about-story-inner">
            <div className="about-story-images">
              <img src="/photo_6098128823703506924_y.jpg" alt="Garden" className="about-story-img-main" />
              <img src="/photo_6098128823703506923_y.jpg" alt="Cooking" className="about-story-img-secondary" />
            </div>
            <div className="about-story-text">
              <p className="section-label">The Beginning</p>
              <h2>Cooking Is My Love Language</h2>
              <div className="divider" />
              <div className="about-paragraphs">
                <p>
                  I've enjoyed cooking for over 25 years and feeding people is most certainly my love language.
                  Creating a meal and then breaking bread with others is intimate for me and it's one of my
                  favorite ways to connect.
                </p>
                <p>
                  For those that enjoy cooking as much as I do, you understand the importance of sourcing
                  and experimenting with great ingredients. When I picked up gardening, I had no clue I could
                  love food more and I surely didn't think my life would change as much as it has. Yet here we are.
                </p>
                <p>
                  For me, gardening has been similar to meeting someone that feels so familiar it's like they've
                  been a part of your life forever — all of a sudden you don't remember life without them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="about-quote">
        <div className="container-narrow">
          <blockquote className="pull-quote">
            <p>
              "Marigold Eleven is a place to celebrate both gardening and great recipes.
              Furthermore, it's about the intersection of these two joys and life."
            </p>
            <cite>— Aunt Tootie</cite>
          </blockquote>
        </div>
      </section>

      {/* More Story */}
      <section className="about-more section-pad">
        <div className="container">
          <div className="about-more-grid">
            <div className="about-more-text">
              <p className="section-label">The Philosophy</p>
              <h2>Balance, Intention &amp; Peace</h2>
              <div className="divider" />
              <div className="about-paragraphs">
                <p>
                  Aunt Tootie is a place to celebrate both gardening and great recipes. Furthermore,
                  it's about the intersection of these two joys and life. If you have an appreciation
                  for food or nature, I hope you find some joy in this periodical.
                </p>
                <p>
                  Perhaps you'll be inspired to try some recipes or plant a seed. If you already share
                  the love I have for the two, I hope this feels like a comfortable community space for you.
                </p>
                <p>
                  Gardening and cooking both constantly remind me of the importance of balance, intention,
                  and peace. These have become core principles in my life. Non-negotiables at times!
                </p>
                <p>
                  I want to discuss that along with some recipes and gardening tips I learn along the way.
                  If that resonates with you — let's break bread and grow together.
                </p>
              </div>
            </div>
            <div className="about-values">
              {[
                { icon: '🌱', title: 'Grow Your Own', body: 'Growing your own food transforms how you cook and eat. Even one pot of herbs changes everything.' },
                { icon: '🍽️', title: 'Feed with Love', body: 'Every meal is an opportunity to connect. Breaking bread together is one of life\'s great intimacies.' },
                { icon: '⚖️', title: 'Balance & Intention', body: 'Both the garden and kitchen teach us patience, presence, and the rewards of showing up consistently.' },
                { icon: '🤝', title: 'Community', body: 'This space is for everyone who loves good food and good growing. Let\'s learn and share together.' },
              ].map(v => (
                <div key={v.title} className="about-value-card">
                  <span className="about-value-icon">{v.icon}</span>
                  <h4>{v.title}</h4>
                  <p>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Garden Photo Full Bleed */}
      <section className="about-garden-photo">
        <img src="/photo_6098128823703506924_y.jpg" alt="Summer garden" />
        <div className="about-garden-photo-overlay">
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'var(--white)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: 16 }}>
              Ready to Grow Together?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 32, fontSize: '1.05rem' }}>
              Join the community for recipes, garden guides, and the seasonal magazine.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/subscribe" className="btn btn-gold">Join Premium</Link>
              <Link to="/recipes" className="btn btn-outline-white">Browse Recipes</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-pad" style={{ background: 'var(--light-grey)', borderTop: '1px solid var(--border)' }}>
        <div className="container-narrow">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
