"use client";

import React, { useState } from 'react';
import { searchStocks, SearchResult } from '../../utils/stockAPI';

const StockSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    setError(null);
    try {
      const results = await searchStocks(searchTerm);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search stocks. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for stocks..."
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {searchResults.map((result) => (
          <li key={result.symbol} className="border p-2 rounded-md">
            <h3 className="font-bold">{result.symbol} - {result.name}</h3>
            <p>{result.type} | {result.region}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockSearch;
