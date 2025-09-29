import React from "react";
import styles from "./customStyle/AdminHome.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../Endpoints/endpoints";
import { useDispatch } from "react-redux";
import { login } from "../Redux/reducer";
import Swal from "sweetalert2";
function AdminSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mutationLogout = useMutation({
    mutationFn: (headers) => logoutUser(headers),
    onSuccess: (res) => {
      Swal.fire({
        title: "Logout successfully!!!",
        text: "You have Logged out succesfully",
        icon: "success",
      });
      dispatch(login(""));
      localStorage.clear();
      navigate("/home");
    },
    onError: (Error) => {
      Swal.fire({
        title: "Request Failed!",
        text: "Something went wrong Please Try Again!!",
        icon: "error",
      });
    },
  });

  return (
    <div className={styles.sidebar}>
      <h2>Admin Panel</h2>
      <ul>
        <Link to={"/admin/dashboard"}>
          {" "}
          <li className="align-items-center d-flex">
            {" "}
            <i className="bx bxs-dashboard fs-3 me-2"></i>Dashboard
          </li>
        </Link>
        <Link to={"/admin/user"}>
          <li className="align-items-center d-flex">
            <i className="bx bxs-user-detail fs-3 me-2"></i>View All Users
          </li>
        </Link>
        {/* <Link>
          {" "}
          <li className="align-items-center d-flex">
            <i className="bx bxs-cog fs-3 me-2"></i>Settings
          </li>
        </Link> */}
        <Link to={'/admin/view-orders'}>
          <li className="align-items-center d-flex">
            <i className="bx bx-list-ul fs-3 me-2"></i>Orders
          </li>
        </Link>
        <Link to={"/admin/add-category"}>
          <li className="align-items-center d-flex">
            <i className="bx bxs-category fs-3 me-2"></i>Category Section
          </li>
        </Link>
        <li>
          {" "}
          <button type="button" className="p-0 align-items-center d-flex" onClick={() => mutationLogout.mutate()}>
            <i className="bx bxs-log-out fs-3 me-2 "></i>Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AdminSideBar;
