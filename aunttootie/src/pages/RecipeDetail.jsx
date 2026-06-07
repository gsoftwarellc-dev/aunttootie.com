import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getRecipeBySlug, recipes as staticRecipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import './RecipeDetail.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export default function RecipeDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/recipes/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && !data.message) {
          // Parse JSON fields if they come as strings
          const r = {
            ...data,
            ingredients: typeof data.ingredients === 'string' ? JSON.parse(data.ingredients) : (data.ingredients || []),
            tags: typeof data.tags === 'string' ? JSON.parse(data.tags) : (data.tags || []),
          };
          setRecipe(r);
          // Fetch all recipes for related
          fetch(`${API}/recipes`)
            .then(r2 => r2.json())
            .then(all => {
              if (Array.isArray(all)) {
                setRelated(all.filter(x => x.id !== r.id && x.category === r.category).slice(0, 3));
              }
            })
            .catch(() => {});
        } else {
          // Fallback to static data
          const staticRecipe = getRecipeBySlug(slug);
          if (staticRecipe) {
            setRecipe(staticRecipe);
            setRelated(staticRecipes.filter(x => x.id !== staticRecipe.id && x.category === staticRecipe.category).slice(0, 3));
          } else {
            navigate('/recipes');
          }
        }
      })
      .catch(() => {
        const staticRecipe = getRecipeBySlug(slug);
        if (staticRecipe) {
          setRecipe(staticRecipe);
          setRelated(staticRecipes.filter(x => x.id !== staticRecipe.id && x.category === staticRecipe.category).slice(0, 3));
        } else {
          navigate('/recipes');
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="recipe-detail page-enter">
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-light)' }}>Loading…</p>
        </div>
      </main>
    );
  }

  if (!recipe) return null;

  // The rich text body — from admin editor (HTML) or fall back to description string
  const hasRichContent = recipe.description && recipe.description.trim().startsWith('<');
  const richBody = hasRichContent ? recipe.description : null;

  if (recipe.premium) {
    return (
      <main className="recipe-detail page-enter">
        <section className="rd-hero">
          <div className="rd-hero-bg">
            <img src={recipe.image} alt={recipe.title} />
            <div className="rd-hero-overlay" />
          </div>
          <div className="rd-hero-content container">
            <Link to="/recipes" className="rd-back">
              <ArrowLeft size={16} /> All Recipes
            </Link>
            <div className="rd-meta-row">
              <span className="tag tag-premium"><Lock size={10} /> Premium</span>
              <span className="rd-category">{recipe.category}</span>
            </div>
            <h1 className="rd-title">{recipe.title}</h1>
          </div>
        </section>

        <section className="rd-premium-gate section-pad">
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <Lock size={48} color="var(--gold)" />
            <h2 style={{ marginTop: 20 }}>This is a Premium Recipe</h2>
            <div className="divider divider-center" />
            <p style={{ color: 'var(--text-medium)', marginBottom: 32, fontSize: '1rem', lineHeight: 1.7 }}>
              Unlock the full recipe, ingredient list, and step-by-step instructions
              by becoming a premium member.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/subscribe" className="btn btn-gold">Get Premium Access</Link>
              <Link to="/recipes" className="btn btn-secondary">Browse Free Recipes</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="recipe-detail page-enter">
      {/* Hero */}
      <section className="rd-hero">
        <div className="rd-hero-bg">
          <img src={recipe.image} alt={recipe.title} />
          <div className="rd-hero-overlay" />
        </div>
        <div className="rd-hero-content container">
          <Link to="/recipes" className="rd-back">
            <ArrowLeft size={16} /> All Recipes
          </Link>
          <div className="rd-meta-row">
            <span className="tag tag-free">Free</span>
            <span className="rd-category">{recipe.category}</span>
          </div>
          <h1 className="rd-title">{recipe.title}</h1>
        </div>
      </section>

      {/* Body */}
      <div className="rd-body container">
        <div className="rd-main">
          {richBody ? (
            <div
              className="rd-rich-content"
              dangerouslySetInnerHTML={{ __html: richBody }}
            />
          ) : (
            recipe.description && (
              <div className="rd-description">
                <p>{recipe.description}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Related Recipes */}
      {related.length > 0 && (
        <section className="rd-related section-pad">
          <div className="container">
            <h2 className="rd-related-title">You Might Also Like</h2>
            <div className="divider" />
            <div className="rd-related-grid">
              {related.map(r => <RecipeCard key={r.id} recipe={r} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
