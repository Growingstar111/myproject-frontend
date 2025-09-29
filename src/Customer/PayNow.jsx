import React, { useState } from "react";
import { Element } from "../Stripe/Element";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import {
  addNewAddress,
  deleteAddress,
  getUserAddress,
} from "../Endpoints/endpoints";
// import { products } from "../../../server/models/product";

const PayNow = () => {
  const location = useLocation();

  const fromBuyNow = location?.state?.products;
  const fromCart = location?.state?.cart;
// console.log(fromBuyNow,"fromBuyNow");
// console.log(fromCart,"fromCart");
// const productss = {productId:fromCart[0]?.productId, quantity:fromCart[0]?.quantity, price:fromCart[0]?.products?.price,company: fromCart[0]?.company}
// const pro = fromCart.map((item) => item?.products);
// console.log(productss,"prodcustssjjdjdjdjdfhfh");
// const productswww = [
//  { productId: fromCart?.map((item)=>item?.productId)}
// ]
//  console.log(location.state,"....................................................");
 
 
  const totalPrice = fromCart
    ? fromCart.reduce((total, item) => total + item.products.price * item.quantity,0)
    : fromBuyNow
    ? fromBuyNow.reduce((total, item) => total + item.price, 0)
    : 0;
   

  const [show, setShow] = useState(false);
  const [stepZero, setstepZero] = useState(true);
  const [stepOne, setstepOne] = useState(false);
  const [stepTwo, setstepTwo] = useState(false);
  const [stepThree, setstepThree] = useState(false);
  const [stepFour, setstepFour] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedProducts, setSelectedProducts] = useState();

  const queryClient = useQueryClient();
console.log(selectedProducts,"selectedProducts");
// const product = selectedProducts?.map((item) => item?.products?.)
// console.log(product,"............................................>>>>");


  // console.log(fromCart, "carttt");
  // console.log(location.state, "locatiojsdnfsnfd");
  const { data } = useQuery({
    queryKey: ["address"],
    queryFn: async () => {
      const res = await getUserAddress();
      return res?.data;
    },
  });

  const mutationAdd_address = useMutation({
    mutationFn: (values) => addNewAddress(values),
    onSuccess: (res) => {
      queryClient.invalidateQueries("[address]");
      Swal.fire({
        text: "Address is Added successfully",
        icon: "success",
      });
      formik?.resetForm();

      // setstepOne(true), setstepZero(false);
    },
    onError: (error) => {
      console.log(error, "error---");
      Swal.fire({
        text: "Somthing Went wrong",
        icon: "error",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      phone: yup.string().required(),
      street: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
      pincode: yup.string().min(6).max(10).required(),
    }),
    onSubmit: (values) => {
      mutationAdd_address.mutate(values);
      setShow(false)
    },
  });

  const mutationDeleterr = useMutation({
    mutationFn: (addressId) => deleteAddress(addressId),
    onSuccess: (res) => {
      queryClient.invalidateQueries("[address]");
      Swal.fire({
        text: "address deleted successfully",
        icon: "success",
      });
    },
    onError: (error) => {
      console.log(error, "errorrr----");

      Swal.fire({
        text: "something went wrong",
        icon: "error",
      });
    },
  });


  return (
    <>
      <div
        className="container-fluid position-fixed end-0 start-0 top-0 text-light p-2"
        style={{
          backgroundColor: "#3bb19b",
          zIndex: "999",
        }}
      >
        TechHeaven
      </div>

      <div className="container-fluid mt-5">
        <div className="row p-3 px-2">
          <div className="col-md-8 col-sm-8 col-lg-8">
            {/* Delivery Address */}
            <div className="card shadow-sm rounded-0">
              <div className="card-header">DELIVERY ADDRESS </div>

              {stepZero && (
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-check">
                        {data &&
                          data?.findAddress?.map((user) => {
                            return (
                              <>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="deliveryAddress"
                                  id={user?._id}
                                  onChange={() => {
                                    setSelectedAddress(user?._id);
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={user?._id}
                                >
                                  <strong>{user?.name}</strong>
                                  <br />
                                  <span>{user?.phone}</span>
                                  <br />
                                  <span>HOME</span>
                                  <br />
                                  <span>
                                    {user?.street}, {user?.city}, {user?.state},{" "}
                                    {user?.pincode}
                                  </span>
                                </label>
                                <div className="text-end w-100 d-flex justify-content-end">
                                  <button
                                    className="btn-sm btn-success float-end me-2"
                                    onClick={() => {
                                      if (selectedAddress) {
                                        setstepOne(true), setstepZero(false);
                                      }
                                    }}
                                  >
                                    DELIVER HERE
                                  </button>
                                  <button
                                    type="button"
                                    className="bg-danger text-white rounded px-3"
                                    onClick={() =>
                                      mutationDeleterr.mutate({
                                        addressId: user?._id,
                                      })
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            );
                          })}
                      </div>

                      {/* Address Form */}
                      {show && (
                        <div className="mt-3">
                          <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              value={formik?.values?.name}
                              onChange={formik?.handleChange}
                              onBlur={formik?.handleBlur}
                            />
                          </div>
                          <p className="text-danger m-0">
                            {formik?.touched?.name && formik?.errors?.name}
                          </p>

                          <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                              Phone Number
                            </label>

                            <PhoneInput
                              type="number"
                              className=" m-0 "
                              onBlur={formik?.handleBlur}
                              placeholder="Phone Number"
                              country={"in"}
                              value={formik?.values?.phone}
                              onChange={(phone) => {
                                const formattedPhone = phone.startsWith("+")
                                  ? phone
                                  : `+${phone}`;
                                formik?.setFieldValue("phone", formattedPhone);
                              }}
                              inputProps={{
                                name: "phone",
                                required: true,
                              }}
                              inputStyle={{
                                width: "100%",
                              }}
                              enableSearch={true}
                            />
                          </div>
                          <p className="text-danger m-0">
                            {formik?.touched?.phone && formik?.errors?.phone}
                          </p>

                          <div className="mb-3">
                            <label htmlFor="street" className="form-label">
                              Address (Area and Street)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="street"
                              name="street"
                              value={formik?.values?.street}
                              onChange={formik?.handleChange}
                              onBlur={formik?.handleBlur}
                            />
                          </div>
                          <p className="text-danger m-0">
                            {formik?.touched?.street && formik?.errors?.street}
                          </p>
                          <div className="mb-3">
                            <label htmlFor="pincode" className="form-label">
                              Pincode
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="pincode"
                              name="pincode"
                              min={6}
                              value={formik?.values?.pincode}
                              onChange={formik?.handleChange}
                              onBlur={formik?.handleBlur}
                            />
                          </div>
                          <p className="text-danger m-0">
                            {formik?.touched?.pincode &&
                              formik?.errors?.pincode}
                          </p>
                          <div className="mb-3">
                            <label htmlFor="city" className="form-label">
                              City/District/Town
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="city"
                              name="city"
                              value={formik?.values?.city}
                              onChange={formik?.handleChange}
                              onBlur={formik?.handleBlur}
                            />
                          </div>
                          <p className="text-danger m-0">
                            {formik?.touched?.city && formik?.errors?.city}
                          </p>
                          <div className="mb-3">
                            <label htmlFor="state" className="form-label">
                              State
                            </label>
                            <input
                              className="form-select"
                              id="state"
                              name="state"
                              value={formik?.values?.state}
                              onChange={formik?.handleChange}
                              onBlur={formik?.handleBlur}
                            />
                             
                          </div>
                          <p className="text-danger m-0">
                            {formik?.touched?.state && formik?.errors?.state}
                          </p>
                          <div className="mb-3">
                            <button
                              type="button"
                              className=" btn-success w-50 py-2 "
                              onClick={() => {
                                formik?.handleSubmit();
                              }}
                            >
                              SAVE ADDRESS
                            </button>
                            <button
                              type="button"
                              className=" btn-danger w-50 mt-2 py-2"
                              onClick={() => {
                                setShow(false);
                              }}
                            >
                              CANCEL
                            </button>
                          </div>
                        </div>
                      )}

                      <button
                        className="-sm btn-primary w-100 mt-3 py-2"
                        type="button"
                        onClick={() => setShow(true)}
                      >
                        Add a new address
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}

            <div className="card shadow-sm rounded-0 mt-3">
              <div className="card-header">ORDER SUMMARY</div>

              {/* Static Product List */}
              {stepOne && (
                <>
                  {fromBuyNow && (
                    <div
                      className="card mb-3 rounded-0 shadow-sm p-3"
                      style={{ backgroundColor: "#f5f5f5" }}
                    >
                      <div className=" g-0 d-flex flex-row align-items-center">
                        {/* Product Image */}
                        <div className="col-md-3">
                          <img
                            src={`http://localhost:5000/api/${fromBuyNow?.map(
                              (item) => {
                                return item?.image;
                              }
                            )}`}
                            alt="Product"
                            className="img-fluid rounded-start"
                            style={{ height: "180px", objectFit: "cover" }}
                          />
                        </div>
                        {/* Product Details */}
                        <div className="col-md-6 ">
                          <div className="card-body">
                            <h5
                              className="card-title"
                              style={{ fontWeight: "bold" }}
                            >
                              {fromBuyNow?.map((item) => {
                                return item?.name;
                              })}
                            </h5>

                            {/* <div className="d-flex align-items-start mb-5 justify-content-end me-5"> */}
                            <p className=" bg-danger  text-white px-2 my-3 py-1 d-inline rounded ">
                              {fromBuyNow?.map((item) => {
                                return item?.brand;
                              })}
                            </p>
                            {/* </div> */}

                            <p className="card-text text-muted mt-2">
                              {fromBuyNow?.map((item) => {
                                return item?.features;
                              })}
                            </p>
                            {/* <p className="card-text text-muted">
                          {fromBuyNow?.map((item) => {
                            return item?.description;
                          })}
                        </p> */}
                            <p className="card-text">
                              <strong>Price:</strong> ₹
                              {fromBuyNow?.map((item) => {
                                return item?.price;
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  )}
                  {fromCart &&
                    fromCart.map((item) => (
                      <>
                        <div
                          key={item._id} // Ensure each item has a unique key
                          className="card mb-3 rounded-0 shadow-sm p-3"
                          style={{ backgroundColor: "#f5f5f5" }}
                        >
                          <div className="g-0 d-flex flex-row align-items-center">
                            {/* Product Image */}
                            <div className="col-md-3">
                              <img
                                src={`http://localhost:5000/api/${item?.products?.image}`} // Use the current item's image
                                alt="Product"
                                className="img-fluid rounded-start"
                                style={{ height: "180px", objectFit: "cover" }}
                              />
                            </div>
                            {/* Product Details */}
                            <div className="col-md-6">
                              <div className="card-body">
                                <h5
                                  className="card-title"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {item?.products?.name}{" "}
                                  {/* Use the current item's name */}
                                </h5>

                                <p className="bg-danger text-white px-2 my-3 py-1 d-inline rounded">
                                  {item?.products?.brand}{" "}
                                  {/* Use the current item's brand */}
                                </p>

                                <p className="card-text text-muted mt-2">
                                  {item?.products?.features}{" "}
                                  {/* Use the current item's features */}
                                </p>

                                <p className="card-text">
                                  <strong>Price:</strong> ₹
                                  {item?.products?.price}{" "}
                                  {/* Use the current item's price */}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="d-flex justify-content-center align-items-center">
                                <span className="px-4 bg-success rounded  text-white py-2">
                                  {" "}
                                  Quantity : {item?.quantity}{" "}
                                
                                </span>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </div>
                      </>
                    ))}
                  <button
                    className="btn-success w-100 mt-3 py-2"
                    type="button"
                    onClick={() => {
                      if (fromBuyNow) {
                        setSelectedProducts(fromBuyNow);
                      } else if (fromCart) {
                        setSelectedProducts(fromCart);
                      }

                      setstepTwo(true);
                      setstepOne(false);
                    }}
                  >
                    Continue
                  </button>
                </>
              )}
            </div>

            {/* Payment Options */}
            <div className="card shadow-sm rounded-0 mt-3">
             {/* <p>{selectedAddress}{selectedProducts}</p> */}
              <div className="card-header">PAYMENT OPTIONS</div>
              {stepTwo && (
                <div className="card-body">
                  <Element
                    selectedAddress={selectedAddress}
                    selectedProducts={selectedProducts}
                    totalPrice={fromBuyNow ? fromBuyNow[0]?.price : totalPrice}
                    accountId={fromBuyNow ?  fromBuyNow[0]?.company : fromCart[0]?.company  }
                  />
                   
                 
                
                
                  
                  {/* here is total price is correct */}
                </div>
              )}
            </div>
          </div>

          {/* Price Details */}
          <div className="col-md-4 col-sm-4 col-lg-4">
            <div
              className="col-md-4 position-fixed end-0 top-100px"
              style={{ height: "500px" }}
            >
              <div className="card shadow-sm rounded-0">
                <div className="card-header">PRICE DETAILS</div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>
                      Total Items:
                      {fromBuyNow && location?.state?.products?.length}{" "}
                      {fromCart && fromCart?.length}
                     
                    </strong>
                  </p>
                  <p className="card-text">
                    <strong>
                      {fromCart && (
                        <p>Total Payable: ₹{totalPrice?.toFixed(2)}</p>
                      )}

                      {fromBuyNow &&
                        fromBuyNow?.map((item) => {
                          return (
                            <>
                              <p>Total Payable: ₹{item?.price}</p>
                              {/* i want to send this price in props if fromBuy now and totalPrice if fromCart */}
                            </>
                          );
                        })}
                    </strong>
                  </p>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayNow;
