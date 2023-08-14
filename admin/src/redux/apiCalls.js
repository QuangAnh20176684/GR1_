import { DELETE, GET, POST, PUT } from "../fetchRequest";
import {
  loginFailure,
  loginReset,
  loginStart,
  loginSuccess,
} from "./authRedux";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux";
import {
  deleteUser,
  deleteUserFailure,
  deleteUserReset,
  deleteUserSuccess,
  detailUserSuccess,
  getUsers,
  getUsersFailure,
  getUsersReset,
  getUsersSuccess,
  updateUser,
  updateUserReset,
  updateUserSuccess,
} from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await POST("/auth/login", user);
    dispatch(loginSuccess(res));
  } catch (err) {
    console.log("err: ", err);
    dispatch(loginFailure());
    dispatch(loginReset());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await GET("/products");
    dispatch(getProductSuccess(res));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await DELETE(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await POST(`/products`, product);
    dispatch(addProductSuccess(res));
  } catch (err) {
    console.log('err: ', err);
    dispatch(addProductFailure());
  }
};

export const getListUsers = async (dispatch, params) => {
  dispatch(getUsers());
  try {
    const res = await GET("/users", params);
    dispatch(getUsersSuccess(res));
  } catch (err) {
    dispatch(getUsersFailure());
    dispatch(getUsersReset());
  }
};

export const deleteUserApi = async (dispatch, id) => {
  dispatch(deleteUser());
  try {
    const res = await DELETE(`/users/${id}`);
    dispatch(deleteUserSuccess(res));
  } catch (err) {
    dispatch(deleteUserFailure());
    dispatch(deleteUserReset());
  }
};

export const getUserByIdApi = async (dispatch, id) => {
  const res = await GET(`/users/find/${id}`);
  dispatch(detailUserSuccess(res));
};

export const updateUserByIdApi = async (dispatch, id, body) => {
  dispatch(updateUser());
  try {
    const res = await PUT(`/users/${id}`, body);
    dispatch(updateUserSuccess(res));
  } catch (err) {
    console.log('err: ', err);
    dispatch(updateUserReset());
  }
};
