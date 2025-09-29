import React, { useState } from "react";
import styles from "./customStyle/AdminHome.module.css";
import AdminSideBar from "./AdminSideBar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCategory, getcategories } from "../Endpoints/endpoints";
import Swal from "sweetalert2";

const AddCategory = () => {
  const [show, setShow] = useState(false);
  const [categoryShow, setCategoryShow] = useState(false);
  const [categoryName, setCategoryName] = useState('');


  const categoryMutaion = useMutation({
    mutationFn:(catgory)=> addCategory(catgory),
    onSuccess:(res)=>{
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
        title: "Category Added Succesfully."
      });
      setShow(false);
    },
    
    onError:(error)=>{
      console.log(error,"error");
      
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
        title: "Somthing Went Wrong"
      });
    }
  });

  const getData = async()=>{
    const res = await getcategories()
    console.log(res.data);
    return res.data
    
}

   const { data } = useQuery({
      queryKey:["category"],
      queryFn:()=> getData()
   })
   

  return (
    <>
      <div className={styles.adminHomeContainer}>
        <AdminSideBar />

        <div className={styles.mainContent}>
          <header className={styles.header}>
            <h1>Welcome To Category Section</h1>
          </header>
          <div>
            <button
              type="button "
              className="bg-warning m-3 px-4 py-2 text-white rounded"
              onClick={() => {
                setShow(false), setCategoryShow(true);
              }}
            >
              View Categories
            </button>
            <button
              type="button"
              onClick={() => {
                setShow(true), setCategoryShow(false);
              }}
              className="bg-primary rounded text-white px-4 py-2"
            >
              Add Category
            </button>
          </div>

          {show && (
            <div className="container ">
              <div className="row justify-content-start">
                <div className="col-md-10">
                  <div className="card">
                    <div className="card-header bg-success text-white">
                      <h2 className="card-title mb-0">Add New Category</h2>
                    </div>
                    <div className="card-body">
                      <form onSubmit={""}>
                        <div className="mb-3">
                          <label htmlFor="categoryName" className="form-label">
                            Category Name:
                          </label>
                          <input
                            type="text"
                            id="categoryName"
                            className="form-control"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                          />
                        </div>
                        <button
                          type="button"
                          className=" btn-success py-2 px-4 rounded "
                          onClick={() => {
                           categoryMutaion.mutate({category:categoryName})
                            
                          }}
                        >
                          Add Category
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {categoryShow && (
            <>
              {" "}
              <ul className="list-group mt-3">
                {data?.data?.map((category) => (
                <li key="" className="list-group-item w-50 ms-3">
                   {category.category}  
                </li>

                 ))} 
              </ul>
              <button
                className="bg-danger rounded py-2 px-4 text-white ms-3  mt-3 "
                onClick={() => {
                  setCategoryShow(false);
                }}
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddCategory;
