import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import './Subscribe.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const features = [
  'Unlimited premium recipes',
  'All current & future magazine issues',
  'Seasonal meal plans',
  'Monthly gardening guides',
  'Early access to new content',
  'Members-only community',
  'Cancel anytime',
];

export default function Subscribe() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API}/premium`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Could not connect. Please try again later.');
    }
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

      {/* Plan */}
      <section className="plans-section section-pad">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 52 }}>
            <p className="section-label">Pricing</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Premium Membership</h2>
            <div className="divider divider-center" />
            <p style={{ color: 'var(--text-light)', marginTop: 12 }}>
              Everything you need. One simple plan.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="plan-card plan-card--popular plan-card--selected" style={{ maxWidth: 420, width: '100%' }}>
              <div className="plan-popular-badge">Premium</div>
              <div className="plan-header">
                <p className="plan-tagline">Full access, cancel anytime</p>
                <h3 className="plan-name">Monthly</h3>
                <div className="plan-price">
                  <span className="plan-amount">$9</span>
                  <span className="plan-period">/per month</span>
                </div>
              </div>
              <div className="plan-features">
                {features.map(f => (
                  <div key={f} className="plan-feature plan-feature--included">
                    <CheckCircle size={15} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <a href="#premium-form" className="btn btn-primary plan-cta">
                Get Started
              </a>
            </div>
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
                  <input type="text" placeholder="First name" className="form-input" value={firstName} onChange={e => setFirstName(e.target.value)} />
                  <input type="text" placeholder="Last name" className="form-input" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
                {error && <p style={{ color: '#c0392b', fontSize: '0.875rem' }}>{error}</p>}
                <button type="submit" className="btn btn-primary subscribe-submit">
                  Start Premium — $9/mo <ArrowRight size={16} />
                </button>
                <p className="form-note">
                  By creating an account you agree to our Terms of Service and Privacy Policy.
                  Billed monthly. Cancel anytime.
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
            { q: 'Is there a free trial?', a: 'We don\'t currently offer a free trial, but you can cancel anytime within your first month if it\'s not the right fit.' },
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
