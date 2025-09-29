import React from "react";
import { Route, Routes } from "react-router-dom";
import CompanyDash from "../Company/CompanyDash";
import Notfound from "../NotFound/Notfound";
import Addproduct from "../Company/Addproduct";
import Viewproducts from "../Company/Viewproducts";
import ViewSingleProduct from "../Company/ViewSingleProduct";

const CompanyRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<CompanyDash />} />
        <Route path="/add-product" element={<Addproduct />} />
        <Route path="/view-products" element={<Viewproducts />} />
        <Route path="/view-single-product/:id?" element={<ViewSingleProduct />} />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default CompanyRoutes;
