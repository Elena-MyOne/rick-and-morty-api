import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import charactersSlice from './slices/charactersSlice';

export const store = configureStore({
  reducer: {
    characters: charactersSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
