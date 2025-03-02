from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Initialize the database
def init_db():
    conn = sqlite3.connect("recipes.db")
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            ingredients TEXT,
            instructions TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# API: Save a new recipe
@app.route("/api/save_recipe", methods=["POST"])
def save_recipe():
    data = request.json
    if not data or "name" not in data or "ingredients" not in data or "instructions" not in data:
        return jsonify({"error": "Invalid recipe data"}), 400

    conn = sqlite3.connect("recipes.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)",
                   (data["name"], ', '.join(data["ingredients"]), '. '.join(data["instructions"])))
    conn.commit()
    conn.close()
    return jsonify({"message": "Recipe saved successfully!"}), 201

# API: Get saved recipes
@app.route("/api/saved_recipes", methods=["GET"])
def get_saved_recipes():
    conn = sqlite3.connect("recipes.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, ingredients, instructions FROM recipes")
    recipes = [{"id": row[0], "name": row[1], "ingredients": row[2].split(', '), "instructions": row[3].split('. ')} for row in cursor.fetchall()]
    conn.close()
    return jsonify(recipes)

if __name__ == "__main__":
    app.run(debug=True)
