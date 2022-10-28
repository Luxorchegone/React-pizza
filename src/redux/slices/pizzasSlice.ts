import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Root } from 'react-dom/client';
import { PizzaProps } from '../../components/Pizza/Pizza.props';
import { RootState } from '../store';
import { CartItemType } from './cartSlice';

type PizzaType = {
  id: string;
  name: string;
  sizes: number[];
  types: number[];
  imageUrl: string;
  price: number;
};

enum Status {
  LOADING = 'loading',
  SUCCEsS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaType[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<PizzaType[], Record<string, string>>(
  `pizza/fetchAll`,
  async (params) => {
    const { currentPage, categoryId, sortProperty, order } = params;

    const { data } = await axios.get<PizzaType[]>(
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCEsS;
      state.items = action.payload;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

// export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
