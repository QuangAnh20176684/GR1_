import { Publish } from "@material-ui/icons";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { GET, UPLOAD } from "../../fetchRequest";
import "./product.css";
import { NotificationManager } from "react-notifications";
import { updateProduct } from "../../redux/apiCalls";
import { REQUEST_STATE } from "../../configs";
import { updateProductReset } from "../../redux/productRedux";
import { useHistory } from "react-router-dom";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const history = useHistory();
  const isUpdateProduct = useSelector((state) => state.product.isUpdateProduct);
  const [inputs, setInputs] = useState({
    title: product?.title,
    desc: product?.desc,
    price: product?.price,
    inStock: product?.inStock,
  });
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const [pStats, setPStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", file);
    try {
      let product = {
        ...inputs,
      };
      if (file) {
        const uploadFile = await UPLOAD("/upload/images", file);
        product = {
          ...product,
          img: uploadFile?.fileUrl,
        };
      }

      updateProduct(productId, product, dispatch);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await GET("/orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);
  useEffect(() => {
    if (isUpdateProduct === REQUEST_STATE.SUCCESS) {
      NotificationManager.success(
        "Cập nhật sản phẩm mới thành công!",
        "Thành công"
      );
      dispatch(updateProductReset());
      setFile({})
      history.push("/products")
;    }
    if (isUpdateProduct === REQUEST_STATE.FAILURE) {
      NotificationManager.error(
        "Một lỗi đã xảy ra khi cập nhật sản phẩm!",
        "Thất bại"
      );
      dispatch(updateProductReset());
      setFile({})
    }
  }, [isUpdateProduct]);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Tạo mới sản phẩm</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Trạng thái:</span>
              <span className="productInfoValue">
                {product.inStock ? "Còn hàng" : "Hết hàng"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              placeholder={product.title}
              name="title"
              onChange={handleChange}
              value={inputs.title}
            />
            <label>Product Description</label>
            <input
              type="text"
              placeholder={product.desc}
              name="desc"
              onChange={handleChange}
              value={inputs.desc}
            />
            <label>Price</label>
            <input
              type="text"
              placeholder={product.price}
              name="price"
              onChange={handleChange}
              value={inputs.price}
            />
            <label>Còn hàng</label>
            <select
              name="inStock"
              id="idStock"
              onChange={handleChange}
              value={inputs.inStock}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <label for="file">
                <img src={product.img} alt="" className="productUploadImg" />
                <Publish />
              </label>
              {file?.name && <div>{file?.name}</div>}
              {console.log('file: ', file)}
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button onClick={handleClick} className="productButton">
              {isUpdateProduct === REQUEST_STATE.REQUEST
                ? "Đang tạo"
                : "Cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
