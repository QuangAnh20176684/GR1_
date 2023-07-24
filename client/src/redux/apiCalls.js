import { loginFailure, loginStart, loginSuccess, registerStart, registerSuccess, registerFailure } from "./userRedux";
import { publicRequest } from "../requestMethods";
import { getProducts, getProductsFailure, getProductsSuccess } from "./productRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const registerUser = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};
// bắt đầu viết hàm gọi API
export const getAllProducts = async (dispatch, user) => {
  // lúc đầu thì dispatch getProducts để cập nhật trạng thái là bạn bắt đầu getProducts
  dispatch(getProducts());
  try {
    // Sau đó gọi api. Bạn cần check xem đầu api bên phía BE là gì
    // Dùng publicRequest vì nó là api không cần đăng nhập
    const res = await publicRequest.get("/api/products", user);
    console.log('res từ server: ', res)
    // Khi thành công
    dispatch(getProductsSuccess(res.data));
  } catch (err) {
    dispatch(getProductsFailure());
    // Khi thất bại
  }
};

// Tamj xong buwocs 1. H là dùng những thứ mình vừa viết. Bạn in thử ra xem response từ server là gì. H sẽ dùng hàm getAllProducts

