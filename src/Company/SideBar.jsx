import React from 'react';
import { Link } from 'react-router-dom';
// import styles from '../Admin/customStyle/AdminHome.module.css';
import './customStyle/comapnyHeader.css'
import { useDispatch } from "react-redux";
import { login } from "../Redux/reducer";
import { logoutUser } from "../Endpoints/endpoints";

import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
const Sidebar = () => {

   const dispatch = useDispatch();
  
    const logout = useMutation({
      mutationFn: (headers) => logoutUser(headers),
      onSuccess: (res) => {
        Swal.fire({
          title: "Logout successfully!!!",
          text: "You have Logged out succesfully",
          icon: "success",
        });
        dispatch(login(""));
        localStorage.clear();
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
       
      
          <div className="sidebar">
            <h4>Company Panel</h4>
            <ul>
               <Link to={'/company/dashboard'}> <li> <i className="bx bx-home me-2"></i>Home</li></Link>
               <Link to="/company/add-product"> <li><i className="bx bx-plus me-2"></i>Add Product</li></Link>
                <Link to="/company/view-products"><li> <i className="bx bx-list-ul me-2"></i>View All Products</li></Link>
                <Link ><li><i className="bx bx-bar-chart me-2"></i>Reports</li></Link>
                <li>  <button
                type="button "
                className='p-0'
                
                onClick={() => logout?.mutate()}
              >
                <i className="bx bx-log-out me-2"></i>Log Out
              </button></li>
            </ul>
        </div>
      
    );
};

export default Sidebar;