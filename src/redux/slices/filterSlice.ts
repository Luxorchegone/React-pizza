import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortType: {
    name: 'по популярности',
    sortProperty: 'rating',
  },
  descSort: true,
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
    setDescSort: (state, action) => {
      state.descSort = action.payload;
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
      state.descSort = action.payload.descSort === 'true';
      state.sortType = action.payload.sort;
    },
  },
});

export const { setCategoryId, setSort, setDescSort, setSearchText, setCurrentPage, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
