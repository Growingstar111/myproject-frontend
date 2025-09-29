import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerHome from "../Customer/CustomerHome";
import Notfound from "../NotFound/Notfound";
import Contactus from "../Customer/Contactus";
import ViewProfile from "../Customer/ViewProfile";
import ViewFavroite from "../Customer/ViewFavroite";
import Cart from "../Customer/Cart";
import PayNow from "../Customer/PayNow";
import ViewProduct from "../Customer/ViewProduct";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<CustomerHome />} />
      <Route path="/contact" element={<Contactus />} />
      <Route path="/profile/:id?" element={<ViewProfile />} />
      <Route path="/wishlist" element={<ViewFavroite />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/view-product/:id?" element={<ViewProduct />} />
    
      <Route path="/paynow" element={<PayNow />} />

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default CustomerRoutes;
