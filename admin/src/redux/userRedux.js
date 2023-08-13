import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../configs";

const userSlice = createSlice({
  name: "users",
  initialState: {
    listUsers: [],
    listUsersState: REQUEST_STATE.INITITAL,
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
  },
});

export const { getUsers, getUsersSuccess, getUsersFailure, getUsersReset } =
  userSlice.actions;
export default userSlice.reducer;
