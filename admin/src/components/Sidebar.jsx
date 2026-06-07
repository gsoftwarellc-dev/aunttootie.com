import { NavLink, useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const recipesActive = location.pathname.startsWith('/recipes') || location.pathname.startsWith('/categories');

  function logout() {
    localStorage.removeItem('admin_token');
    navigate('/login');
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Aunt Tootie</h2>
        <p>Admin Panel</p>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>📊  Dashboard</NavLink>
        <NavLink to="/premium" className={({ isActive }) => isActive ? 'active' : ''}>⭐  Premium Members</NavLink>
        <NavLink to="/subscribers" className={({ isActive }) => isActive ? 'active' : ''}>✉️  Subscribers</NavLink>

        {/* Recipes + sub-items */}
        <NavLink to="/recipes" className={({ isActive }) => isActive || recipesActive ? 'active' : ''}>🍴  Recipes</NavLink>
        <div className="sidebar-sub">
          <NavLink to="/categories" className={({ isActive }) => isActive ? 'active' : ''}>🏷️  Categories</NavLink>
        </div>

        <NavLink to="/magazine" className={({ isActive }) => isActive ? 'active' : ''}>📰  Magazine</NavLink>
        <NavLink to="/pages" className={({ isActive }) => isActive ? 'active' : ''}>✏️  Page Editor</NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>💰  Price</NavLink>
      </nav>
      <div className="sidebar-footer">
        <button onClick={logout}>Sign out</button>
      </div>
    </aside>
  );
}
