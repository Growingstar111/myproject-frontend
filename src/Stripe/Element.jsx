import React, { useState } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckOutForm } from "./CheckOut";
const stripeKey = loadStripe(
  "pk_test_51QcM58JMY8QRheFJz0ftBaVn2IczowlHhI8DFVPb7k9bJObGbnWDSGs6r8Uuw7HqtigvOutw2HxraaZcW0i9FkW500X8o105P5"
);

export const Element = ({ selectedAddress, selectedProducts, totalPrice , accountId}) => (
 
 
    // console.log(selectedProducts,"elements products"),
  <Elements stripe={stripeKey} >
    <CheckOutForm 
     selectedAddress={selectedAddress}
      selectedProducts={selectedProducts}
      totalPrice={totalPrice}
      accountId={accountId}
      />
      
  </Elements>
);
