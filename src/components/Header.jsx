import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Header.css';

const recipeSubcategories = [
  { label: 'All', param: 'All' },
  { label: 'Garden to Table', param: 'Garden to Table' },
  { label: 'Good Eats without Meats', param: 'Good Eats without Meats' },
  { label: 'Brunch Bangers', param: 'Brunch Bangers' },
  { label: 'Dip and Drizzle', param: 'Dip and Drizzle' },
  { label: 'The Sip Section', param: 'The Sip Section' },
  { label: 'Premium Pairings', param: 'Premium Pairings' },
];

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Recipes', to: '/recipes', dropdown: true },
  { label: 'Magazine', to: '/magazine' },
  { label: 'Products', to: '/products' },
  { label: 'Meet the Team', to: '/meet-the-team' },
  { label: 'About', to: '/about' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [recipesOpen, setRecipesOpen] = useState(false);
  const [mobileRecipesOpen, setMobileRecipesOpen] = useState(false);
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
    setRecipesOpen(false);
    setMobileRecipesOpen(false);
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
        <Link to="/" className="header-logo">
          <img src="/logo.png" alt="Aunt Tootie" />
        </Link>

        <nav className="header-nav">
          {navLinks.map(link => link.dropdown ? (
            <div
              key={link.to}
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setRecipesOpen(true)}
              onMouseLeave={() => setRecipesOpen(false)}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) => `nav-link nav-link--dropdown ${isActive ? 'nav-link--active' : ''}`}
              >
                {link.label} <ChevronDown size={13} />
              </NavLink>
              {recipesOpen && (
                <div className="nav-dropdown">
                  {recipeSubcategories.map(sub => (
                    <Link
                      key={sub.param}
                      to={`/recipes?category=${encodeURIComponent(sub.param)}`}
                      className="nav-dropdown-item"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/subscribe" className="btn btn-gold header-subscribe-btn">
            Join Premium
          </Link>
          <button className="header-hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <nav className="mobile-nav">
          {navLinks.map(link => link.dropdown ? (
            <div key={link.to} className="mobile-nav-dropdown">
              <button
                className="mobile-nav-link mobile-nav-link--toggle"
                onClick={() => setMobileRecipesOpen(v => !v)}
              >
                {link.label} <ChevronDown size={14} className={mobileRecipesOpen ? 'chevron-open' : ''} />
              </button>
              {mobileRecipesOpen && (
                <div className="mobile-nav-sub">
                  {recipeSubcategories.map(sub => (
                    <Link
                      key={sub.param}
                      to={`/recipes?category=${encodeURIComponent(sub.param)}`}
                      className="mobile-nav-sub-link"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
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
