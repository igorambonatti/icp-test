import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenMetadata } from "../types";

interface TokensState {
  tokens: TokenMetadata[];
  selectedSymbol: TokenMetadata | null;
  selectedQuote: TokenMetadata | null;
  loading: boolean;
  error: string | null;
}

const initialState: TokensState = {
  tokens: [],
  selectedSymbol: null,
  selectedQuote: null,
  loading: false,
  error: null,
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<TokenMetadata[]>) => {
      state.tokens = action.payload;
    },
    setSelectedSymbol: (state, action: PayloadAction<TokenMetadata>) => {
      state.selectedSymbol = action.payload;
    },
    setSelectedQuote: (state, action: PayloadAction<TokenMetadata | null>) => {
      state.selectedQuote = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTokens,
  setSelectedSymbol,
  setSelectedQuote,
  setLoading,
  setError,
} = tokensSlice.actions;

export default tokensSlice.reducer;
