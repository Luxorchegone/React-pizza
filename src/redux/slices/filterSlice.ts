import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortType: {
    name: 'по популярности',
    sortProperty: 'rating',
  },
  descSort: true,
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
  },
});

export const { setCategoryId, setSort, setDescSort } = filterSlice.actions;
export default filterSlice.reducer;
