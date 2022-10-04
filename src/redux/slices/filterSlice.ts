import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortType: {
    name: 'по популярности',
    sortProperty: 'rating',
  },
  descSort: true,
  searchText: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sortType = action.payload;
    },
    setDescSort: (state, action) => {
      state.descSort = action.payload;
    },
    setSearchText: (state, action) => {
      console.log(action.payload);
      state.searchText = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setDescSort, setSearchText } = filterSlice.actions;
export default filterSlice.reducer;
