import { Link } from 'react-router-dom';
import { Clock, Users, Lock } from 'lucide-react';
import './RecipeCard.css';

export default function RecipeCard({ recipe, size = 'normal' }) {
  return (
    <Link
      to={`/recipes/${recipe.slug}`}
      className={`recipe-card recipe-card--${size}`}
    >
      <div className="recipe-card-image">
        <img src={recipe.image} alt={recipe.title} loading="lazy" />
        <div className="recipe-card-badges">
          <span className={`tag ${recipe.premium ? 'tag-premium' : 'tag-free'}`}>
            {recipe.premium ? <><Lock size={10} /> Premium</> : 'Free'}
          </span>
          {recipe.featured && <span className="tag tag-new">Featured</span>}
        </div>
        {recipe.premium && (
          <div className="recipe-card-lock-overlay">
            <Lock size={32} />
            <span>Premium Recipe</span>
          </div>
        )}
      </div>
      <div className="recipe-card-body">
        <p className="recipe-card-category">{recipe.category}</p>
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <p className="recipe-card-teaser">{recipe.teaser}</p>
        <div className="recipe-card-meta">
          <span><Clock size={13} /> {recipe.time}</span>
          <span><Users size={13} /> {recipe.serves}</span>
          <span className="recipe-difficulty">{recipe.difficulty}</span>
        </div>
      </div>
    </Link>
  );
}
