import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity = state.quantity + action.payload.quantity;
      const productIndex = Array.from(state.products).findIndex(
        (productInfo) => productInfo.product._id === action.payload.product?._id
      );
      if (productIndex === -1) {
        state.products.push(action.payload);
      } else {
        state.products[productIndex].quantity =
          state.products[productIndex].quantity + action.payload.quantity;
      }
    },
    increaseProduct: (state, action) => {
      const productIndex = Array.from(state.products).findIndex(
        (productInfo) => productInfo.product._id === action.payload.product?._id
      );
      if (productIndex !== -1) {
        state.products[productIndex].quantity += action.payload.quantity;
        state.quantity += action.payload.quantity;
      }
    },
    decreaseProduct: (state, action) => {
      const productIndex = Array.from(state.products).findIndex(
        (productInfo) => productInfo.product._id === action.payload.product?._id
      );
      if (productIndex !== -1) {
        state.products[productIndex].quantity -= action.payload.quantity;
        state.quantity -= action.payload.quantity;
      }

      if(state.products[productIndex].quantity <= 0) {
        state.products.splice(productIndex, 1);
      }
    },
  },
});

export const { addProduct, increaseProduct, decreaseProduct } = cartSlice.actions;
export default cartSlice.reducer;
