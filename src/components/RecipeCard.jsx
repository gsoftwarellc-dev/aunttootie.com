import { Link } from 'react-router-dom';
import { Bookmark, Lock } from 'lucide-react';
import './RecipeCard.css';

export default function RecipeCard({ recipe, size = 'normal' }) {
  return (
    <Link
      to={`/recipes/${recipe.slug}`}
      className={`recipe-card recipe-card--${size}`}
    >
      <div className="recipe-card-image">
        <img src={recipe.image} alt={recipe.title} loading="lazy" />
        <div className="recipe-card-corner-icon">
          {recipe.premium ? <Lock size={16} /> : <Bookmark size={16} />}
        </div>
      </div>
      <div className="recipe-card-body">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <p className="recipe-card-teaser">{recipe.teaser}</p>
      </div>
    </Link>
  );
}
