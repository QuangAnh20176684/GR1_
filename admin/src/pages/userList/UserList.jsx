import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUserApi, getListUsers } from "../../redux/apiCalls";
import "./userList.css";
import { REQUEST_STATE } from "../../configs";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.listUsers);
  const deleteUserState = useSelector((state) => state.user?.deleteUserState);
  const handleDelete = (id) => {
    deleteUserApi(dispatch, id);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Vai trò",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row?.isAdmin ? "Admin" : "User"}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Sửa</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getListUsers(dispatch);
  }, []);

  useEffect(() => {
    if (deleteUserState === REQUEST_STATE.SUCCESS) {
      getListUsers(dispatch);
    }
  }, [deleteUserState]);

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
