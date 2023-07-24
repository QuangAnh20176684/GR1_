import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../configs";

const productSlice = createSlice({
  name: "cart",
  initialState: {
    getProductState: REQUEST_STATE.INITITAL,
    products: [],
    total: 0,
  },
  reducers: {
    getProducts: (state, action) => {
      // lúc đầu cần cập nhật trạng thái của request
      state.getProductState = REQUEST_STATE.REQUEST;
    },
    getProductsSuccess: (state, action) => {
      // Khi request thành công, trạng thái sẽ là success
      // Khi thành công thì sẽ có danh sách sản phẩm. 
      state.getProductState = REQUEST_STATE.SUCCESS;
      state.products = action.payload.products; // aciton.payload là cái bạn dispatch lên, nó là 1 object. Bạn tự định nghĩa key.
      state.total = action.payload.total;
    },
    getProductsFailure: (state, action) => {
      // Khi request thất bại, trạng thái se là failure
      state.getProductState = REQUEST_STATE.FAILURE;
    },
  },
});

// b1: goi API
// 1.1: tạo ra các biến chứa thông tin về sản phẩm, trạng thái request trong state

export const { getProducts, getProductsSuccess, getProductsFailure } = productSlice.actions; // Cần export các hàm bạn viết ra
export default productSlice.reducer;
