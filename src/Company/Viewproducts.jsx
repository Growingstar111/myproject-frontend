import React from "react";
import styles from "../Admin/customStyle/AdminHome.module.css";
import Sidebar from "./SideBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProducts } from "../Endpoints/endpoints";
import "./customStyle/produc.css";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
const Viewproducts = () => {
  const navigate = useNavigate();
   const queryClient = useQueryClient()
  queryClient.invalidateQueries({ queryKey: ['products'] })

  const getData = async () => {
    const res = await getAllProducts();

    return res.data;
  };

  const { data,refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
    
  });
  return (
    <>
      <div className={styles.adminHomeContainer}>
        <Sidebar />
        <div className={styles.mainContent}>
          <div className="container product-table ">
            view products !!!!!
            <table>
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Name</th>
                  <th>brand</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>view</th>
                  {/* <th>Stock</th> */}
                  {/* <th>Description</th> */}
                  {/* <th>Features</th> */}
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((product) => {
                  return (
                    <tr>
                      {/* <td>{product._id}</td> */}
                      <td>{product.name}</td>
                      <td>{product.brand}</td>
                      <td>{product.price}</td>
                      <td>{product.categoryInfo.category}</td>
                   

                      {/* <td> <img src={`http://localhost:5000/api/${product.image}`} alt="Product image" width={"100%"} height={"100%"} /></td> */}
                      <td>
                        <button
                         
                          onClick={() => {
                            navigate(`/company/view-single-product/${product?._id}`);
                          }}
                        >
                         
                         <GrView style={{ color: "green" }}  />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Viewproducts;
