import React from "react";
import AdminSideBar from "./AdminSideBar";
import styles from "./customStyle/AdminHome.module.css";

import { useLocation, useNavigate } from "react-router-dom";

const ViewSingleOrder = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const order = location?.state;
  console.log(order,"view single order");
  

  return (
    <div className={styles.orderContainer }>
        <div class={styles.orderSidebar}>
            
      <AdminSideBar />
  </div>

      <div className={styles.orderMainContent}>
        <div className="container mt-0 pt-0">
          <div className={styles.orderCard}>
            <div className={styles.orderCardHeader}>
              <h2>View Order</h2>
            </div>
            <div className={styles.orderCardBody}>
              <div className="row mt-0">
                <div className="col-md-6">
                  <h4 className={styles.orderTitle}>User  Details</h4>
                  <p>
                    <strong className={styles.orderLabel}>Name:</strong> 
                    {order?.address?.name}
                  </p>
                  <p>
                    <strong className={styles.orderLabel}>Email:</strong> 
                    {order?.user?.email}
                    
                  </p>
                  <p>
                    <strong className={styles.orderLabel}>Phone:</strong> 
                    {order?.address?.phone}
                  </p>
                </div>
                <div className="col-md-6">
                  <h4 className={styles.orderTitle}>Address</h4>
                  <p>
                    <strong className={styles.orderLabel}>Street: </strong> 
                    {order?.address?.street}
                  </p>
                 
                  <p>
                    <strong className={styles.orderLabel}>City:</strong> 
                    {order?.address?.city}
                  </p>
                  <p>
                    <strong className={styles.orderLabel}>State:</strong> 
                    {order?.address?.state}
                  </p>
                  <p>
                    <strong className={styles.orderLabel}>Zip:</strong> 
                    {order?.address?.pincode}
                  </p>
                </div>
              </div>
              <div className="row mt-0">
                <div className="col-md-12">
                  <h4 className={styles.orderTitle}>Products</h4>
                  <table className={styles.orderTable}>
                    <thead>
                      <tr >
                        <th className="text-center">Product Image</th>
                        <th className="text-center">Product Name</th>
                        <th className="text-center">Brand</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.products?.map((item, index) => (
                        <tr key={index}>
                          <td className="text-center">
                            <img
                              src={`http://localhost:5000/api/${item.image}`}
                              alt={item.productName}
                              style={{ width: "50px", height: "50px" }}
                              width={"100%"}
                            />
                          </td>
                          <td className="text-center">{item.name}</td>
                          <td className="text-center">{item.brand}</td>
                          <td className="text-center">{item.quantity || 1}</td>  
                          {/* item quantity get ############################################################# */}
                          <td className="text-center">₹{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <div className="row mt-0">
                <div className="col-md-12">
                  <h4 className={styles.orderTitle}>Order Summary</h4>
                  <p>
                    <strong className={styles.orderLabel}>Subtotal:</strong> ₹
                    {order?.subtotal}
                  </p>
                  <p>
                    <strong className={styles.orderLabel}>Tax:</strong> ₹
                    {order?.tax}
                  </p>
                  <p>
                    <strong className={styles.orderLabel}>Total:</strong> ₹
                    {order?.total}
                  </p>
                </div>
              </div> */}
            </div>
            <div className={styles.orderCardFooter}>
              <div className="d-flex justify-content-between">
               <p> <strong className={styles.orderLabel}>Total Amount:</strong> ₹
               {order?.totalPrice}   </p>
                          {/*  get total price of order  also calculate in the backend ############################################################# */}

                <p>    <strong className={styles.orderLabel}>Order Status:</strong>
                {order?.status}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-end me-5">

              <button className="btn-success px-4  py-2 rounded" onClick={()=> navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default ViewSingleOrder;