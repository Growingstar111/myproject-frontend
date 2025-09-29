import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { addToCart, removeFromWishlist, viewWishlist } from "../Endpoints/endpoints";
import CustomerHeder from "./CustomerHeder";
import Swal from "sweetalert2";
import { Link, Navigate } from "react-router-dom";

const ViewFavroite = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["product"] });
  const getFav = async () => {
    const res = await viewWishlist();
    console.log(res.data);

    return res.data;
  };

  const { data , isError, isLoading} = useQuery({
    queryKey: ["product"],
    queryFn: getFav,
  });
  console.log("Data:", data);
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
  //  const mutaionForAddToCart = useMutation({
  //     mutationFn: (product) => addToCart(product),
  //     onSuccess: (res) => {
  //       console.log("carts", res?.data?.data);
  
  //       if (res.data.statusCode === 400) {
  //         Swal.fire({
  //           text: "Product is Already in your Cart",
  //           icon: "warning",
  //         });
  //       } else {
  //         Swal.fire({
  //           title: "Success",
  //           text: "Product is  Added to your Cart",
  //           icon: "success",
  //         });
  //         // dispatch(carts(res.data));
  //       }
  //     },
  
  //     onError: (error) => {
  //       console.log("errror---", error);
  //     },
  //   });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {Error.message}</div>;
  }
  return (
    <>
      <CustomerHeder />
    <div className="container mt-5">
    <div className="row">
        {data?.data?.length> 0 ? (
          data?.data?.map((product) => {
            return (
              <>
                <div className="col-md-4">
             
                                    {/* why my thiss link is not working well it is going to view-product having with product id but there product is not showing but from home page wheni aplly same logic it is showing */}
                  <div className="product-cardd">
                  <Link to={`/customer/view-product/${product?.wishlistItem?._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
          >
                    <div className="badge">{product?.wishlistItem?.brand}</div>
                    <div className="product-tumb">
                      <img
                        src={`http://localhost:5000/api/${product?.wishlistItem?.image}`}
                        alt="Product"
                      />
                    </div>
                    <div className="product-details ">
                      <span className="product-catagory  mb-2">
                        {product?.wishlistItem?.categoryInfo?.category}
                      </span>
                      <h4>
                        <a className="mb-2" href="">
                          {product?.wishlistItem?.name.slice(0,18)}...
                        </a>
                      </h4>
                      <p className="mb-1">
                     {product?.wishlistItem?.features.slice(0, 100)}...
                      </p>
                      <div className="product-bottom-details">
                        <div className="product-price p-0 m-0">
                          Price: ₹{product?.wishlistItem?.price}
                        </div>

                        <div className="product-links">
                          <button
                            type="button"
                            onClick={() =>
                              removeFromLiked.mutate({
                                productId: product?.wishlistItem?._id,
                              })
                            }
                          >
                            <FaHeart style={{ color: "red" }} />
                          </button>
                          {/* <button type="button" onClick={()=>{mutaionForAddToCart.mutate({
                                  productId: product?._id,
                                });
                                }}>
                           
                            <FaCartPlus />
                          </button> */}
                        </div>
                      </div>
                    </div>
                </Link>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <h1>Your Wishlist is empty</h1>
        )}
      </div>
    </div>
    </>
  );
};

export default ViewFavroite;
