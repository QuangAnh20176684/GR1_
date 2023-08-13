import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserByIdApi, updateUserByIdApi } from "../../redux/apiCalls";
import "./user.css";
import { REQUEST_STATE } from "../../configs";
import { NotificationManager } from "react-notifications";
import { updateUserReset } from "../../redux/userRedux";
export default function User() {
  const router = useSelector((state) => state.router);
  const userId = router.location.pathname.replace("/user/", "");
  const dispatch = useDispatch();
  const detailEditUser = useSelector((state) => state.user?.detailEditUser);
  const updateUserState = useSelector((state) => state.user?.updateUserState);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  function handleUpdateUser() {
    updateUserByIdApi(dispatch, userId, {
      username,
      email,
    });
  }

  useEffect(() => {
    getUserByIdApi(dispatch, userId);
  }, []);

  useEffect(() => {
    if (detailEditUser) {
      setUsername(detailEditUser.username);
      setEmail(detailEditUser.email);
    }
  }, [detailEditUser]);

  useEffect(() => {
    if (updateUserState === REQUEST_STATE.SUCCESS) {
      NotificationManager.success(
        "Cập nhật người dùng thành công!",
        "Thành công"
      );
      dispatch(updateUserReset());
    }
  }, [updateUserState]);
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Sửa thông tin</h1>
        </div>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Sửa</span>

          <div className="userUpdateLeft">
            <div className="userUpdateItem">
              <label>Username</label>
              <input
                type="text"
                placeholder="Nhập username"
                className="userUpdateInput"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled
                style={{
                  cursor: "not-allowed",
                }}
              />
            </div>
            <div className="userUpdateItem">
              <label>Email</label>
              <input
                type="text"
                placeholder="Nhập email"
                onChange={(e) => setEmail(e.target.value)}
                className="userUpdateInput"
                value={email}
              />
            </div>
          </div>
          <button
            className="userUpdateButton"
            onClick={handleUpdateUser}
            disabled={updateUserState === REQUEST_STATE.REQUEST}
          >
            {updateUserState === REQUEST_STATE.REQUEST
              ? "Đợic chút..."
              : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
}
