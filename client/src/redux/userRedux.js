import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../configs";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isRegister: REQUEST_STATE.REQUEST,
    errorRegister: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registerStart: (state) => {
      state.isRegister = REQUEST_STATE.REQUEST;
    },
    registerSuccess: (state, action) => {
      state.isRegister = REQUEST_STATE.SUCCESS;
    },
    registerFailure: (state) => {
      state.isRegister = REQUEST_STATE.FAILURE;
    },
    resetRegister: (state) => {
      state.isRegister = REQUEST_STATE.INITITAL;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, resetRegister } = userSlice.actions;
export default userSlice.reducer;
