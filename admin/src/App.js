import { Fragment, useEffect } from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Login from "./pages/login/Login";
import NewProduct from "./pages/newProduct/NewProduct";
import NewUser from "./pages/newUser/NewUser";
import Product from "./pages/product/Product";
import ProductList from "./pages/productList/ProductList";
import User from "./pages/user/User";
import UserList from "./pages/userList/UserList";
import OrderList from "./pages/OrderList/OrderList";

function App() {
  const admin = useSelector((state) => state.auth?.currentUser?.isAdmin);
  const history = useHistory();
  useEffect(() => {
    if (!admin) {
      // Xử lý việc nếu không phải admin thì bắt login
      history.push("/login");
    }
  }, [admin]);
  return (
    <Fragment>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route path="/user/:id">
                <User />
              </Route>
              <Route exact path="/">
                <UserList />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Route path="/orders">
                <OrderList />
              </Route>
           
            </div>
          </>
        )}
      </Switch>
      <NotificationContainer />
    </Fragment>
  );
}

export default App;
