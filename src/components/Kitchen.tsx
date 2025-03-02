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

      const prompt = `Generate ${numRecipes} recipes using these ingredients: ${ingredients}.
        Return a JSON array with objects having 'name', 'ingredients' (list), and 'instructions' (list).`;

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
    <div className="kitchen-container">
      <h1>What's in My Kitchen?</h1>
      <div className="input-section">
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter your ingredients (comma-separated)"
          rows={4}
        />
        <div className="recipe-count">
          <label>Number of Recipes:</label>
          <input
            type="number"
            min={1}
            max={10}
            value={numRecipes}
            onChange={(e) => setNumRecipes(parseInt(e.target.value))}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button onClick={generateRecipes} disabled={loading}>
          {loading ? "Generating Recipes..." : "Generate Recipes"}
        </button>
      </div>

      {/* ✅ Display generated recipes with "Save" button */}
      <div className="recipes-section">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h2>{recipe.name}</h2>
            <button className="save-button" onClick={() => saveRecipe(recipe)}>
              Save Recipe
            </button>
            <h3>Ingredients:</h3>
            <ul>{recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
            <h3>Instructions:</h3>
            <ol>{recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}</ol>
          </div>
        ))}
      </div>

      {/* ✅ Display Saved Recipes */}
      <h2>Saved Recipes</h2>
      <ul>
        {savedRecipes.map((recipe, i) => (
          <li key={i}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Kitchen;
