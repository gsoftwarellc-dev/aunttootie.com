import { Link } from 'react-router-dom';
import { Share2, Mail } from 'lucide-react';
import NewsletterForm from './NewsletterForm';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <img src="/logo.png" alt="Aunt Tootie" className="footer-logo" />
          <p className="footer-tagline">
            Where the garden meets the table. Recipes, gardening, and the life they inspire.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram" className="social-link">
              <Share2 size={20} />
            </a>
            <a href="mailto:hello@aunttootie.com" aria-label="Email" className="social-link">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="footer-nav-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/magazine">Magazine</Link></li>
            <li><Link to="/garden">Garden</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </div>

        <div className="footer-nav-col">
          <h4>Connect</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/subscribe">Join Premium</Link></li>
            <li><a href="mailto:hello@aunttootie.com">Contact</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Stay in the Loop</h4>
          <p>Seasonal recipes and garden tips, straight to your inbox.</p>
          <NewsletterForm compact />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} Aunt Tootie. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
