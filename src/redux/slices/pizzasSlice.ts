import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Root } from 'react-dom/client';
import { PizzaProps } from '../../components/Pizza/Pizza.props';
import { RootState } from '../store';

type Pizza = {
  id: string;
  name: string;
  sizes: number[];
  types: number[];
  imageUrl: string;
  price: number;
};

interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'succes' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading',
};

export const fetchPizzas = createAsyncThunk(`pizza/fetchAll`, async (params, thunkAPI) => {
  const { currentPage, categoryId, sortProperty, descSort } = params;
  const { data } = await axios(
    `https://63247326bb2321cba92cbed5.mockapi.io/api/v1/pizzas?page=${currentPage}&limit=4&${
      categoryId ? `category=${categoryId}` : ''
    }&sortBy=${sortProperty}&order=${descSort ? 'desc' : 'asc'}`,
  );

  console.log();
  return data;
});

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    //сохраняем наши пиццы полученные с бека
    setItems: (state, action) => {
      state.items = action.payload;
      state.items = [];
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'succes';
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
