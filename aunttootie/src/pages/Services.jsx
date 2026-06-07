import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import NewsletterForm from '../components/NewsletterForm';
import './Services.css';

const services = [
  {
    id: 'cooking-classes',
    icon: '👩‍🍳',
    title: 'Cooking Classes',
    subtitle: 'In-Person & Virtual',
    description: 'Join intimate cooking sessions that focus on seasonal, garden-to-table cooking. Learn techniques, flavor pairings, and how to let fresh ingredients shine.',
    features: [
      'Small group (max 8 participants)',
      'Seasonal menu focused on garden ingredients',
      'All ingredients and materials included',
      'Recipe booklet to take home',
      'Virtual option available',
    ],
    price: 'From $85 per session',
    cta: 'Book a Class',
  },
  {
    id: 'menu-planning',
    icon: '📋',
    title: 'Seasonal Menu Planning',
    subtitle: 'Personalized & Practical',
    description: 'Let Aunt Tootie build you a personalized seasonal meal plan rooted in what\'s fresh, what\'s growing, and what your family loves.',
    features: [
      'Custom 4-week seasonal meal plan',
      'Weekly shopping lists',
      'Prep-ahead strategies',
      'Dietary preferences honored',
      'Follow-up support session',
    ],
    price: 'From $150 per plan',
    cta: 'Start a Plan',
  },
  {
    id: 'garden-consulting',
    icon: '🌱',
    title: 'Garden Consulting',
    subtitle: 'From Seed to Harvest',
    description: 'New to gardening or ready to expand? Get personalized guidance on planning, planting, and maintaining a productive kitchen garden.',
    features: [
      'Garden assessment & layout planning',
      'Seasonal planting schedule',
      'Soil & compost guidance',
      'Ongoing growing season check-ins',
      'In-person or virtual sessions available',
    ],
    price: 'From $120 per consultation',
    cta: 'Schedule a Consult',
  },
  {
    id: 'private-events',
    icon: '🥂',
    title: 'Private Dining & Events',
    subtitle: 'Intimate & Memorable',
    description: 'Host a memorable dinner, celebration, or retreat with Aunt Tootie\'s garden-inspired cuisine. From intimate dinners to private events.',
    features: [
      'Custom seasonal menu design',
      'Full cooking and service',
      'Menu tasting session included',
      'Farm-to-table sourcing',
      'Accommodates dietary needs',
    ],
    price: 'Custom pricing',
    cta: 'Request a Quote',
  },
];

export default function Services() {
  return (
    <main className="services-page page-enter">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="/photo_6098128823703506923_y.jpg" alt="Services" />
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content container">
          <p className="section-label page-hero-label">Work With Aunt Tootie</p>
          <h1 className="page-hero-title">Services</h1>
          <p className="page-hero-sub">Cooking classes, menu planning, garden consulting, and private events.</p>
        </div>
      </section>

      {/* Intro */}
      <section className="services-intro section-pad">
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <p className="section-label">Let's Work Together</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: 12 }}>
            Bringing the Garden to Your Table
          </h2>
          <div className="divider divider-center" />
          <p style={{ color: 'var(--text-medium)', lineHeight: 1.8, fontSize: '1rem' }}>
            Whether you want to learn to cook with fresh garden ingredients, need a seasonal meal plan,
            or are looking for a memorable private dining experience — Aunt Tootie offers hands-on,
            heartfelt services rooted in 25 years of cooking and gardening.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section section-pad" style={{ background: 'var(--light-grey)', paddingTop: 0 }}>
        <div className="container">
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <div className="service-body">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-subtitle">{service.subtitle}</p>
                  <p className="service-desc">{service.description}</p>
                  <ul className="service-features">
                    {service.features.map(f => (
                      <li key={f}><CheckCircle size={15} /> {f}</li>
                    ))}
                  </ul>
                  <div className="service-footer">
                    <span className="service-price">{service.price}</span>
                    <Link to="/contact" className="btn btn-primary service-cta">
                      {service.cta} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="services-contact section-pad">
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <p className="section-label">Get in Touch</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: 12 }}>
            Not Sure Where to Start?
          </h2>
          <div className="divider divider-center" />
          <p style={{ color: 'var(--text-medium)', marginBottom: 32, lineHeight: 1.8 }}>
            Reach out and let's talk about what you're looking for. Every collaboration starts with a conversation.
          </p>
          <a href="mailto:hello@aunttootie.com" className="btn btn-dark">
            hello@aunttootie.com <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--light-grey)', borderTop: '1px solid var(--border)' }}>
        <div className="container-narrow">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
