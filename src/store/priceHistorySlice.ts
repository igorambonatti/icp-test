import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataItem, NextSession, Statistics } from "../types";

interface PriceHistoryState {
  data: DataItem[];
  statistics: Statistics | null;
  nextSession: NextSession | null;
  loading: boolean;
  error: string | null;
}

const initialState: PriceHistoryState = {
  data: [],
  statistics: null,
  nextSession: null,
  loading: false,
  error: null,
};

const priceHistorySlice = createSlice({
  name: "priceHistory",
  initialState,
  reducers: {
    setPriceHistoryData: (state, action: PayloadAction<DataItem[]>) => {
      state.data = action.payload;
    },
    setStatistics: (state, action: PayloadAction<Statistics | null>) => {
      state.statistics = action.payload;
    },
    setNextSession: (state, action: PayloadAction<NextSession | null>) => {
      state.nextSession = action.payload;
    },
    setPriceHistoryLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPriceHistoryError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPriceHistoryData,
  setStatistics,
  setNextSession,
  setPriceHistoryLoading,
  setPriceHistoryError,
} = priceHistorySlice.actions;

export default priceHistorySlice.reducer;
