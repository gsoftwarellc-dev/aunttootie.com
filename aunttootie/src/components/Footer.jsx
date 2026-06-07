import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsletterForm from './NewsletterForm';
import './Footer.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const DEFAULTS = {
  brand: {
    tagline:       'Where the garden meets the table. Recipes, gardening, and the life they inspire.',
    instagram_url: 'https://www.instagram.com/aunttootiestable',
    facebook_url:  'https://www.facebook.com/share/17jTCpbJ9h/',
    tiktok_url:    'https://www.tiktok.com/@ataunttootiestable',
    youtube_url:   'https://youtube.com/@aunttootiestable',
    pinterest_url: 'https://pin.it/1xDE3ziw8',
  },
  connect: {
    contact_email: 'hello@aunttootie.com',
  },
  newsletter: {
    title: 'Stay in the Loop',
    desc:  'Seasonal recipes and garden tips, straight to your inbox.',
  },
  bottom: {
    copyright: 'Aunt Tootie. All rights reserved.',
  },
};

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
);
const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const PinterestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

export default function Footer() {
  const [c, setC] = useState(DEFAULTS);

  useEffect(() => {
    fetch(`${API}/content/footer`)
      .then(r => r.json())
      .then(data => {
        if (data && !data.message) setC(prev => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function onMessage(e) {
      if (e.data?.type === 'PREVIEW_UPDATE') {
        setC(prev => ({ ...prev, ...e.data.content }));
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const socials = [
    { label: 'Instagram', href: c.brand?.instagram_url, Icon: InstagramIcon },
    { label: 'Facebook',  href: c.brand?.facebook_url,  Icon: FacebookIcon  },
    { label: 'TikTok',    href: c.brand?.tiktok_url,    Icon: TikTokIcon    },
    { label: 'YouTube',   href: c.brand?.youtube_url,   Icon: YouTubeIcon   },
    { label: 'Pinterest', href: c.brand?.pinterest_url, Icon: PinterestIcon },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <img src="/logo.png" alt="Aunt Tootie" className="footer-logo" />
          <p className="footer-tagline">{c.brand?.tagline}</p>
          <div className="footer-social">
            {socials.map(({ label, href, Icon }) => href && (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-link">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-nav-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/magazine">Magazine</Link></li>
            <li><Link to="/meet-the-team">Meet the Team</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="footer-nav-col">
          <h4>Connect</h4>
          <ul>
            <li><Link to="/subscribe">Join Premium</Link></li>
            <li><Link to="/magazine">Subscribe to Marigold Eleven</Link></li>
            <li><a href={`mailto:${c.connect?.contact_email}`}>{c.connect?.contact_email}</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>{c.newsletter?.title}</h4>
          <p>{c.newsletter?.desc}</p>
          <NewsletterForm compact />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} {c.bottom?.copyright}</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
