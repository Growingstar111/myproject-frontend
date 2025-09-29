import React from "react";
import CustomerHeder from "./CustomerHeder";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
  viewSingleProductt,
} from "../Endpoints/endpoints";
import { addtoCart } from "../Redux/reducer";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const ViewProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  queryClient.invalidateQueries(["viewproduct"]);
  const { data } = useQuery({
    queryKey: ["viewproduct"],
    queryFn: async () => {
      const res = await viewSingleProductt(id);
      return res.data;
    },
  });

  const mutaionForAddToCart = useMutation({
    mutationFn: (product) => addToCart(product),
    onSuccess: (res) => {
      console.log("carts", res?.data?.data);

      if (res.data.statusCode === 400) {
        Swal.fire({
          text: "Product is Already in your Cart",
          icon: "warning",
        });
      } else {
        Swal.fire({
          title: "Success",
          text: "Product is  Added to your Cart",
          icon: "success",
        });
        dispatch(addtoCart(1));
        console.log("eeeeeeeeeeeeeeee");
      }
    },

    onError: (error) => {
      console.log("errror---", error);
    },
  });

  const removeFromLiked = useMutation({
    mutationFn: (product) => removeFromWishlist(product),

    onSuccess: (res) => {
      Swal.fire({
        title: "Removed!!",
        text: "Removed From Your Wishlist",
        icon: "success",
      });
    },
    onError: (error) => {
      console.log("error", error);
      Swal.fire({
        title: "error",
        text: error.message,
        icon: "error",
      });
    },
  });

  const isLikeMutaion = useMutation({
    mutationFn: (product) => addToWishlist(product),
    onSuccess: (res) => {
      Swal.fire({
        title: "Added",
        text: "Added To Your Wishlist",
        icon: "success",
      });
    },
    onError: (error) => {
      console.log("error", error);

      Swal.fire({
        title: "error",
        text: error.message,
        icon: "error",
      });
    },
  });
  return (
    <>
      <CustomerHeder />
      <div className="container-fluid py-3 px-3 mt-5">
        <div className="row py-3">
          {data?.data?.map((product) => {
            return (
              <>
                <div className="col-md-5">
                  <div
                    className="border p-3"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    {" "}
                    <img
                      src={`http://localhost:5000/api/${product.image}`}
                      alt="Product"
                      className="product-image"
                      width={"100%"}
                      height={"100%"}
                      style={{ minHeight: "350px" }}
                    />
                  </div>
                </div>
                <div className="col-md-7">
                  <div
                    className="border p-3"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <div className="d-flex">
                      {" "}
                      <h2 className="mb-3 w-100 ">{product?.name}</h2>{" "}
                      <button
                        className="mb-3"
                        type="button"
                        onClick={() => {
                          if (product?.isWishlist) {
                            removeFromLiked.mutate({
                              productId: product?._id,
                            });
                          } else {
                            isLikeMutaion.mutate({
                              productId: product?._id,
                            });
                          }
                        }}
                      >
                        {product?.isWishlist ? (
                          <i
                            className="fa-solid fa-heart fs-4"
                            style={{ color: "red" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-regular fa-heart "
                            style={{ color: "black" }}
                          ></i>
                        )}
                      </button>
                    </div>
                    <h6 className="bg-danger  text-white px-2 py-1 d-inline rounded fs-5 ">
                      {product?.brand}
                    </h6>
                    <p className="my-3">
                      <span className="fw-bold">Features: </span>
                      {product?.features}
                    </p>
                    <p className="mt-0 mb-3">
                      <span className="fw-bold"> Description: </span>
                      {product?.description}
                    </p>
                    <h4 className="fw-bold  mb-3">₹{product?.price}</h4>
                    <p>
                      {product?.stock > 0 ? (
                        <p className="bg-success text-white px-2 py-1 d-inline rounded ">
                          Available
                        </p>
                      ) : (
                        <p className="bg-danger text-white px-2 py-1 d-inline rounded ">
                          Out of Stock
                        </p>
                      )}
                    </p>
                  </div>
                  <div
                    className="border  mt-1 d-flex"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <button
                      className="w-100 bg-warning p-2 text-white fs-4 m-1"
                      onClick={() => {
                        product?.stock > 0 ?  mutaionForAddToCart.mutate({
                          productId: product?._id,
                        }) :( Swal.fire({text:"Product Is currently out of Stock", icon:"error"}))
                      }}
                    >
                      Add To Cart
                    </button>
                    <button
                      className="w-100  p-2 m-1 text-white fs-4"
                      style={{ backgroundColor: "#4caf50" }}
                      onClick={() => {
                        if (product?.stock > 0) {
                          navigate("/customer/paynow", {
                            state: { products: [product] },
                          });
                        }
                        else{
                          Swal.fire({
                            text:"Product is Currently out of stock",
                            icon:"error"
                          })
                        }
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
