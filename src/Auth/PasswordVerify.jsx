import React, { useState } from "react";
import "./customstyle/otp.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyUser } from "../Endpoints/endpoints";
import Swal from "sweetalert2";
import OTPInput from "react-otp-input";

const PasswordVerify = () => {
  const navigate = useNavigate();
  const [otp, setotp] = useState("");
  const email = JSON.parse(localStorage.getItem("email"));
  const phone = (localStorage.getItem("phone"));
  
  console.log(email);

  const mutation = useMutation({
    mutationFn: (values) => verifyUser(values),
    onSuccess: (res) => {
      Swal.fire({
        title: "Success",
        text: "Verified OTP",
        icon: "success",
      });
      navigate("/setpass");
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    },
  });

    const verificationCode = otp;
    const values = { email,phone, verificationCode };


  return (
    <>
      <div className="otp_container">
        <div className="otp_card">
          <h6 className="otp_header">
            Please enter the one time password <br /> to verify your account
          </h6>
          <div className="otp_info">
            <span>A code has been sent to you. </span> 
          </div>
          <div
            id="otp"
            className="otp_inputs d-flex flex-row justify-content-center mt-2"
          >
            <OTPInput
              inputStyle={{ width: "60px", height: "50px" }}
              className="otp_input fs-3"
              id="first"
              value={otp}
              onChange={setotp}
              numInputs={4}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />
            }
            />
          </div>
          <div className="mt-4">
            <button className="green_btn" type="button" onClick={()=> mutation.mutate(values)}>
              Validate
            </button>
          </div>

          <div className="otp_resend">
            <div className="content d-flex justify-content-center align-items-center">
              <span>Didn't get the code</span>
              <a href="#" className="text-decoration-none ms-3">
                Resend(1/3)
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordVerify;
