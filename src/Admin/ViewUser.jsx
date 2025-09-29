import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { banUser, unbanUser, viewUSer } from "../Endpoints/endpoints";
import "./customStyle/viewUser.css";

import { FaBan } from "react-icons/fa";
import Swal from "sweetalert2";

const ViewUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["view-user"],
    queryFn: async () => {
      const res = await viewUSer(id);
      console.log(data);

      return res.data;
    },
  });
  const unBanMutation = useMutation({
    mutationFn: (value) => unbanUser(value),
    onSuccess: (res) => {
      Swal.fire({
        title: "Un-Banned",
        text: "User Unbanned Succesfully !!!",
        icon: "success",
      });
      refetch();
    },
  });

  const delMutation = useMutation({
    mutationFn: (value) => banUser(value),
    onSuccess: (resp) => {
      Swal.fire({
        title: "Banned",
        text: "User Banned Succesfully !!!",
        icon: "success",
      });
      refetch();
    },
  });
  return (
    <>
      <div className="view_user_container">
        <div className="view_user_form_container">
          <div className="left">
            <h1>User Details</h1>
            {isLoading ? (
              <h2>Loading...........</h2>
            ) : (
              <>
                <h2>
                  <span>Id: </span>
                  {data?.data?._id}
                </h2>
                <h2>
                  <span>Name: </span>
                  {data?.data?.name}
                </h2>
                <h2>
                  <span>Contact Number: </span>
                  {data?.data?.phone}
                </h2>
                <h2>
                  <span>Email:</span> {data?.data?.email}
                </h2>
                <h2>
                  <span>Role:</span> {data?.data?.role == 3? "Company" :"Customer" }
                </h2>
                <h2>
                  <span>User Status: </span>
                  {data?.data?.status}
                </h2>
                <h2>
                  <span>User is: </span>
                  {data?.data?.isVarified ? "Verified" : "Not Verified"}
                </h2>
                <h2>
                  <span>User Profile is: </span>
                  {data?.data?.profileCompleted ? "Completed" : "Not Complete"}
                </h2>
              </>
            )}
            <button
              type="button"
              className="green_btn me-auto"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
          <div className="right">
            <h1>Actions</h1>
            <button
              className="white_btn"
              onClick={() => delMutation?.mutate(data?.data?._id)}
            >
              {" "}
              <FaBan style={{ color: "red" }} /> Ban user
            </button>
            <button
              className="white_btn"
              onClick={() => unBanMutation?.mutate(data?.data?._id)}
            >
              UnBan User
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
