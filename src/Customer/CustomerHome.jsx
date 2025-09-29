import React, { useState } from "react";
import Swal from "sweetalert2";
import CustomerHeder from "./CustomerHeder";
import "./customStyle/userProduct.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
  viewAllProductsForUsers,
} from "../Endpoints/endpoints";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../Redux/reducer";
import { Link, useNavigate } from "react-router-dom";

const CustomerHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
 const search = useSelector((state)=>state?.customers?.search)
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["product"] });

  const getProducts = async () => {
    const res = await viewAllProductsForUsers(page,search);
    setTotalPage(res?.data?.totalCount);

    return res.data;
  };
  const { data } = useQuery({
    queryKey: ["product", page],
    queryFn: getProducts,
  });

  const isLikeMutaion = useMutation({
    mutationFn: (product) => addToWishlist(product),
    onSuccess: (res) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Product is  Added to  WishList"
      });
      
    },
    onError: (error) => {
      console.log("error", error);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
       
        title: error.message,
        icon: "error",
      });
    },
  });

  const removeFromLiked = useMutation({
    mutationFn: (product) => removeFromWishlist(product),

    onSuccess: (res) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Removed From  Wishlist",
       
      });

     
    },
    onError: (error) => {
      console.log("error", error);

    
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: error.message,
         
        });
     
    
    },


})
    const mutaionForAddToCart = useMutation({
    mutationFn: (product) => addToCart(product),
    onSuccess: (res) => {
      console.log("carts", res?.data?.data);

      if (res.data.statusCode === 400) {
         const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "warning",
                title: "Product is Already in your Cart",
               
              });
        
      } else {
        const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Product is  Added to your Cart"
              });
       
        
        dispatch(addtoCart(1));
        console.log("eeeeeeeeeeeeeeee");
      }
    },

    onError: (error) => {
      console.log("errror---", error);
    },
  });

 

  return (
    <>
      <CustomerHeder />

      <div className="container p-0 mt-3">
        <div className="row">
          {data &&
            data?.data?.map((product) => {
              return (
                <>
                  <div className="col-md-6 col-lg-4 col-sm-12">
                    {/* <button> */}
                  
                    <div className="product-cardd">
                    <Link
                      to={`/customer/view-product/${product._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="badge">{product?.brand}</div>
                    
                      <div className="product-tumb">
                     
                        <img
                          src={`http://localhost:5000/api/${product.image}`}
                          alt={product?.name}
                        />
                      </div>
                    </Link>
                      <div className="product-details">
                      <Link
                      to={`/customer/view-product/${product._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <span className="product-catagory  mb-2">
                          {product?.category}
                        </span>
                        <h4>
                          <a className="mb-2" href="">
                            {product?.name.slice(0,18)}...
                          </a>
                        </h4>
                       
                        <p className="mb-1"> {product?.features.slice(0,100)}...</p>
                          </Link>
                        <div className="product-bottom-details">
                          <div className="product-price p-0 m-0">
                            Price: ₹{product?.price}
                          </div>
                          {/* */}
                          <div className="product-links">
                            <button
                              type="button"
                              onClick={() => {
                                if (product?.wishItem) {
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
                              {product?.wishItem ? (
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
                        </div>
                      </div>
                 
                      {product?.stock == 0 ? (
                        <div className="out-of-stock">
                          <p className="text-center p-3 bg-danger">
                            Out of Stock
                          </p>
                        </div>
                      ) : (
                        <div className="p-2 d-flex justify-content-evenly">
                          <button
                            type="button"
                            className="btnu py-2 px-3"
                            onClick={() => {
                              mutaionForAddToCart.mutate({
                                productId: product?._id,
                              });
                            }}
                          >
                            Add To Cart
                            {/* <FaCartPlus /> */}
                          </button>
                          <button
                            type="button"
                            className="btnu py-2"
                            onClick={() =>
                              navigate("/customer/paynow", {
                                state: { products: [product] },
                              })
                            }
                          >
                            Buy Now
                          </button>
                        </div>
                      )}
                    </div>
                   
                   
                  </div>
                 
                </>
              );
            })}
        </div>
      {totalPage/10 > 1 ?
       ( <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={(e) => setPage(e.selected + 1)}
          pageRangeDisplayed={totalPage}
          pageCount={totalPage/10}
          previousLabel="< "
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="previous-item"
          previousLinkClassName="previous-link"
          nextClassName="next-item"
          nextLinkClassName="next-link"
          breakClassName="break-item"
          breakLinkClassName="break-link"
          activeClassName="selected"
          disabledClassName="disabled"
        /> 
      ) : ""
         } 
      </div>
    </>
  );
};

export default CustomerHome;
