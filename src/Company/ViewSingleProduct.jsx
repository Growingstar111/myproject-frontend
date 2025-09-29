import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { viewSingleProductt } from "../Endpoints/endpoints";
import { useNavigate, useParams } from "react-router-dom";
import "./customStyle/ViewSingleProduct.css"; // Import the CSS file
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ViewSingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["products"] });
  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await viewSingleProductt(id);
      return res.data;
    },
  });
  /******************************************** */

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="product-container">
        {data?.data?.map((item) => (
          <>
            <div className="product-card" key={item?._id}>
              <img
                src={`http://localhost:5000/api/${item.image}`}
                alt="Product"
                className="product-image float-left"
                height={"450px"}
                width={"50%"}
              />
              <div className="product-info">
                <h1 className="product-title">
                  <span className="h4 ">Name:</span> {item?.name}
                </h1>
                <h2 className="product-brand">
                  <span className="h4">Brand:</span> {item?.brand}
                </h2>
                <h2 className="product-stock">
                  <span className="h4">Stock:</span> {item?.stock}
                </h2>
                <h4 className="product-price">
                  <span className="h4">Price: </span> ₹{item?.price}
                </h4>
                <h4 className="product-features">
                  <span className="h4">Features:</span> {item?.features}
                </h4>
                <h4 className="product-category">
                  <span className="h4">Category:</span>{" "}
                  {item?.categorys?.category}
                </h4>
              </div>
            </div>
            <p className="product-description ">
              <span className="h4">Description:</span> {item?.description}
            </p>
          </>
        ))}
        <div className=" d-flex justify-content-between ">
          <button
            type="button"
            className="  green_btn rounded bg-primary"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <Button
            type="button"
            className="  rounded my-auto  bg-success"
            variant="primary"
            onClick={handleShow}
          >
            Update Product
          </Button>
          <button
            type="button"
            className="green_btn  rounded bg-danger"
            onClick={() => navigate(-1)}
          >
            Delete Product
          </button>
        </div>
      </div>

      <Modal show={show} size="lg" onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              {/* *************************************** */}
              <div className="col-md-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="exampleFormControlInput1"
                  />
                </div>
              </div>
              {/* *************************************** */}
              {/* *************************************** */}
              <div className="col-md-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput2" class="form-label">
                    Brand:
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={""}
                    onChange={""}
                    className="form-control"
                    id="exampleFormControlInput2"
                  />
                </div>
              </div>
              {/* *************************************** */}
              {/* *************************************** */}
              <div className="col-md-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput3" class="form-label">
                    Stock:
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={""}
                    onChange={""}
                    id="exampleFormControlInput3"
                  />
                </div>
              </div>
              {/* *************************************** */}
              {/* *************************************** */}
              <div className="col-md-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput4" class="form-label">
                    Price:
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={""}
                    onChange={""}
                    id="exampleFormControlInput4"
                  />
                </div>
              </div>
              {/* *************************************** */}
              {/* *************************************** */}
              <div className="col-md-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput5" class="form-label">
                    Features:
                  </label>
                  <textarea
                    name="features"
                    value={""}
                    onChange={""}
                    required
                    id="exampleFormControlInput5"
                  />
                </div>
              </div>
              {/* *************************************** */}
              {/* *************************************** */}
              <div className="col-md-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput6" class="form-label">
                    Description:
                  </label>
                  <textarea
                    id="exampleFormControlInput6"
                    name="description"
                    value={""}
                    onChange={""}
                    required
                  />
                </div>
              </div>
              {/* *************************************** */}
               {/* *************************************** */}
               <div className="col-md-12">
                <div class="mb-3">
                  <label for="exampleFormControlInput6" class="form-label">
                    Description:
                  </label>
                  <textarea
                    id="exampleFormControlInput6"
                    name="description"
                    value={""}
                    onChange={""}
                    required
                  />
                </div>
              </div>
              {/* *************************************** */}
            </div>
          </div>

          {/* 
            <div className="form-group">
              <label>Image:</label>
              <input type="file" name="image" onChange={""} required  setfieldval/>
            </div>
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className=" bg-danger rounded" onClick={handleClose} >
            Close
          </Button>
          <Button variant="primary" className=" rounded" onClick={handleClose} style={{backgroundColor:"#4caf50"}} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewSingleProduct;
