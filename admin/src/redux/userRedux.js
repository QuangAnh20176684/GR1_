import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../configs";

const userSlice = createSlice({
  name: "users",
  initialState: {
    listUsers: [],
    listUsersState: REQUEST_STATE.INITITAL,
    deleteUserState: REQUEST_STATE.INITITAL,
    detailUser: {},
  },
  reducers: {
    getUsers: (state, action) => {
      state.listUsersState = REQUEST_STATE.REQUEST;
    },
    getUsersSuccess: (state, action) => {
      state.listUsersState = REQUEST_STATE.SUCCESS;
      state.listUsers = action.payload.map((user) => ({
        id: user._id,
        ...user,
      }));
    },
    getUsersFailure: (state, action) => {
      state.listUsersState = REQUEST_STATE.FAILURE;
    },
    getUsersReset: (state, action) => {
      state.listUsersState = REQUEST_STATE.INITITAL;
    },
    deleteUser: (state, action) => {
      state.deleteUserState = REQUEST_STATE.REQUEST;
    },
    deleteUserSuccess: (state, action) => {
      state.deleteUserState = REQUEST_STATE.SUCCESS;
    },
    deleteUserFailure: (state, action) => {
      state.deleteUserState = REQUEST_STATE.FAILURE;
    },
    deleteUserReset: (state, action) => {
      state.deleteUserState = REQUEST_STATE.INITITAL;
    },
    detailUserSuccess: (state, action) => {
      state.detailUser = action.payload;
    },
  },
});

export const {
  getUsers,
  getUsersSuccess,
  getUsersFailure,
  getUsersReset,
  deleteUser,
  deleteUserFailure,
  deleteUserReset,
  deleteUserSuccess,
  detailUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
