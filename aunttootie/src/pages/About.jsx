import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import NewsletterForm from '../components/NewsletterForm';
import './About.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const DEFAULTS = {
  hero:       { label: 'Our Story', title: 'About Aunt Tootie', subtitle: '25 years of cooking. A love affair with the garden.' },
  story:      { label: 'The Beginning', title: 'Cooking Is My Love Language', body1: 'I\'ve enjoyed cooking for over 25 years and feeding people is most certainly my love language. Creating a meal and then breaking bread with others is intimate for me and it\'s one of my favorite ways to connect.', body2: 'For those that enjoy cooking as much as I do, you understand the importance of sourcing and experimenting with great ingredients. When I picked up gardening, I had no clue I could love food more and I surely didn\'t think my life would change as much as it has. Yet here we are.', body3: 'For me, gardening has been similar to meeting someone that feels so familiar it\'s like they\'ve been a part of your life forever — all of a sudden you don\'t remember life without them.' },
  quote:      { text: 'Marigold Eleven is a place to celebrate both gardening and great recipes. Furthermore, it\'s about the intersection of these two joys and life.' },
  philosophy: { label: 'The Philosophy', title: 'Balance, Intention & Peace', body1: 'Aunt Tootie is a place to celebrate both gardening and great recipes. Furthermore, it\'s about the intersection of these two joys and life. If you have an appreciation for food or nature, I hope you find some joy in this periodical.', body2: 'Perhaps you\'ll be inspired to try some recipes or plant a seed. If you already share the love I have for the two, I hope this feels like a comfortable community space for you.', body3: 'Gardening and cooking both constantly remind me of the importance of balance, intention, and peace. These have become core principles in my life. Non-negotiables at times!', body4: 'I want to discuss that along with some recipes and gardening tips I learn along the way. If that resonates with you — let\'s break bread and grow together.' },
  values:     { card1_icon: '🌱', card1_title: 'Grow Your Own', card1_body: 'Growing your own food transforms how you cook and eat. Even one pot of herbs changes everything.', card2_icon: '🍽️', card2_title: 'Feed with Love', card2_body: 'Every meal is an opportunity to connect. Breaking bread together is one of life\'s great intimacies.', card3_icon: '⚖️', card3_title: 'Balance & Intention', card3_body: 'Both the garden and kitchen teach us patience, presence, and the rewards of showing up consistently.', card4_icon: '🤝', card4_title: 'Community', card4_body: 'This space is for everyone who loves good food and good growing. Let\'s learn and share together.' },
  cta:        { title: 'Ready to Grow Together?', desc: 'Join the community for recipes, garden guides, and the seasonal magazine.' },
};

export default function About() {
  const [c, setC] = useState(DEFAULTS);

  useEffect(() => {
    fetch(`${API}/content/about`)
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
    <main className="about-page page-enter">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src={c.hero?.image || '/photo_6098128823703506924_y.jpg'} alt="Garden" />
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content container">
          <p className="section-label page-hero-label">{c.hero?.label}</p>
          <h1 className="page-hero-title">{c.hero?.title}</h1>
          <p className="page-hero-sub">{c.hero?.subtitle}</p>
        </div>
      </section>

      {/* Main Story */}
      <section className="about-story section-pad">
        <div className="container">
          <div className="about-story-inner">
            <div className="about-story-images">
              <img src={c.story?.image1 || '/photo_6098128823703506924_y.jpg'} alt="Garden" className="about-story-img-main" />
              <img src={c.story?.image2 || '/photo_6098128823703506923_y.jpg'} alt="Cooking" className="about-story-img-secondary" />
            </div>
            <div className="about-story-text">
              <p className="section-label">{c.story?.label}</p>
              <h2>{c.story?.title}</h2>
              <div className="divider" />
              <div className="about-paragraphs">
                <p>{c.story?.body1}</p>
                <p>{c.story?.body2}</p>
                <p>{c.story?.body3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="about-quote">
        <div className="container-narrow">
          <blockquote className="pull-quote">
            <p>"{c.quote?.text}"</p>
            <cite>— Aunt Tootie</cite>
          </blockquote>
        </div>
      </section>

      {/* Philosophy */}
      <section className="about-more section-pad">
        <div className="container">
          <div className="about-more-grid">
            <div className="about-more-text">
              <p className="section-label">{c.philosophy?.label}</p>
              <h2>{c.philosophy?.title}</h2>
              <div className="divider" />
              <div className="about-paragraphs">
                <p>{c.philosophy?.body1}</p>
                <p>{c.philosophy?.body2}</p>
                <p>{c.philosophy?.body3}</p>
                <p>{c.philosophy?.body4}</p>
              </div>
            </div>
            <div className="about-values">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="about-value-card">
                  <span className="about-value-icon">{c.values?.[`card${n}_icon`]}</span>
                  <h4>{c.values?.[`card${n}_title`]}</h4>
                  <p>{c.values?.[`card${n}_body`]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Garden Photo Full Bleed */}
      <section className="about-garden-photo">
        <img src={c.cta?.image || '/photo_6098128823703506924_y.jpg'} alt="Summer garden" />
        <div className="about-garden-photo-overlay">
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'var(--white)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: 16 }}>
              {c.cta?.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 32, fontSize: '1.05rem' }}>
              {c.cta?.desc}
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
