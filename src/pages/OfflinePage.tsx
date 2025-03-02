import React, { useState, useEffect } from 'react';
import '../components/Kitchen.css';

interface Recipe {
  id?: number;
  name: string;
  ingredients: string[];
  instructions: string[];
}

// State to hold dynamically loaded recipes
const OfflinePage: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string>('');
  const [offlineRecipes, setOfflineRecipes] = useState<Recipe[]>([]);

  const API_BASE_URL = "http://127.0.0.1:5000";

  useEffect(() => {
    loadOfflineRecipes();
    fetchSavedRecipes();
  }, []);

  // Load recipes from Smalltalk-generated JSON file
  const loadOfflineRecipes = async () => {
    try {
      const response = await fetch('/recipe.json');
      if (!response.ok) throw new Error("Failed to load offline recipes");
      const data: Recipe[] = await response.json();
      setOfflineRecipes(data);
    } catch (err: any) {
      console.error("Error loading offline recipes:", err);
      setError("Unable to load offline recipes.");
    }
  };

  // Fetch saved recipes from local backend
  const fetchSavedRecipes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/saved_recipes`);
      if (!response.ok) throw new Error("Failed to fetch saved recipes");
      const data: Recipe[] = await response.json();
      setSavedRecipes(data);
    } catch (err: any) {
      console.error("Error fetching saved recipes:", err);
    }
  };

  const saveRecipe = async (recipe: Recipe) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/save_recipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) throw new Error("Failed to save recipe");

      fetchSavedRecipes();
      alert(`Recipe "${recipe.name}" saved successfully!`);
    } catch (err: any) {
      console.error("Error saving recipe:", err);
      alert("Failed to save recipe. Please try again.");
    }
  };

  // Search function using dynamically loaded recipes
  const findRecipes = () => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients first');
      return;
    }

    setError('');
    const userIngredients = ingredients.toLowerCase().split(',').map(i => i.trim());

    // Filter offline recipes that match the available ingredients
    const matchingRecipes = offlineRecipes.filter(recipe => {
      const requiredIngredients = recipe.ingredients.map(i => i.toLowerCase());
      return requiredIngredients.every(ingredient => 
        userIngredients.some(userIng => userIng.includes(ingredient) || ingredient.includes(userIng))
      );
    });

    if (matchingRecipes.length === 0) {
      setError('No recipes found with these ingredients. Try different ingredients!');
    }

    setRecipes(matchingRecipes);
  };

  return (
    <div className="kitchen-container" style={{ minHeight: '100vh', paddingTop: '20px', maxWidth: '100%', padding: '2rem' }}>
      <h1 style={{ color: '#388E3C', fontFamily: "'Sigmar', serif", textShadow: "4px 4px 4px #aaa", fontSize: '3rem', textAlign: 'center', marginBottom: '2rem' }}>Offline Recipe Finder</h1>
      <div className="input-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter your ingredients (comma-separated)"
          rows={4}
          style={{ width: '100%', marginBottom: '1rem' }}
        />

        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

        <button 
          onClick={findRecipes}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#388E3C',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Find Recipes
        </button>
      </div>

      <div className="recipes-section" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card" style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            height: '100%'
          }}>
            <h2 style={{ color: '#388E3C', marginBottom: '1rem' }}>{recipe.name}</h2>
            <button 
              className="save-button" 
              onClick={() => saveRecipe(recipe)}
              style={{
                backgroundColor: '#388E3C',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                marginBottom: '1rem',
                width: '100%'
              }}
            >
              Save Recipe
            </button>
            <h3>Ingredients:</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>{recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
            <h3>Instructions:</h3>
            <ol style={{ paddingLeft: '1.5rem' }}>{recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}</ol>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ color: '#388E3C' }}>Saved Recipes</h2>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {savedRecipes.map((recipe, i) => (
            <li key={i} style={{
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>{recipe.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OfflinePage;
