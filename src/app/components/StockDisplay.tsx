"use client";

import React, { useState, useEffect } from 'react';
import { fetchStockData, StockData } from '../../utils/stockAPI';

const StockDisplay: React.FC = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStockData() {
      try {
        const symbol = 'AAPL'; // You can change this to any stock symbol
        const data = await fetchStockData(symbol);
        setStockData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stock data:', err);
        setError('Failed to fetch stock data. Please try again.');
        setLoading(false);
      }
    }

    loadStockData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!stockData) return <div>No stock data available</div>;

  return (
    <div>
      <h2>{stockData.symbol} Stock Data</h2>
      <p>Price: ${stockData.price.toFixed(2)}</p>
      <p>Change: ${stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)</p>
    </div>
  );
};

export default StockDisplay;