import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, Users, ChefHat, ArrowLeft, Lock, Leaf, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { getRecipeBySlug, recipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import './RecipeDetail.css';

export default function RecipeDetail() {
  const { slug } = useParams();
  const recipe = getRecipeBySlug(slug);
  const [checkedSteps, setCheckedSteps] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState({});

  if (!recipe) return <Navigate to="/recipes" />;

  const related = recipes.filter(r => r.id !== recipe.id && r.category === recipe.category).slice(0, 3);

  const toggleStep = (i) => setCheckedSteps(s => ({ ...s, [i]: !s[i] }));
  const toggleIngredient = (key) => setCheckedIngredients(s => ({ ...s, [key]: !s[key] }));

  if (recipe.premium) {
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
              <span className="tag tag-premium"><Lock size={10} /> Premium</span>
              <span className="rd-category">{recipe.category}</span>
            </div>
            <h1 className="rd-title">{recipe.title}</h1>
            <div className="rd-quick-facts">
              <span><Clock size={15} /> {recipe.time}</span>
              <span><Users size={15} /> Serves {recipe.serves}</span>
              <span><ChefHat size={15} /> {recipe.difficulty}</span>
            </div>
          </div>
        </section>

        {/* Premium Gate */}
        <section className="rd-premium-gate section-pad">
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <Lock size={48} color="var(--gold)" />
            <h2 style={{ marginTop: 20 }}>This is a Premium Recipe</h2>
            <div className="divider divider-center" />
            <p style={{ color: 'var(--text-medium)', marginBottom: 32, fontSize: '1rem', lineHeight: 1.7 }}>
              {recipe.teaser} — Unlock the full recipe, ingredient list, and step-by-step instructions
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
          <div className="rd-quick-facts">
            <span><Clock size={15} /> {recipe.time}</span>
            <span><Users size={15} /> Serves {recipe.serves}</span>
            <span><ChefHat size={15} /> {recipe.difficulty}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="rd-body container">
        <div className="rd-layout">
          {/* Main Column */}
          <div className="rd-main">
            {/* Description */}
            <div className="rd-description">
              <p>{recipe.description}</p>
            </div>

            {/* Steps */}
            <div className="rd-steps">
              <h2 className="rd-section-title">How to Make It</h2>
              <div className="divider" />
              <ol className="steps-list">
                {recipe.steps.map((step, i) => (
                  <li
                    key={i}
                    className={`step-item ${checkedSteps[i] ? 'step-item--done' : ''}`}
                    onClick={() => toggleStep(i)}
                  >
                    <div className="step-number">{step.step}</div>
                    <div className="step-content">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-body">{step.body}</p>
                    </div>
                    <button className="step-check" aria-label="Mark as done">
                      <CheckCircle size={22} />
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* Garden Note */}
            {recipe.notes && (
              <div className="rd-notes">
                <div className="rd-notes-icon"><Leaf size={20} /></div>
                <div>
                  <strong>Aunt Tootie's Garden Note</strong>
                  <p>{recipe.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: Ingredients */}
          <aside className="rd-sidebar">
            <div className="rd-ingredients-card">
              <h2 className="rd-ingredients-title">Ingredients</h2>
              <p className="rd-serves-label">Serves {recipe.serves}</p>
              {recipe.ingredients.map((group, gi) => (
                <div key={gi} className="ingredient-group">
                  {group.group && recipe.ingredients.length > 1 && (
                    <h4 className="ingredient-group-title">{group.group}</h4>
                  )}
                  <ul className="ingredients-list">
                    {group.items.map((item, ii) => {
                      const key = `${gi}-${ii}`;
                      return (
                        <li
                          key={key}
                          className={`ingredient-item ${checkedIngredients[key] ? 'ingredient-item--checked' : ''}`}
                          onClick={() => toggleIngredient(key)}
                        >
                          <span className="ingredient-check" />
                          <span className="ingredient-text">{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="rd-tags">
              {recipe.tags.map(tag => (
                <span key={tag} className="rd-tag">{tag}</span>
              ))}
            </div>
          </aside>
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
