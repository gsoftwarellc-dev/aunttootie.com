import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { recipes as staticRecipes, categories as staticCategories } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import './Recipes.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export default function Recipes() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [recipes, setRecipes] = useState(staticRecipes);
  const [categories, setCategories] = useState(staticCategories);

  useEffect(() => {
    fetch(`${API}/recipes`).then(r => r.json()).then(data => {
      if (Array.isArray(data)) setRecipes(data);
    }).catch(() => {});
    fetch(`${API}/categories`).then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length) setCategories(['All', ...data.map(c => c.name)]);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = recipes.filter(r => {
    const matchCat = activeCategory === 'All' || r.category === activeCategory;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.teaser.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'free' && !r.premium) || (filter === 'premium' && r.premium);
    return matchCat && matchSearch && matchFilter;
  });

  return (
    <main className="recipes-page page-enter">
      {/* Page Header */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="/photo_6098128823703506923_y.jpg" alt="Recipes" />
          <div className="page-hero-overlay" />
        </div>
        <div className="page-hero-content container">
          <p className="section-label page-hero-label">From the Kitchen</p>
          <h1 className="page-hero-title">Recipes</h1>
          <p className="page-hero-sub">Garden-fresh, soul-satisfying dishes for every occasion.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="recipes-filters-bar">
        <div className="container">
          <div className="filters-inner">
            {/* Search */}
            <div className="recipes-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search recipes…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="filters-divider" />

            {/* Access Filter */}
            <div className="access-filters">
              {['all', 'free', 'premium'].map(f => (
                <button
                  key={f}
                  className={`access-filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? 'All' : f === 'free' ? 'Free' : '★ Premium'}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Grid + Sidebar */}
      <section className="recipes-grid-section section-pad">
        <div className="container recipes-body">
          {/* Left sidebar: categories */}
          <aside className="recipes-sidebar">
            <p className="sidebar-label">Categories</p>
            <ul className="sidebar-cats">
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    className={`sidebar-cat-btn ${activeCategory === cat ? 'sidebar-cat-btn--active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Recipe grid */}
          <div className="recipes-grid-wrap">
            {filtered.length === 0 ? (
              <div className="recipes-empty">
                <p>No recipes found. Try adjusting your search or filters.</p>
              </div>
            ) : (
              <>
                <p className="recipes-count">{filtered.length} recipe{filtered.length !== 1 ? 's' : ''}</p>
                <div className="recipes-grid">
                  {filtered.map((recipe, i) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      size={i === 0 ? 'large' : 'normal'}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
