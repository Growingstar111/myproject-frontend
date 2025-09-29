import React, { useState } from "react";
import CustomerHeder from "./CustomerHeder";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  removeFromCart,
  updateCartQuantity,
  viewCart,
} from "../Endpoints/endpoints";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { removetoCart } from "../Redux/reducer";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["product"] });

  const getData = async () => {
    const resp = await viewCart();
    /* **************console ************/
    // console.log("response data", resp.data);
    return resp.data;
  };

  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: getData,
  });

  const mutationRemoveFromCart = useMutation({
    mutationFn: (product) => removeFromCart(product),
    onSuccess: (res) => {
      Swal.fire({
        text: "Product Removed From Cart",
        icon: "success",
      });
      // console.log(res.data, "remove cart");
    },
    onError: (error) => {
      console.log("error", error);
      Swal.fire({
        text: "Internal Server Error",
        icon: "error",
      });
    },
  });

  const mutationUpdateQuantity = useMutation({
    mutationFn: (values) => updateCartQuantity(values),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (error) => {
      console.log("error", error);
      Swal.fire({
        text: "Internal Server Error",
        icon: "error",
      });
    },
  });

  /********************* */
  // const produtid = data?.data?.map((item) => {
  //   return item?.products._id
  // })
  // console.log(produtid,"product..........................");
  
  const totalPrice = data?.data?.reduce((total, product) => {
    return total + product?.products?.price * (product?.quantity || 1);
  }, 
  0);

  return (
    <>
      <CustomerHeder />
      <div className="container-fluid my-5 ">
        <div className="row p-4">
          {/* Product List */}
          <div
            className="col-md-8  border p-3"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <h2 className="mb-1">Your Cart</h2>
            {data?.data?.length > 0 ? (
              data?.data?.map((product) => (
                <div
                  key={product?.products?._id}
                  className="card mb-3 rounded-0 shadow-sm p-3"
                  style={{ backgroundColor: "#f5f5f5" }}
                >
                  <div className="row g-0 align-items-center">
                    {/* Product Image */}
                    <div className="col-md-3">
                      <img
                        src={`http://localhost:5000/api/${product?.products?.image}`}
                        alt="Product"
                        className="img-fluid rounded-start"
                        style={{ height: "120px", objectFit: "cover" }}
                      />
                    </div>
                    {/* Product Details */}
                    <div className="col-md-6">
                      <div className="card-body">
                        <h5
                          className="card-title"
                          style={{ fontWeight: "bold" }}
                        >
                          {product?.products?.name}
                        </h5>
                        <p className="card-text text-muted">
                          {product?.products?.features}
                        </p>
                        <p className="card-text">
                          <strong>Price:</strong> ₹{product?.products?.price}
                        </p>
                      </div>
                    </div>
                    {/* Quantity Controls and Remove Button */}
                    <div className="col-md-3 text-end">
                      <div className="d-flex justify-content-end align-items-center">
                        {/* Quantity Controls */}
                        <div className="quantity-controls me-3">
                          <button
                            className="btn-sm btn-outline-secondary"
                            onClick={() => {
                              const newQuantity = Math.max(
                                1,
                                (product?.quantity || 1) - 1
                              );
                              mutationUpdateQuantity.mutate({
                                productId: product?.products?._id,
                                quantity: newQuantity,
                              });
                            }}
                          >
                            -
                          </button>
                          <span className="mx-2">{product?.quantity || 1}</span>
                          <button
                            className="btn-sm btn-outline-secondary"
                            onClick={() => {
                              const newQuantity =
                                product?.products?.stock > product?.quantity
                                  ? (product?.quantity || 1) + 1
                                  : product?.quantity;
                              mutationUpdateQuantity.mutate({
                                productId: product?.products?._id,
                                quantity: newQuantity,
                              });
                            }}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className=" btn-danger btn-sm"
                          onClick={() => {
                            mutationRemoveFromCart.mutate({
                              productId: product?.products?._id,
                            });
                            dispatch(removetoCart(1));
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3 className="text-center">Your Cart is Empty</h3>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div
            className="col-md-4  position-fixed end-0 "
            style={{ height: "500px" }}
          >
            <div className="card shadow-sm  rounded-0">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <hr />
                <p className="card-text">
                  <strong>Total Items:</strong> {data?.data?.length}
                </p>
                <p className="card-text">
                  <strong>Subtotal:</strong> ₹ {totalPrice?.toFixed(2)}
                </p>
                <hr />
                {/* Discount Code Input */}
                {/* <div className="mb-3">
                  <label htmlFor="discountCode" className="form-label">Discount Code</label>
                  <input type="text" className="form-control" id="discountCode" placeholder="Enter code" />
                </div>
                <button className=" btn-primary w-100">Apply Discount</button> */}
                <button className=" btn-success w-100 mt-3 py-2" onClick={()=>{ navigate("/customer/paynow", {
                                state: { cart: data?.data , totalPrice },
                              })
                              }}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
