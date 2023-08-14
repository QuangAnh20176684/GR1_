import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getAllOrders } from "../../redux/apiCalls";
import { Fragment } from "react";

export default function OrderList() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    getAllOrders(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "products",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        console.log("params: ", params);
        return (
          <Fragment>
            {params.row.products.map((product) => {
              return (
                <div
                  className="productListItem"
                  key={product?._id}
                  style={{
                    margin: "8px 0px",
                    width: "100%",
                  }}
                >
                  <img
                    className="productListImg"
                    src={product.productId.img}
                    alt=""
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <span>{product.productId.title}</span>
                    <b> x{product.quantity}</b>
                  </div>
                </div>
              );
            })}
          </Fragment>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            {params.row.address?.line1}, {params.row.address?.city},{" "}
            {params.row.address?.country}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
      renderCell: (params) => {
        let totalPrice = 0;
        params.row.products.forEach((product) => {
          totalPrice += product.productId.price * product.quantity;
        });
        return <div>{totalPrice}</div>;
      },
    },
   
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
