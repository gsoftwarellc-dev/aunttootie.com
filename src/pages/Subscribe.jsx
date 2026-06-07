import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Lock } from 'lucide-react';
import './Subscribe.css';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    tagline: 'Start here',
    color: 'var(--grey)',
    features: [
      'Access to all free recipes',
      'Browse magazine issues 01–02',
      'Public gallery access',
      'Weekly newsletter',
      'Community access',
    ],
    locked: [
      'Premium recipes',
      'Magazine issues 03+',
      'Seasonal meal plans',
      'Gardening guides',
      'Exclusive content',
    ],
    cta: 'Sign Up Free',
    href: '#free-form',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$9',
    period: 'per month',
    tagline: 'Most popular',
    color: 'var(--tomato)',
    features: [
      'Everything in Free',
      'Unlimited premium recipes',
      'All current & future magazine issues',
      'Seasonal meal plans',
      'Monthly gardening guides',
      'Early access to new content',
      'Members-only community',
      'Cancel anytime',
    ],
    locked: [],
    cta: 'Start Premium',
    href: '#premium-form',
    popular: true,
  },
  {
    id: 'annual',
    name: 'Annual',
    price: '$79',
    period: 'per year',
    tagline: 'Best value — save 27%',
    color: 'var(--gold)',
    features: [
      'Everything in Premium',
      'Full archive access',
      'Exclusive annual content bundle',
      'Early registration for classes & events',
      'Priority booking for services',
      'Direct access to Aunt Tootie',
    ],
    locked: [],
    cta: 'Go Annual',
    href: '#annual-form',
    popular: false,
  },
];

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <main className="subscribe-page page-enter">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="/photo_6098128823703506921_y.jpg" alt="Subscribe" />
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content container">
          <p className="section-label page-hero-label">Join the Community</p>
          <h1 className="page-hero-title">Break Bread &amp; Grow Together</h1>
          <p className="page-hero-sub">Unlock the full Aunt Tootie experience — recipes, magazine, guides, and more.</p>
        </div>
      </section>

      {/* Plans */}
      <section className="plans-section section-pad">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 52 }}>
            <p className="section-label">Pricing</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Choose Your Plan</h2>
            <div className="divider divider-center" />
            <p style={{ color: 'var(--text-light)', marginTop: 12 }}>
              Start free or go all-in. Cancel or upgrade anytime.
            </p>
          </div>
          <div className="plans-grid">
            {plans.map(plan => (
              <div
                key={plan.id}
                className={`plan-card ${plan.popular ? 'plan-card--popular' : ''} ${selectedPlan === plan.id ? 'plan-card--selected' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && <div className="plan-popular-badge">Most Popular</div>}
                <div className="plan-header">
                  <p className="plan-tagline">{plan.tagline}</p>
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="plan-amount">{plan.price}</span>
                    <span className="plan-period">/{plan.period}</span>
                  </div>
                </div>
                <div className="plan-features">
                  {plan.features.map(f => (
                    <div key={f} className="plan-feature plan-feature--included">
                      <CheckCircle size={15} />
                      <span>{f}</span>
                    </div>
                  ))}
                  {plan.locked.map(f => (
                    <div key={f} className="plan-feature plan-feature--locked">
                      <Lock size={15} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={plan.href}
                  className={`btn plan-cta ${plan.id === 'free' ? 'btn-secondary' : plan.id === 'annual' ? 'btn-gold' : 'btn-primary'}`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section id="premium-form" className="subscribe-form-section section-pad" style={{ background: 'var(--light-grey)' }}>
        <div className="container-narrow">
          {submitted ? (
            <div className="subscribe-success">
              <CheckCircle size={52} color="var(--gold)" />
              <h2>Welcome to the Community!</h2>
              <p>Thank you for joining. Check your inbox — we've sent you a welcome email with next steps.</p>
              <Link to="/recipes" className="btn btn-primary">
                Explore Recipes <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <p className="section-label">Get Started</p>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>Create Your Account</h2>
                <div className="divider divider-center" />
                <p style={{ color: 'var(--text-medium)', marginTop: 12, fontSize: '0.95rem' }}>
                  Start with your email — we'll handle the rest.
                </p>
              </div>
              <form className="subscribe-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <input type="text" placeholder="First name" className="form-input" />
                  <input type="text" placeholder="Last name" className="form-input" />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
                <div className="plan-selector">
                  {plans.map(plan => (
                    <label
                      key={plan.id}
                      className={`plan-radio ${selectedPlan === plan.id ? 'plan-radio--active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={plan.id}
                        checked={selectedPlan === plan.id}
                        onChange={() => setSelectedPlan(plan.id)}
                      />
                      <span className="plan-radio-name">{plan.name}</span>
                      <span className="plan-radio-price">{plan.price}{plan.id !== 'free' ? `/${plan.id === 'annual' ? 'yr' : 'mo'}` : ''}</span>
                    </label>
                  ))}
                </div>
                <button type="submit" className="btn btn-primary subscribe-submit">
                  Create Account <ArrowRight size={16} />
                </button>
                <p className="form-note">
                  By creating an account you agree to our Terms of Service and Privacy Policy.
                  Premium plans billed monthly or annually. Cancel anytime.
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="subscribe-faq section-pad">
        <div className="container-narrow">
          <h2 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: 40 }}>Common Questions</h2>
          {[
            { q: 'Can I cancel my subscription?', a: 'Yes, anytime. You can cancel from your account settings. You\'ll retain access until the end of your billing period.' },
            { q: 'What does premium include exactly?', a: 'Premium includes unlimited access to all recipes (current and future), all magazine issues, seasonal meal plans, monthly gardening guides, and members-only community.' },
            { q: 'Is there a free trial?', a: 'The free plan gives you ongoing access to free recipes and issues 01–02 of the magazine — no time limit.' },
            { q: 'Can I switch plans?', a: 'Yes, you can upgrade or downgrade at any time from your account dashboard.' },
          ].map(item => (
            <div key={item.q} className="faq-item">
              <h4 className="faq-q">{item.q}</h4>
              <p className="faq-a">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
