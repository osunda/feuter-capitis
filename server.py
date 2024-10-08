from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()  # This line loads the variables from .env

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv('ENXCHL79P0EYYYLJ')
print(f"Loaded API Key: {API_KEY}")  # Debug print

ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query'

@app.route('/api/search', methods=['GET'])
def search_stocks():
    keywords = request.args.get('keywords', '')
    url = f"{ALPHA_VANTAGE_BASE_URL}?function=SYMBOL_SEARCH&keywords={keywords}&apikey={API_KEY}"
    print(f"Request URL: {url}")  # Debug print
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

@app.route('/api/balance-sheet/<symbol>')
def get_balance_sheet(symbol):
    params = {
        'function': 'BALANCE_SHEET',
        'symbol': symbol,
        'apikey': API_KEY
    }
    print(f"Using API Key: {API_KEY}")  # Debug print
    response = requests.get(ALPHA_VANTAGE_BASE_URL, params=params)
    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)