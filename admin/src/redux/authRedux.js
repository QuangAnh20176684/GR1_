import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../configs";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isLogin: REQUEST_STATE.INITITAL,
  },
  reducers: {
    loginStart: (state) => {
      state.isLogin = REQUEST_STATE.REQUEST;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLogin = REQUEST_STATE.SUCCESS;
    },
    loginFailure: (state) => {
      state.error = true;
      state.isLogin = REQUEST_STATE.FAILURE;
    },
    loginReset: (state) => {
      state.isLogin = REQUEST_STATE.INITITAL;
      state.currentUser = null;
    },
    logout: (state) => {
      state.isLogin = REQUEST_STATE.INITITAL;
      state.currentUser = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, loginReset, logout } = authSlice.actions;
export default authSlice.reducer;
