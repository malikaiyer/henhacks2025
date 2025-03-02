import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Kitchen.css';

interface Recipe {
  id?: number; // Assigned by database
  name: string;
  ingredients: string[];
  instructions: string[];
}

const Kitchen: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('');
  const [numRecipes, setNumRecipes] = useState<number>(3);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const API_BASE_URL = "http://127.0.0.1:5000"; // Flask backend URL

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  // ✅ Fetch saved recipes from Flask
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

  // ✅ Function to save a recipe to Flask
  const saveRecipe = async (recipe: Recipe) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/save_recipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) throw new Error("Failed to save recipe");

      fetchSavedRecipes(); // Refresh saved recipes list
      alert(`Recipe "${recipe.name}" saved successfully!`);
    } catch (err: any) {
      console.error("Error saving recipe:", err);
      alert("Failed to save recipe. Please try again.");
    }
  };

  // ✅ Generate recipes using Google Gemini API
  const generateRecipes = async () => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      if (!apiKey) throw new Error('API key not found');

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `Generate exactly ${numRecipes} recipes using ONLY these ingredients: ${ingredients}.
      IMPORTANT:
      1. Use ONLY the ingredients listed above - do not add or suggest any additional ingredients
      2. Your response must be a valid JSON array with no markdown formatting or backticks
      3. Each recipe in the array must have these exact fields:
         - "name": string
         - "ingredients": array of strings (using only ingredients from the provided list)
         - "instructions": array of strings
      Example format: [{"name":"Recipe 1","ingredients":["ing1"],"instructions":["step1"]}]
      Return ONLY the JSON array with no additional text.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const cleanedText = text.replace(/^```json\s*|```$/g, '').trim();
      const parsedRecipes = JSON.parse(cleanedText);

      setRecipes(parsedRecipes);
    } catch (error: any) {
      console.error("Error generating recipes:", error);
      setError("Failed to generate recipes. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kitchen-container" style={{ minHeight: '100vh', paddingTop: '20px', maxWidth: '100%', padding: '2rem' }}>
      <h1 style={{ color: '#388E3C', fontFamily: "'Sigmar', serif", textShadow: "4px 4px 4px #aaa", fontSize: '3rem', textAlign: 'center', marginBottom: '2rem' }}>What's in My Kitchen?</h1>
      <div className="input-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter your ingredients (comma-separated)"
          rows={4}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <div className="recipe-count" style={{ marginBottom: '1rem' }}>
          <label>Number of Recipes:</label>
          <input
            type="number"
            min={1}
            max={10}
            value={numRecipes}
            onChange={(e) => setNumRecipes(parseInt(e.target.value))}
            style={{ marginLeft: '1rem', width: '80px' }}
          />
        </div>

        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

        <button 
          onClick={generateRecipes} 
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#388E3C',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? "Generating Recipes..." : "Generate Recipes"}
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

export default Kitchen;
