import React from "react";
import AdminSideBar from "./AdminSideBar";
import styles from "./customStyle/AdminHome.module.css";
import { useQuery } from "@tanstack/react-query";
import { viewAllOrders } from "../Endpoints/endpoints";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
// import 'boxicons/css/boxicons.min.css'; // Import Bx Icons

const ViewOrders = () => {
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => viewAllOrders(),
  });
  // const orders = data?.data
  // console.log(orders,"orders");

  const orders = data?.data?.data?.map((item) => item);
  console.log(
    orders?.products?.map((item) => {
      item?.brand;
    }),
    "products"
  );

  console.log(orders, "orderrss----");

  // const totalOrders = orders.length;
  // const totalAmount = orders.reduce((sum, order) => sum + order.price * order.quantity, 0);
  // function OrderSummary({ items }) {
    // Calculate the total amount using a for loop
    // let totalAmounttt = 0;
    // for (let index = 0; index < items.length; index++) {
    //   totalAmounttt += items[index].price * items[index].quantity;
    // }}
  return (
    <>
      <div className={styles.adminHomeContainer}>
        <AdminSideBar />
        <div className={styles.mainContent}>
          {/* <header className={styles.header}>
            <h1 >Welcome to Orders Section</h1>
          </header> */}
          <div className="mt-0 py-0">
            <div
              className="mt-0"
              style={{
                backgroundColor: "#edf2f7",
                minHeight: "100vh",
                padding: "20px",
              }}
            >
              {/* Header Section */}
              <header
                style={{
                  backgroundColor: "#4299e1", // Light blue header
                  color: "#ffffff",
                  padding: "20px",
                  textAlign: "center",
                  marginBottom: "20px",
                  borderRadius: "8px",
                }}
              >
                <h1 style={{ fontSize: "24px", margin: 0 }}>Order List</h1>
              </header>

              {/* Order Items Section */}
              <div className="table-responsive">
                <table
                  className="table"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#e2e8f0" }}>
                      {" "}
                      {/* Light gray header row */}
                      <th style={{ color: "#2d3748" }}>Order ID</th>
                      <th style={{ color: "#2d3748" }}>Product Name</th>
                      <th style={{ color: "#2d3748" }}>Date</th>
                      <th style={{ color: "#2d3748" }}>Price</th>
                      <th style={{ color: "#2d3748" }}>Status</th>
                      <th style={{ color: "#2d3748" }}>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order, orderIndex) => (
                      <tr
                        key={order._id}
                        style={{
                          backgroundColor:
                            order._id % 2 === 0 ? "#f7fafc" : "#ffffff", // Alternating row colors
                          cursor: "pointer",
                        }}
            
                        // onClick={() => navigate(`/admin/view/${order._id}`)}
                        onClick={() =>{ navigate(`/admin/view`,{state: order})}}
                      >
                        <td style={{ color: "#4a5568" }}>{orderIndex+1}</td>
                        <td style={{ color: "#4a5568" }}>
                          {order?.products?.map((product) => 
                            
                            <p className="mb-0">{product?.name}</p>
                           
                          )}
                        </td>
                        <td style={{ color: "#4a5568" }}>
                          {/* {order?.address?.name} */}
                          {moment(order?.createdAt).format('llll')}

                          {/* {order?.products?.map((product) => product?.quantity)} */}
                        </td>
                        <td style={{ color: "#4a5568" }}>₹{order.totalPrice}</td>
                        <td>
                          {order.status === "Delivered" ? (
                            <span style={{ color: "#38a169" }}>
                              <i className="bx bx-check-circle"></i> Delivered
                            </span>
                          ) : order.status === "Shipped" ? (
                            <span style={{ color: "#d69e2e" }}>
                             
                              <i className="bx bx-package"></i> Shipped
                            </span>
                          ) : (
                            
                              <span style={{ color: "#e53e3e" }}>
                               <i className="bx bx-time"></i> Pending
                            </span>
                          )}
                        </td>
                        <td><i class="bx bx-receipt fs-4"></i></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               
              </div>

              {/* Footer Section */}

              <footer
                style={{
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  marginTop: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                {/* <ul>
        {orders?.map((item, index) => (
          <li key={index}>
           ₹ { {item?.products?.map((product)=> product?.price)} * {item?.products?.map((product)=> product?.quantity)} }
          </li>
        ))}
      
      </ul> */}
                  {/* <strong>Total Orders:</strong> {orders.length} |{" "} */}
                  <strong>Total Amount:</strong> ₹{"totalAmounttt"}
                </div>
              </footer>
              {/* {orders?.map((order, orderIndex) => (
                <div key={orderIndex}>
                  <h3>Order {orderIndex + 1}</h3>
                  <ul>
                    <p>dfghjklkjhgf</p>
                    {order?.products?.map((product, productIndex) => (
                      <li key={productIndex}>
                        Product {productIndex + 1}: {product?.name}
                      </li>
                    ))}
                    <li>{order?.address?.name}</li>
                  </ul>
                </div>
              ))} */}
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default ViewOrders
