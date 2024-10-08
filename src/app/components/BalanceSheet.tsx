"use client";

import React, { useState, useEffect } from 'react';
import { fetchBalanceSheet } from '../../utils/stockAPI';

interface BalanceSheetProps {
  symbol: string;
}

const BalanceSheet: React.FC<BalanceSheetProps> = ({ symbol }) => {
  const [balanceSheet, setBalanceSheet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBalanceSheet(symbol);
        setBalanceSheet(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch balance sheet data');
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading) return <div>Loading balance sheet...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!balanceSheet) return <div>No balance sheet data available</div>;

  return (
    <div>
      <h2>Balance Sheet for {symbol}</h2>
      <pre>{JSON.stringify(balanceSheet, null, 2)}</pre>
    </div>
  );
};

export default BalanceSheet;