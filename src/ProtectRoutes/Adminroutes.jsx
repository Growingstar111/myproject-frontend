import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "../Admin/Users";
import Notfound from "../NotFound/Notfound";
import Dashboard from "../Admin/Dashboard";
import ViewUser from "../Admin/ViewUser";
import AddCategory from "../Admin/AddCategory";
import ViewOrders from "../Admin/ViewOrders";
import ViewSingleOrder from "../Admin/ViewSingleOrder";

const Adminroutes = () => {
  return (
    <>
      <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/viewuser/:id?" element={<ViewUser />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/view-orders" element={<ViewOrders />} />
        {/* <Route path="/view/:id" element={<ViewSingleOrder />} /> */}
        <Route path="/view" element={<ViewSingleOrder />} />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default Adminroutes;
