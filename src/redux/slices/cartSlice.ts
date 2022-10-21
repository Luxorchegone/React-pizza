import { createSlice } from '@reduxjs/toolkit';

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
};

interface CrtaSliceState {
  items: CartItem[];
  totalPrice: number;
  totalPizzaCount: 0;
}

const initialState = {
  items: [],
  totalPrice: 0,
  totalPizzaCount: 0,
};
//функция для обновления общей суммы и количества пицц
const updateCounters = (state) => {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.count * obj.price + sum;
  }, 0);
  state.totalPizzaCount = state.items.reduce((sum, obj) => {
    return obj.count + sum;
  }, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //Добавляем продукт в корзину
    addProduct: (state, action) => {
      // достаем объект с пиццей, если он у нас уже есть в redux
      const findItem = state.items.find((obj) => {
        console.log(action.payload);
        if (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        ) {
          return true;
        } else {
          return false;
        }
      });

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      updateCounters(state);
    },
    //Удаляем продукт из корзины полностью(все количество данного продукта)
    removeItems: (state, action) => {
      state.items = state.items.filter((item) => {
        if (
          item.id !== action.payload.id ||
          item.size !== action.payload.size ||
          item.type !== action.payload.type
        ) {
          return true;
        } else {
          return false;
        }
      });
      updateCounters(state);
    },
    //Удаляем один продукт из корзины, но не все его количество
    removeOneItem: (state, action) => {
      // достаем объект с пиццей, он у нас 100% есть, иначе обработчик с этой функцией не будет доступен в UI
      let itemIndex = 0;
      const findItem = state.items.find((obj, i) => {
        if (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        ) {
          itemIndex = i;
          return true;
        } else {
          return false;
        }
      });
      if (findItem.count > 1) {
        findItem.count--;
      } else {
        state.items.splice(itemIndex, 1);
      }
      updateCounters(state);
    },
    //Очщаем корзину полностью
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalPizzaCount = 0;
    },
  },
});

export const selectCart = (state) => state.cart;

export const selectCartItemByParam = (id, type, size) => (state) => {
  return state.cart.items.find((obj) => {
    if (obj.id === id && obj.type === type && obj.size === size) {
      return true;
    } else {
      return false;
    }
  });
};

export const { addProduct, removeItem, clearCart, removeItems, removeOneItem } = cartSlice.actions;
export default cartSlice.reducer;
