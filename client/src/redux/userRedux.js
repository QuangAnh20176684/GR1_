import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../configs";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isRequestLogin: REQUEST_STATE.INITITAL,
    isRegister: REQUEST_STATE.INITITAL,
    errorRegister: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isRequestLogin = REQUEST_STATE.REQUEST;
    },
    loginSuccess: (state, action) => {
      state.isRequestLogin = REQUEST_STATE.SUCCESS;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isRequestLogin = REQUEST_STATE.FAILURE;
    },
    resetLogin: (state) => {
      state.isRequestLogin = REQUEST_STATE.INITITAL;
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

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  resetLogin,
  registerStart,
  registerSuccess,
  registerFailure,
  resetRegister,
} = userSlice.actions;
export default userSlice.reducer;
