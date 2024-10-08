import React from 'react';
import StockSearch from '../components/StockSearch';
import BalanceSheet from '../components/BalanceSheet';

const SpotlightPage = () => {
  return (
    <div className="flex flex-col items-center w-full p-4">
      <h1 className="text-5xl font-bold mt-8 mb-4">Company Research</h1>
      <div className="w-full max-w-4xl">
        <StockSearch />
        <div className="mt-8 w-full">
          <h2 className="text-3xl font-semibold text-left">Balance Sheet</h2>
          <BalanceSheet symbol="AAPL" /> {/* Replace "AAPL" with the searched stock symbol */}
        </div>
      </div>
    </div>
  );
};

export default SpotlightPage;