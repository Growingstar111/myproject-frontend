import React from "react";
import Header from "../components/Header";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import styles from "./customstyle/login.module.css";
import { loginUser } from "../Endpoints/endpoints";
import { useDispatch } from "react-redux";
import { login } from "../Redux/reducer";
import Swal from "sweetalert2";


const AdminLogin = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (values) => loginUser(values),
    onSuccess: (res) => {
      console.log(res);
      if (res.status == 400) {
        Swal.fire({
          title: "Login Failed",
          text: "Invalid Username or Password",
          icon: "error",
        });
      }
      if (res.status == 200) {
        if (res?.data?.data?.user?.isVarified) {
          if (res?.data?.data?.user?.role == 1) {
            Swal.fire({
              title: "Welcome Admin !!!",
              text: "Login Successfully",
              icon: "success",
            });
            localStorage.setItem("token", res.data?.data?.token);
            dispatch(login(res.data));
            navigate("/admin/dashboard");
          }
          if (res?.data?.data?.user?.role == 2) {
            Swal.fire({
              title: " Not Autorazied !!!",
              text: "You are not authraized to access this page ",
              icon: "error",
            });
            navigate("/login");
          }
          if (res?.data?.data?.user?.role == 3) {
            Swal.fire({
              title: " Not Autorazied !!!",
              text: "You are not authraized to access this page ",
              icon: "error",
            });
            navigate("/login");
          } else {
            navigate("/login");
          }
        }
      }
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.message,
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
      // console.log(values);
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
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
