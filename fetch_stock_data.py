import os
import pandas as pd
import requests
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

# Get API key from environment variable
API_KEY = os.getenv('ENXCHL79P0EYYYLJ')
print(f"API Key loaded: {'Yes' if API_KEY else 'No'}")

# List of stock symbols
STOCKS = ['XOM', 'CVX', 'BP', 'SHEL', 'COP', 'BTU', 'ARCH', 'ARLP', 'RIO', 'BHP', 
          'FCX', 'GLNCY', 'VALE', 'NGLOY', 'SO', 'DUK', 'AEP', 'EXC', 'ETR', 'TTE']

BASE_URL = 'https://www.alphavantage.co/query'

def fetch_stock_data(symbol):
    print(f"Fetching data for {symbol}...")
    params = {
        'function': 'TIME_SERIES_DAILY_ADJUSTED',
        'symbol': symbol,
        'outputsize': 'compact',
        'apikey': API_KEY
    }
    response = requests.get(BASE_URL, params=params)
    data = response.json()
    
    if 'Time Series (Daily)' not in data:
        print(f"Error fetching data for {symbol}: {data.get('Error Message', 'Unknown error')}")
        return None
    
    df = pd.DataFrame(data['Time Series (Daily)']).T
    df.index = pd.to_datetime(df.index)
    df = df.astype(float)
    df['symbol'] = symbol
    print(f"Data fetched successfully for {symbol}")
    return df

# Fetch data for all stocks
all_data = []

print("Starting to fetch data...")
start_time = time.time()

for i, symbol in enumerate(STOCKS):
    data = fetch_stock_data(symbol)
    if data is not None:
        all_data.append(data)
    
    # Wait 12 seconds after every 5 requests
    if (i + 1) % 5 == 0 and i < len(STOCKS) - 1:
        print("Waiting 12 seconds to respect API rate limits...")
        time.sleep(12)

print(f"Data fetching completed in {time.time() - start_time:.2f} seconds")

# Combine all data into a single DataFrame
if all_data:
    combined_df = pd.concat(all_data)
    combined_df.to_csv('brown_stocks_data.csv')
    print(f"Data saved to {os.path.abspath('brown_stocks_data.csv')}")
else:
    print("No data was fetched. Please check your API key and internet connection.")

print("Script execution completed.")