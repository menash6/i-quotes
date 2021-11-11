import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import quotesPlayerReducer from "../features/quotesPlayer/quotesPlayerSlice";
import musicPlayerReducer from "../features/musicPlayer/musicPlayerSlice";
import timersReducer from "../features/timers/timersSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    quotesPlayer: quotesPlayerReducer,
    timers: timersReducer,
    musicPlayer: musicPlayerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
