import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router-dom";
import { checkoutAllProduct } from "../redux/cartRedux";

const Success = () => {
  const history = useHistory();
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const createOrder = async () => {
      try {
        console.log("cart: ", cart);

        const res = await userRequest.post("/orders", {
          userId: currentUser?._id,
          products: cart.products.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
          })),
          amount: cart.quantity,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch (error) {
        console.log("error: ", error);
      }
      dispatch(checkoutAllProduct({}));
      setTimeout(() => {
        history.push("/");
      }, 2000);
    };
    data && createOrder();
    console.log("data: ", data);
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 0",
        background: "#EBF0F5",
        height: "400px",
      }}
    >
      <div
        style={{
          borderRadius: "200px",
          height: "200px",
          width: "200px",
          background: "#F8FAF5",
          margin: "0 auto",
        }}
      >
        <i
          className="checkmark"
          style={{
            color: "#9ABC66",
            fontSize: "100px",
            lineHeight: "200px",
            marginLeft: "-15px",
          }}
        >
          ✓
        </i>
      </div>
      <h1
        style={{
          color: "#88B04B",
          fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
          fontWeight: 900,
          fontSize: "40px",
          marginBottom: "10px",
        }}
      >
        Success
      </h1>
      <p>
        {orderId}? Order has been created successfully. Your order number is $
        {orderId}: `Successfull. Your order is being prepared...`
      </p>
      <button
        style={{ padding: 10, marginTop: 20 }}
        onClick={() => {
          history.push("/");
        }}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
