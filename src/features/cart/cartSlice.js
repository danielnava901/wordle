import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalProducts: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      let existingProduct = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice += 10;
      } else {
        state.products.push({ ...action.payload, quantity: 1, totalPrice: 10 });
      }
      state.totalProducts += 1;
      state.totalPrice += 10;
    },
    removeProduct: (state, action) => {
      state.products = state.products
        .map((item) => {
          if (item.id === action.payload) {
            state.totalProducts -= 1;
            state.totalPrice -= 10;
            return {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.totalPrice - 10,
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
