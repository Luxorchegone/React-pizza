import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Root } from 'react-dom/client';
import { PizzaProps } from '../../components/Pizza/Pizza.props';
import { RootState } from '../store';
import { CartItemType } from './cartSlice';
import { OrderType, SortEnum, SortType } from './filterSlice';

export type PizzaType = {
  id: string;
  name: string;
  sizes: number[];
  types: number[];
  imageUrl: string;
  price: number;
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
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

export type SearchPizzaParams = {
  currentPage: string;
  categoryId: string;
  sortBy: SortEnum;
  order: OrderType;
  search: string;
};

export const fetchPizzas = createAsyncThunk<PizzaType[], SearchPizzaParams>(
  `pizza/fetchAll`,
  async (params) => {
    const { currentPage, categoryId, sortBy, order } = params;

    const { data } = await axios.get<PizzaType[]>(
      `https://63247326bb2321cba92cbed5.mockapi.io/api/v1/pizzas?page=${currentPage}&limit=4&${
        categoryId === '0' ? '' : `category=${categoryId}`
      }&sortBy=${sortBy}&order=${order}`,
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
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export default pizzasSlice.reducer;
