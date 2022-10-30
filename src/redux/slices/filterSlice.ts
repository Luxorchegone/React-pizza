import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortEnum {
  NAME = 'name',
  PRICE = 'price',
  RATING = 'rating',
}

type SortNameType = 'по популярности' | 'по цене' | 'по алфавиту';

export type OrderType = 'asc' | 'desc';

export type SortType = {
  name: SortNameType;
  sortProperty: SortEnum;
};

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
    sortProperty: SortEnum.RATING,
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
      state.currentPage = action.payload.currentPage;
      state.categoryId = action.payload.categoryId;
      state.order = action.payload.order;
      state.sortType = action.payload.sortType;
      state.searchText = action.payload.searchText;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setOrder, setSearchText, setCurrentPage, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
