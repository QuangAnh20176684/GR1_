import { useEffect, useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { UPLOAD } from "../../fetchRequest";
import { REQUEST_STATE } from "../../configs";
import { NotificationManager } from "react-notifications";
import { addProductReset } from "../../redux/productRedux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const isAddProduct = useSelector((state) => state.product?.isAddProduct);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("files", file);
      try {
        let product = {
          ...inputs,
          categories: cat,
        };

        const uploadFile = await UPLOAD("/upload/images", file);
        product = {
          ...product,
          img: uploadFile?.fileUrl,
        };

        addProduct(product, dispatch);
      } catch (err) {
        console.log("err: ", err);
      }
    } else {
      NotificationManager.error("Vui lòng tải lên ảnh sản phẩm!", "Thất bại");
    }
  };

  useEffect(() => {
    if (isAddProduct === REQUEST_STATE.SUCCESS) {
      NotificationManager.success("Tạo sản phẩm mới thành công!", "Thành công");
      dispatch(addProductReset());
    }
    if (isAddProduct === REQUEST_STATE.FAILURE) {
      NotificationManager.error(
        "Một lỗi đã xảy ra khi thêm sản phẩm!",
        "Thất bại"
      );
      dispatch(addProductReset());
    }
  }, [isAddProduct]);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          {isAddProduct === REQUEST_STATE.REQUEST ? "Đang tạo" : "Tạo mới"}
        </button>
      </form>
    </div>
  );
}
