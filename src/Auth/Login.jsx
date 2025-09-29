import React, { useState } from "react";
import Header from "../components/Header";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import styles from "./customstyle/login.module.css";
import { loginUser } from "../Endpoints/endpoints";
import { useDispatch , useSelector } from "react-redux";
import { intialCart, login } from "../Redux/reducer";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (values) => loginUser(values),
    onSuccess: (res) => {
      
      if (res.status == 400) {
         return Swal.fire({
          title: "Login Failed",
          text: "Invalid Username or Password",
          icon: "error",
        });
      }

      if (res.status == 200) {
        if (res?.data?.data?.user?.isVarified) {
  

          if (res?.data?.data?.user?.role == 1) {
            return Swal.fire({
              title: " Please try Again !!!",
              icon: "error",
              text: "Admin access is not allowed here",
            });
          }

          if (res?.data?.data?.user?.role == 2) {
            dispatch(login(res.data));
            localStorage.setItem("token", res.data?.data?.token);

            Swal.fire({
              title: "Success",
              text: "Login Successfully",
              icon: "success",
            });
             dispatch(intialCart(res?.data?.data?.cartItemsCount));
            
            navigate("/customer/home");
          }
          if (res?.data?.data?.user?.role == 3) {
            dispatch(login(res.data));
            localStorage.setItem("token", res.data?.data?.token);

            Swal.fire({
              title: "Success",
              text: "Login Successfully",
              icon: "success",
            });
            navigate("/company/dashboard");
          }
        } else {
          Swal.fire({
            title: "error",
            text: "Account is not verified please verify your account",
            icon: "error",
          });
          navigate("/verifyotp");
        }
      }
    },
    onError: (error) => {
     
      Swal.fire({
        title: "Error",
        text: "Invalid Username or Password",
        icon: "error",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });
  return (
    <>
      <Header />
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <div className={styles.form_container}>
              <h1>Login to Your Account</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={formik?.handleChange}
                value={formik?.values?.email}
                onBlur={formik?.handleBlur}
                required
                className={styles.input}
              />
              <p className="text-danger m-0">
                {formik?.touched?.email && formik?.errors?.email}
              </p>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={formik?.handleChange}
                value={formik?.values?.password}
                onBlur={formik?.handleBlur}
                required
                className={styles.input}
              />
              <p className="text-danger m-0">
                {formik?.touched?.password && formik?.errors?.password}
              </p>

              <button
                type="button"
                onClick={formik?.handleSubmit}
                className={styles.green_btn}
              >
                Sign In
              </button>
              <p className="p text-center ">
                <Link className="spannnn " to={"/forget"}>
                  Forget Password?
                </Link>
              </p>
            </div>
          </div>
          <div className={styles.right}>
            <h1 className="text-center fs-2 mb-4">
              Create an <span className="text-dark">Account.</span>
            </h1>
            <Link to="/register">
              <button type="button" className={styles.white_btn}>
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

// dispatch(login(res.data));
// Swal.fire({
//   title: "Success",
//   text: "Login Successfully",
//   icon: "success",
// });
// if (res?.data?.data?.user?.role == 1) {
//   Swal.fire({
//     title:" Please try Again !!!",
//     icon:"error",
//     text:"Admin access is not allowed here"
//   })
//   navigate("/login");
// } else if (res?.data?.data?.user?.role == 2) {
//   localStorage.setItem("token", res.data?.data?.token);

//   navigate("/customer/home");
// } else if (res?.data?.data?.user?.role == 3) {
//   localStorage.setItem("token", res.data?.data?.token);

//   navigate("/company/dashboard");
// } else {
//   navigate("/login");
// }
