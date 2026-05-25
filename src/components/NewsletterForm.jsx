import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import './NewsletterForm.css';

export default function NewsletterForm({ compact = false }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="newsletter-success">
        <CheckCircle size={40} color="var(--gold)" />
        <h3>You're in!</h3>
        <p>Welcome to the Aunt Tootie community. Check your inbox for a welcome note.</p>
      </div>
    );
  }

  return (
    <div className={`newsletter-wrap ${compact ? 'newsletter-wrap--compact' : ''}`}>
      {!compact && (
        <>
          <p className="section-label" style={{ textAlign: 'center' }}>Stay Connected</p>
          <h2 className="newsletter-title">Join the Community</h2>
          <div className="divider divider-center" />
          <p className="newsletter-desc">
            Get seasonal recipes, gardening tips, and early access to magazine issues — delivered
            straight to your inbox. No spam, ever. Just good food and good growing.
          </p>
        </>
      )}
      {compact && <p className="newsletter-compact-label">Get recipes in your inbox</p>}
      <form className="newsletter-form" onSubmit={handleSubmit}>
        {!compact && (
          <input
            type="text"
            placeholder="Your first name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="newsletter-input"
          />
        )}
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="newsletter-input"
          required
        />
        <button type="submit" className="btn btn-tomato newsletter-submit">
          <Send size={15} />
          {compact ? 'Subscribe' : 'Subscribe Free'}
        </button>
      </form>
      <p className="newsletter-note">
        By subscribing you agree to receive emails from Aunt Tootie. Unsubscribe anytime.
      </p>
    </div>
  );
}
