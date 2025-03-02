from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)

# Initialize Gemini API
genai.configure(api_key='AIzaSyAn1y2XOrjC0VphIOFrVPMGD1dE4Pj65bg')

@app.route('/')
def index():
    return jsonify({'message': 'Welcome to the Food Resource API'})

@app.route('/api/foodbanks', methods=['GET'])
def get_foodbanks():
    try:
        zip_code = request.args.get('zipCode')
        
        if not zip_code or not zip_code.isdigit() or len(zip_code) != 5:
            return jsonify({'error': 'Please provide a valid 5-digit zip code'}), 400
        
        # Construct the prompt for Gemini
        prompt = f"""Find food banks and food pantries near zip code {zip_code} within 50 miles. For each location, provide:
        - Name
        - Address
        - Approximate distance in miles
        - Brief description of services
        - Website URL if available
        Format the response as a valid JSON array with each food bank as an object containing name, address, distance, description, and website fields. Do not include any markdown formatting or backticks."""

        # Generate response using Gemini
        model = genai.GenerativeModel('gemini-2.0-flash')
        result = model.generate_content(prompt)
        
        if not result or not result.response:
            raise Exception('No response from API')
        
        # Get the response text and ensure it's properly formatted
        text = result.response.text
        print("Raw API response:", text)  # Debug logging
        
        # Clean the response text and parse JSON
        cleaned_text = text.replace('```json', '').replace('```', '').strip()
        food_banks = json.loads(cleaned_text)
        
        if not isinstance(food_banks, list):
            raise Exception('Response is not an array')
        
        if not food_banks:
            raise Exception('No food banks found in this area')
        
        # Validate each food bank object
        for bank in food_banks:
            if not all(key in bank for key in ['name', 'address', 'distance', 'description']):
                raise Exception('Invalid food bank data format')
        
        return jsonify(food_banks)
    
    except Exception as e:
        return jsonify({'error': str(e) or 'Failed to fetch food banks. Please try again.'}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Route not found'}), 404

if __name__ == '__main__':
    app.run(port=4000, debug=True)