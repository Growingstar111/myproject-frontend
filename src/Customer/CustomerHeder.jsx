import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logoutUser, viewAllProductsForUsers } from "../Endpoints/endpoints";
import useUserId from "../hooks/useUserId";
import { login, removeCart, setSearch } from "../Redux/reducer";

const CustomerHeder = () => {
  const selector = useSelector((state) => state?.customers?.carts);
  console.log(selector,"???????????????//");

  const navigate = useNavigate();
  const userId = useUserId();
  const dispatch = useDispatch();
  // const [srchInput, setSrchInput] = useState();
const search = useSelector((state)=> state?.customers?.search)


  const mutationLogout = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      Swal.fire({
        title: "Logout successfully!!!",
        text: "You have Logged out succesfully",
        icon: "success",
      });
      dispatch(login(""));
      dispatch(removeCart(""));
      localStorage.clear();
    },
    onError: () => {
      Swal.fire({
        title: "Logout failed",
        text: "There was an error logging out",
        icon: "error",
      });
    },
  });
  return (
    <>
      <nav className="navbar navbar-expand-lg position-fixed start-0 end-0  top-0 " style={{zIndex:999}}>
        <div className="container-fluid">
          <a className="navbar-brand text-white">Tech Heaven</a>
          <button
            className="navbar-toggler text-white p-0 w-125"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon w-100">
              <label className="bar-menu w-100" htmlFor="check">
                <input type="checkbox" id="check" />

                <span className="top"></span>
                <span className="middle"></span>
                <span className="bottom"></span>
              </label>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to={"/customer/home"} className="nav-link text-white">
                  Home
                </Link>
              </li>
              {/* <li className="nav-item">
                        <Link className="nav-link text-white" >Features</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" >Pricing</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" >About</Link>
                    </li>*/}
              <li className="nav-item">
                <Link to={"/customer/wishlist"} className="nav-link text-white">
                  WishList
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/customer/contact"} className="nav-link text-white">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => {
                    navigate(`/customer/profile/${userId}`);
                  }}
                  className="nav-link text-white"
                >
                  Profile
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => {
                    navigate(`/customer/cart`);
                  }}
                  className="nav-link text-white"
                >
                  <CiShoppingCart />
                  {/* cart */}
                  {
                    <span className=" top-0 text-white start-100 translate-middle badge rounded-pill bg-danger">
                      {selector}
                    </span>
                  }
                </button>
              </li>
            </ul>

            {/* search button */}
            <ul className="p-0 mb-0 d-flex">
              <li>
                <div className="search-container d-flex">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="search-input py-0"
                    value={search}
                    onChange={(e) => {
                      dispatch(setSearch(e.target.value));
                    }}
                  />
                  <button
                    type="button"
                    className="search-button"
                    onClick={""}
                  >
                   <i class='bx bx-search '></i>
                  </button>
                </div>
              </li>
              <li className="">
                <button
                  type="button"
                  className="text-white fw-bold fs-5"
                  onClick={() => mutationLogout?.mutate()}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default CustomerHeder;
