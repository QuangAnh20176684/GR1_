import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserByIdApi } from "../../redux/apiCalls";
import "./user.css";
export default function User() {
  const router = useSelector((state) => state.router);
  const dispatch = useDispatch();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    getUserByIdApi(dispatch, router.location.pathname.replace("/user/", ""));
  }, []);
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>

          <div className="userUpdateLeft">
            <div className="userUpdateItem">
              <label>Username</label>
              <input
                type="text"
                placeholder="annabeck99"
                className="userUpdateInput"
                value={username}
                disabled
              />
            </div>
            <div className="userUpdateItem">
              <label>Email</label>
              <input
                type="text"
                placeholder="annabeck99@gmail.com"
                className="userUpdateInput"
                value={email}
              />
            </div>
          </div>
          <button className="userUpdateButton">Cập nhật</button>
        </div>
      </div>
    </div>
  );
}
