import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
}

const Kitchen: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('');
  const [numRecipes, setNumRecipes] = useState<number>(3);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const generateRecipes = async () => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients first');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      console.log('API Key loaded:', !!apiKey); // Temporary debug log
      
      if (!apiKey || apiKey === 'undefined') {
        throw new Error('API key not found in environment variables. Please ensure REACT_APP_GEMINI_API_KEY is set in your .env file');
      }
      
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
      if (!result || !result.response) {
        throw new Error('No response from API');
      }
      
      const response = await result.response;
      const text = response.text();
      console.log('API Response:', text); // Temporary log to debug
      
      try {
        // Clean the response text to remove any markdown formatting
        const cleanedText = text.replace(/^```json\s*|```$/g, '').trim();
        const parsedRecipes = JSON.parse(cleanedText);
        
        if (!Array.isArray(parsedRecipes)) {
          throw new Error('Response is not an array');
        }
        if (parsedRecipes.length === 0) {
          throw new Error('No recipes generated');
        }
        setRecipes(parsedRecipes);
      } catch (parseError) {
        console.error('Parsing error details:', parseError);
        setError('Unable to process the recipe data. Please try again.');
      }
    } catch (error: any) {
      console.error('Full error details:', error);
      setError(error.message || 'Failed to connect to the recipe service. Please try again.');
      setRecipes([]);
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
          {loading ? (
            <div className="loading-spinner">
              <span className="spinner"></span>
              Generating Recipes...
            </div>
          ) : (
            'Generate Recipes'
          )}
        </button>
      </div>

      <div className="recipes-section">
        {loading ? (
          <div className="loading-message">
            <div className="spinner large"></div>
            <p>Creating delicious recipes with your ingredients...</p>
          </div>
        ) : recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h2>{recipe.name}</h2>
              <h3>Ingredients:</h3>
              <ul>
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
              <h3>Instructions:</h3>
              <ol>
                {recipe.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          ))
        ) : (
          <div>Enter ingredients and click generate to see recipes</div>
        )}
      </div>
    </div>
  );
};

export default Kitchen;