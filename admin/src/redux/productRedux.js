import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../configs";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
    isAddProduct: REQUEST_STATE.INITITAL,
    isUpdateProduct: REQUEST_STATE.INITITAL,
  },
  reducers: {
    //GET ALL
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateProductStart: (state) => {
      state.isUpdateProduct = REQUEST_STATE.REQUEST;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isUpdateProduct = REQUEST_STATE.SUCCESS;
    },
    updateProductFailure: (state) => {
      state.isUpdateProduct = REQUEST_STATE.FAILURE;
    },
    updateProductReset: (state) => {
      state.isUpdateProduct = REQUEST_STATE.INITITAL;
    },
    //UPDATE
    addProductStart: (state) => {
      state.isAddProduct = REQUEST_STATE.REQUEST;
    },
    addProductSuccess: (state, action) => {
      state.isAddProduct = REQUEST_STATE.SUCCESS;
      state.products.push(action.payload);
    },
    addProductFailure: (state) => {
      state.isAddProduct = REQUEST_STATE.FAILURE;
    },
    addProductReset: (state) => {
      state.isAddProduct = REQUEST_STATE.INITITAL;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  addProductReset,
  updateProductReset,
} = productSlice.actions;

export default productSlice.reducer;
