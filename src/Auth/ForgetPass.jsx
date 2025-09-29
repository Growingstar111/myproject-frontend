import React, { useState } from "react";
import "./customstyle/forget.css";
import Header from "../components/Header";
import { useMutation } from "@tanstack/react-query";
import { forgetPassword } from "../Endpoints/endpoints";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import {useFormik} from "formik"
import * as yup from 'yup'

const ForgetPass = () => {
  const [email, setemail] = useState("");
 const[phone , setPhone] = useState('')
 const[showEmail , setShowEmail] = useState(true)
 const[showPhone , setShowPhone] = useState(false)

  const navigate = useNavigate();
const formik = useFormik({
  initialValues:{
    email:"",
    phone:"",
  },
  validationSchema:yup.object({
   email: yup.string().email(),
   phone: yup.string()
  }),
  onSubmit:(values)=>{
    mutation.mutate(values)
  }
})
 
  const mutation = useMutation({
    mutationFn: (e) => forgetPassword(e),
    onSuccess: (res) => {
      console.log(res);
      if (res?.data?.data?.statusCode == 200) {
        localStorage.setItem('email', JSON.stringify(email))
        localStorage.setItem('phone', (phone))
 
       
       Swal.fire({
       
         text: "Please Verify Your Otp.",
         icon: "success",
       });
       setemail("")
       setPhone("")
       navigate("/verifypass");
      }else{
        Swal.fire({
          title:"error",
          text: "Something Went Wrong",
  
          icon:"error"
        })
      }
      
    },
    onError:(error)=>{
      console.log(error);
      
      Swal.fire({
        title:"error",
        text: "Something Went Wrong",

        icon:"error"
      })
    }
  });
//  const handleSubmitt=()=>{
//     const values = {email, phone}
//     mutation.mutate(values)
    
//   }

  return (
    <>
      <Header />
      <div className=" forgetpass">
        <div className="forget-card">
          <h2>Forgot Password</h2>
          <p className="mb-1">Enter your email or Phone Number address to reset your password.</p>

          <button type="buton" className="forget-btn" onClick={()=>{setShowEmail(true), setShowPhone(false)}}>Via Email </button>
          <button type="buton" className="forget-btn" onClick={()=>{setShowPhone(true),setShowEmail(false)}}>Via Phone</button>
          <div>
    
           {
              showEmail && (
                <>
                <input
                type="email"
                className="input text-dark"
                name="email"
                placeholder="Email Address"
                value={formik?.values?.email}
                onChange={formik?.handleChange}

              />
              <p className="text-danger">{formik?.errors?.email}</p>
              </>
              )
              
            }
             {
              showPhone && (
             <>
              <PhoneInput
                type="number"
          
                placeholder="Phone Number"
                // className={styles.input}
                 inputClass={"control22"}
                country={"in"}
                value={phone}
               
                onChange={(e) => {
                  const formattedPhone = e.startsWith('+') ? e : `+${e}`;
                  setPhone(formattedPhone);
                }} 
                inputProps={{
                  name: "phone",
                  required: true,
             
                }}
                enableSearch={true}
               
              />
              <p className="text-danger">{formik?.errors?.phone}</p>
              </>
              )
              
            }
      
            <button
              type="button"
              onClick={() => formik?.handleSubmit()}
              className="green_btn"
            >
              Send Reset Link
            </button>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default ForgetPass;
