import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { verifyUser } from "../Endpoints/endpoints";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './customstyle/otp.css'
import Header from "../components/Header";
import OtpInput from 'react-otp-input';
import { number } from "yup";


const SignupVerify = () => {

  const navigate = useNavigate()

 const [otp, setotp] = useState("")
  const email = (localStorage.getItem('email'));
  const verificationCode = otp;


  const values = { email, verificationCode }



  const mutation = useMutation({
    mutationFn:( values)=>verifyUser( values),    
    onSuccess:(res)=>{
      console.log(res);
      
    if (res.status == 200) {
      
      Swal.fire({
        title: "Success",
        text: "Verified OTP",
        icon: "success",
      });
      navigate('/login')
    
    }
     
    },
    onError:(error)=>{
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  });

  


 
  
  return (
    <>
   
     <Header/>
     <div className="otp_container">
    <div className="otp_card">
        <h6 className="otp_header">
            Please enter the one time password <br /> to verify your account
        </h6>
        <div className="otp_info">
            <span>A code has been sent to</span> <small>{email}</small>
        </div>
        <div id="otp" className="otp_inputs d-flex flex-row justify-content-center mt-2">
            
             <OtpInput
             inputStyle={{width:"60px",height:"50px"}}
              className="otp_input fs-3"
              id="first"
      value={otp}
      onChange={setotp}
      numInputs={4}
      inputType= {"Number" }
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
        </div>
        <div className="mt-4">
            <button className="green_btn" type="button" onClick={ ()=>mutation.mutate(values) }>
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

export default SignupVerify;
