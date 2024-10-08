import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';  // This points to your Flask server

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface SearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
}

export async function fetchStockData(symbol: string): Promise<StockData> {
  try {
    const response = await axios.get(`${BASE_URL}/stock/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
}

export async function searchStocks(keywords: string): Promise<SearchResult[]> {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { keywords }
    });
    return response.data.bestMatches.map((match: any) => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region'],
      marketOpen: match['5. marketOpen'],
      marketClose: match['6. marketClose'],
      timezone: match['7. timezone'],
      currency: match['8. currency'],
      matchScore: match['9. matchScore']
    }));
  } catch (error) {
    console.error('Error searching stocks:', error);
    throw error;
  }
}

export async function fetchHistoricalData(symbol: string): Promise<any> {
  try {
    const response = await axios.get(`${BASE_URL}/historical/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
}

export async function fetchMultipleHistoricalData(symbols: string[]): Promise<any[]> {
  const promises = symbols.map(symbol => fetchHistoricalData(symbol));
  return Promise.all(promises);
}

export async function fetchBalanceSheet(symbol: string): Promise<any> {
  try {
    const response = await axios.get(`${BASE_URL}/balance-sheet/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching balance sheet:', error);
    throw error;
  }
}
