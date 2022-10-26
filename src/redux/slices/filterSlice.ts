import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type SortType = {
  name: string;
  sortProperty: 'popular' | 'price' | 'rating';
};

interface FilterSliceState {
  categoryId: number;
  sortType: SortType;
  order: 'asc' | 'desc';
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
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    //сохраняем тип сортировки
    setSort: (state, action) => {
      state.sortType = action.payload;
    },
    //сохраняем флаг сортировки по убыванию
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    //сохраняем текст поискового запроса
    setSearchText: (state, action) => {
      console.log(action.payload);
      state.searchText = action.payload;
    },
    //сохраняем текущую страницу
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    //
    setFilters: (state, action) => {
      //сохраняем все примененые фильтры для последующей нтеграции в URL
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.order = action.payload.order;
      state.sortType = action.payload.sort;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setOrder, setSearchText, setCurrentPage, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
