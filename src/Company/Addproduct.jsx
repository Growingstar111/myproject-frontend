import React, { useState } from "react";
import styles from "../Admin/customStyle/AdminHome.module.css";
import Sidebar from "./SideBar";
import "./customStyle/addproduct.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useFormik, validateYupSchema } from "formik";
import * as yup from "yup";
import { addProduct, getcategories } from "../Endpoints/endpoints";

const Addproduct = () => {
  const getData = async () => {
    const res = await getcategories();
    console.log(res.data);
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => getData(),
  });

  const muatation = useMutation({
    mutationFn: addProduct,
    onSuccess: (res) => {
      Swal.fire({
        title: "Success!!!",
        icon: "success",
        text: "Product Added Successfully",
      });
      formik?.resetForm();
    },
    onError: (error) => {
      Swal.fire({
        text: error.message,
        icon: "error",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      image: null,
      categoryId: "",
      price: "",
      features: "",
      description: "",
      stock: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      brand: yup.string().required(),
      categoryId: yup.string().required(),
      price: yup.number().required(),
      features: yup.string().required(),
      description: yup.string().required(),
      stock: yup.number().required(),
      image: yup.mixed().required(),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("brand", values.brand);
      formData.append("image", values.image); // Append the file
      formData.append("categoryId", values.categoryId);
      formData.append("price", values.price);
      formData.append("features", values.features);
      formData.append("stock", values.stock);
      formData.append("description", values.description);
      muatation.mutate(formData);
    },
  });
  const handleFileChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]); // Set the file in formik state
  };

  return (
    <>
      <div className={styles.adminHomeContainer}>
        <Sidebar />
        <div className={styles.mainContent}>
          <div className="container py-0 ">
            <div>
              <div className="form addproduct">
                <h3>Add New Product</h3>
                <div>
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formik?.values?.name}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                  />
                  <p className="text-danger ">
                    {formik?.touched?.name && formik?.errors?.name}
                  </p>
                </div>
                <div>
                  <label>Brand Name</label>
                  <input
                    type="text"
                    name="brand"
                    value={formik?.values?.brand}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                  />
                  <p className="text-danger">
                    {formik?.touched?.brand && formik?.errors?.brand}
                  </p>
                </div>

                <div>
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={formik?.values?.price}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    min="0"
                  />
                  <p className="text-danger">
                    {formik?.touched?.price && formik?.errors?.price}
                  </p>
                </div>
                <div>
                  <div>
                    <label>Stock:</label>
                    <input
                      type="number"
                      name="stock"
                      value={formik?.values?.stock}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      min="0"
                    />
                    <p className="text-danger">
                      {formik?.touched?.stock && formik?.errors?.stock}
                    </p>
                  </div>
                  <label>Featurs:</label>
                  <textarea
                  rows={5}
                    name="features"
                    value={formik?.values?.features}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                  />
                  <p className="text-danger">
                    {formik?.touched?.features && formik?.errors?.features}
                  </p>
                </div>
                <div>
                  <label>Description:</label>
                  <textarea
                  rows={7}
                    name="description"
                    value={formik?.values?.description}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                  />
                  <p className="text-danger">
                    {formik?.touched?.description &&
                      formik?.errors?.description}
                  </p>
                </div>
                <div>
                  <label>Category</label>
                  <select
                    name="categoryId"
                    className="w-100 py-2"
                    onChange={formik.handleChange}
                    onBlur={formik?.handleBlur}
                  >
                    <option value="">Select Category</option>
                    {data &&
                      data?.data?.map((category) => (
                        <option value={category._id}>
                          {category.category}
                        </option>
                      ))}
                  </select>
                  <p className="text-danger">
                    {formik?.touched?.categoryId && formik?.errors?.categoryId}
                  </p>
                </div>
                <div className="image-upload-container">
                  <label htmlFor="file-upload" className="image-upload-text">
                    Choose file or drop here
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <p className="text-danger">
                    {formik.touched.image && formik.errors.image}
                  </p>
                </div>

                <button type="button" onClick={() => formik?.handleSubmit()}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addproduct;
