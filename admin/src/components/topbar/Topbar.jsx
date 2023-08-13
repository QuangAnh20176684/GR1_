import React from "react";
import "./topbar.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Topbar() {
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const history = useHistory();
  function handleLogout() {
    localStorage.removeItem("persist:root");
    window.location.reload();
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">lamaadmin</span>
        </div>
        <div className="topRight">
          <div className="username">{currentUser?.username}</div>
          <div
            style={{
              marginRight: 10,
              textDecoration: "underline",
              color: "#0000EE",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            Đăng xuất
          </div>
        </div>
      </div>
    </div>
  );
}
