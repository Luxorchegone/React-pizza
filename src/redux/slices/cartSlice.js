import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  totalPizzaCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // достаем объект с пиццей, если он у нас уже есть в redux
      const findItem = state.items.find((obj) => {
        if (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        ) {
          return true;
        } else return false;
      });

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.count * obj.price + sum;
      }, 0);
      state.totalPizzaCount = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalPizzaCount = 0;
    },
  },
});

export const { addProduct, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
