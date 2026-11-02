import { configureStore } from '@reduxjs/toolkit';
import actionReducer from './reducers/action'; // example slice

export const store = configureStore({
  reducer: {
    action: actionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
