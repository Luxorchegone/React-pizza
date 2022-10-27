import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Root } from 'react-dom/client';
import { PizzaProps } from '../../components/Pizza/Pizza.props';
import { RootState } from '../store';
import { CartItem } from './cartSlice';

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
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading',
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  `pizza/fetchAll`,
  async (params) => {
    const { currentPage, categoryId, sortProperty, order } = params;

    const { data } = await axios.get<Pizza[]>(
      `https://63247326bb2321cba92cbed5.mockapi.io/api/v1/pizzas?page=${currentPage}&limit=4&${
        categoryId ? `category=${categoryId}` : ''
      }&sortBy=${sortProperty}&order=${order}`,
    );

    return data;
  },
);

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    //сохраняем наши пиццы полученные с бека
    // setItems: (state, action) => {
    //   state.items = action.payload;
    //   state.items = [];
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'loading';
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

// export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
