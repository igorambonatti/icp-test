import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PriceHistoryTable from "./components/PriceHistoryTable";
import usePriceHistory from "./hooks/usePriceHistory";
import useTokens from "./hooks/useTokens";
import { AppDispatch, RootState } from "./store";
import { setPriceHistoryData } from "./store/priceHistorySlice";
import { setSelectedSymbol } from "./store/tokensSlice";
import { TokenMetadata } from "./types";
import { createICPAgent } from "./utils/createAnonymousAgent";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { getTokens } = useTokens();
  const { tokens, loading, error } = useSelector(
    (state: RootState) => state.tokens
  );

  const selectedSymbol = useSelector(
    (state: RootState) => state.tokens.selectedSymbol
  );

  const selectedQuote = useSelector(
    (state: RootState) => state.tokens.selectedQuote
  );
  const symbol = Array.isArray(selectedSymbol)
    ? selectedSymbol[0]
    : selectedSymbol;

  const { getPriceHistory } = usePriceHistory();

  const fetchTokens = useCallback(async () => {
    const agent = await createICPAgent();
    await getTokens(agent);
  }, [getTokens]);

  const fetchPrices = useCallback(async () => {
    const agent = await createICPAgent();
    if (symbol && symbol.principal && selectedQuote) {
      const prices = await getPriceHistory(agent, symbol, selectedQuote, 10);
      dispatch(setPriceHistoryData(prices));
    }
  }, [symbol, selectedQuote, dispatch, getPriceHistory]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  useEffect(() => {
    fetchPrices();
  }, [selectedSymbol, selectedQuote]);

  const priceHistoryData = useSelector(
    (state: RootState) => state.priceHistory.data
  );
  const pricesFiltered = useMemo(() => {
    if (priceHistoryData.length > 0) {
      return [...priceHistoryData].reverse().slice(0, 17);
    }
    return [];
  }, [priceHistoryData]);

  const handleTokenClick = (token: TokenMetadata) => {
    dispatch(setSelectedSymbol(token));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4 space-y-8">
      <div className="max-w-4xl w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Token List</h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <ul>
            {tokens.map((token) => (
              <li
                key={token.symbol}
                className={`p-2 flex items-center cursor-pointer ${
                  selectedSymbol && selectedSymbol.symbol === token.symbol
                    ? "bg-blue-200"
                    : ""
                }`}
                onClick={() => handleTokenClick(token)}
              >
                <img
                  src={token.logo}
                  alt={`${token.symbol} logo`}
                  className="w-6 h-6 mr-2"
                />
                {token.name} ({token.symbol})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="max-w-4xl w-full p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Price History</h2>
        {pricesFiltered.length === 0 ? (
          <p className="text-center text-gray-500">
            No price history data available.
          </p>
        ) : (
          <PriceHistoryTable data={pricesFiltered} />
        )}
      </div>
    </div>
  );
};

export default App;
