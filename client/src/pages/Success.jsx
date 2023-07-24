import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>
  );
};

export default Success;
// fix xong bug rồi đấy, h bạn muốn làm gì
// login ay ban 
// Chua hieu lam 
//phan d
// hoac ban xem ho toi phan hien thi san pham voi 
// login toi hoi t van :v


// t ghi các bước phải làm nhé
//  1. gọi API
// 2. Hiển thị loading
// 3. Có kết quả thì hiển thị ra màn hình
// Bạn làm được bước nào rồi, phan hien thi san pham toi chua lam gi 
// đâu, bạn gọi api như thế nào, toi da lam gi den no dau ban, that toi cha biet lam gi luon a :')
