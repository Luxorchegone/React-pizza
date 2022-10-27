import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SortType = {
  name: string;
  sortProperty: 'name' | 'price' | 'rating';
};

export type OrderType = 'asc' | 'desc';

interface FilterSliceState {
  categoryId: number;
  sortType: SortType;
  order: OrderType;
  searchText: string;
  currentPage: number;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sortType: {
    name: 'по популярности',
    sortProperty: 'rating',
  },
  order: 'asc',
  searchText: '',
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    //сохраняем тип категории
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    //сохраняем тип сортировки
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    //сохраняем флаг сортировки по убыванию
    setOrder: (state, action: PayloadAction<OrderType>) => {
      state.order = action.payload;
    },
    //сохраняем текст поискового запроса
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    //сохраняем текущую страницу
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    //
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      //сохраняем все примененые фильтры для последующей нтеграции в URL
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.order = action.payload.order;
      state.sortType = action.payload.sortType;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setOrder, setSearchText, setCurrentPage, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
