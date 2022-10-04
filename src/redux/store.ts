import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import paginationSlice from './slices/paginationSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    pagination: paginationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
