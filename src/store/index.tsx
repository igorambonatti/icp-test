import { configureStore } from "@reduxjs/toolkit";
import priceHistoryReducer from "./priceHistorySlice";
import tokensReducer from "./tokensSlice";

const store = configureStore({
  reducer: {
    tokens: tokensReducer,
    priceHistory: priceHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
