import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../configs";

export const productSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    //GET ALL
    getOrdersSuccess: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const {getOrdersSuccess} = productSlice.actions;

export default productSlice.reducer;
