import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Header.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Recipes', to: '/recipes' },
  { label: 'Magazine', to: '/magazine' },
  { label: 'Garden', to: '/garden' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Meet the Team', to: '/meet-the-team' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.classList.remove('lock');
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(v => {
      document.body.classList.toggle('lock', !v);
      return !v;
    });
  };

  const headerClass = [
    'site-header',
    isHome && !scrolled ? 'site-header--transparent' : 'site-header--solid',
    scrolled ? 'site-header--scrolled' : '',
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClass}>
      <div className="header-inner container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src="/logo.png" alt="Aunt Tootie" />
        </Link>

        {/* Desktop Nav */}
        <nav className="header-nav">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="header-actions">
          <Link to="/subscribe" className="btn btn-gold header-subscribe-btn">
            Join Premium
          </Link>
          <button className="header-hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <nav className="mobile-nav">
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} className="mobile-nav-link">
              {link.label}
            </NavLink>
          ))}
          <Link to="/subscribe" className="btn btn-gold mobile-subscribe-btn">
            Join Premium
          </Link>
        </nav>
      </div>

      {menuOpen && <div className="mobile-overlay" onClick={toggleMenu} />}
    </header>
  );
}
