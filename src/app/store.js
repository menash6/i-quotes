import { configureStore } from "@reduxjs/toolkit";
import quotesPlayerReducer from "../features/quotesPlayer/quotesPlayerSlice";
import timersReducer from "../features/timers/timersSlice";

export const store = configureStore({
  reducer: {
    quotesPlayer: quotesPlayerReducer,
    timers: timersReducer,
  },
});
