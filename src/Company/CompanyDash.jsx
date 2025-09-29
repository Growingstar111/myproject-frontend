import React from "react";
// import styles from "../Admin/customStyle/AdminHome.module.css";
import "./customStyle/comapnyHeader.css";
import Sidebar from "./SideBar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { accountOnboarding, retrieveAccount, viewUSerProfile } from "../Endpoints/endpoints";

import { useState } from "react";
const CompanyDash = () => {

 
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["retrive"] });
  const getData = async () => {
    const res = await retrieveAccount();

    return res?.data;
  };

  const { data } = useQuery({
    queryKey: ["retrive"],
    queryFn: () => getData(),
  });
  console.log(data);

  const muatationOnboard = useMutation({
    mutationFn: () => accountOnboarding(),
    onSuccess: (res) => {
      console.log(res?.data?.data?.url);
      const redirectUrl = res?.data?.data?.url;
      window.location.href = redirectUrl;
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const  userProfile   = useQuery({
      queryKey: "view-userprofile",
      queryFn:  () => viewUSerProfile()   
    });
 const profileData = userProfile?.data?.data?.data
  

  return (
    <>
      <div className="adminHomeContainer-compo p-0 top-0">
        <Sidebar />
        <div className="mainContent p-0">
          <div className="container">
            <div className="row">
              <div className="col-md-8">Welcome To Company Dashboard !!!!!</div>
              <div className="col-md-4 text-end d-flex justify-content-end align-items-center ">
                <button
                  className="rounded  text-dark   px-3 py-1 "
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                   <i class="bx bx-user fs-5 p-1 text-danger"></i> Profile 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">
            Profile Section
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          {" "}
          {data?.Onboard_status == 1 ? (
            <p className="d-flex align-items-center">{data?.message}<i class='bx bx-check fs-3 p-0  text-success'></i></p>
           
          ) : (
            <div className="col-md-12">
               <div>{data?.message}</div>
              <button
                type="button"
                onClick={() => {
                  // data?.isChargeEnabled ? "":
                  muatationOnboard.mutate();
                }}
                className="bg-primary rounded text-white p-2 my-3"
              >
                Onboard Your ACcount
              </button>
             
            </div>
          )}{" "}
          <p>Name: {profileData?.name}</p>
          <p>Email: {profileData?.email}</p>
          <p>Phone: {profileData?.phone}</p>
        </div>
      </div>
    </>
  );
};

export default CompanyDash;
