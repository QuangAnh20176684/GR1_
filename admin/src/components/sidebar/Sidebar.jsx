import { AttachMoney, PermIdentity, Storefront } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const router = useSelector((state) => state.router);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li
                className={`sidebarListItem ${
                  router.location.pathname === "/users" && "active"
                }`}
              >
                <PermIdentity className="sidebarIcon" />
                Người dùng
              </li>
            </Link>
            <Link to="/products" className="link">
              <li
                className={`sidebarListItem ${
                  router.location.pathname === "/products" && "active"
                }`}
              >
                <Storefront className="sidebarIcon" />
                Sản phẩm
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li
                className={`sidebarListItem ${
                  router.location.pathname === "/orders" && "active"
                }`}
              >
                <AttachMoney className="sidebarIcon" />
                Đơn hàng
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
