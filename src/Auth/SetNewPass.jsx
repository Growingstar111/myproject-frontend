import React from "react";
import "./customstyle/setNewPass.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { setNewPassword } from "../Endpoints/endpoints";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const SetNewPass = () => {
   const email = JSON.parse(localStorage.getItem('email'))
   const phone = JSON.parse(localStorage.getItem('phone'))

  const navigate = useNavigate();

  const {mutate} = useMutation({
    mutationFn:(values)=> setNewPassword(values),
    onSuccess:(res)=>{
        console.log(res?.data);
        Swal.fire({
          title:"Password Change SuccesFully !!!!!",
          text:"Your Password Is Changed Succesfully . !!!!!",
          icon:"success"
        }),
        navigate('/login')
    },
    onError:()=>{
      Swal.fire({
        title: 'Error!!',
        text: 'Internal Server Error',
       icon:"error"
      })
    }
  })

  const formik = useFormik({
    initialValues: {
      password: " ",
      confirmPassword: " ",
    },
    validationSchema: yup.object({
      password: yup.string().required().min(5),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password"), null]),
    }),

    onSubmit:(data)=>{
      
       const value ={
          email:email,
          phone:phone,
           password: data.password
       };
       mutate(value)
    }
  });
  return (
    <>
      <div class="container">
        <div class="row" id="passwordForm">
          <div class="col-md-6 offset-md-3">
            <div class="card shadow p-5">
              <h3 class="text-uppercase text-center card-header mb-4">
                Change Password
              </h3>

              <div name="myForm" onsubmit="return validateForm()">
                <div class="form-group">
                  <label>Enter New Password</label>
                  <input
                    class="form-control mt-3"
                    name="password"
                    type="password"
                    value={formik.values?.password}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                  />
                  <p>{formik?.touched?.password && formik?.errors?.password}</p>
                </div>

                <div class="form-group">
                  <label>Confirm New Password</label>
                  <input
                    class="form-control mt-3"
                    name="confirmPassword"
                    type="password"
                    value={formik?.values?.confirmPassword}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                  />
                  <p>{formik?.touched?.confirmPassword  &&  formik?.errors?.confirmPassword}</p>
                </div>

                <button
                  type="button"
                  class="btn btn-outline-dark btn-block rounded-pill mt-4"
                  onClick={formik?.handleSubmit}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetNewPass;
