import Header from "../components/Header";
import * as yup from "yup";
import { useFormik } from "formik";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styles from "./customstyle/register.module.css";
import { Link } from "react-router-dom";
import { addUser } from "../Endpoints/endpoints";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const Register = () => {
  const navigate = useNavigate();

  const queryclient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (values) => await addUser(values),
    onSuccess: (res) => {
      queryclient.invalidateQueries("users");
      Swal.fire({
        title: "Success",
        text: "Verify OTP",
        icon: "success",
      });
      console.log(res.data);

      localStorage.setItem("email", res.data.email);
      localStorage.setItem("phone", res.data.phone);

      navigate("/verifyotp");
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
      name: "",
      phone: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      phone: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(4).required(),
      role: yup.string().required(),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      <Header />
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>
              Welcome <span className="text-dark">Back</span>
            </h1>
            <h6 className="text-center text-white  mb-4">
              Already have an <span className="text-dark fs-5">Account</span>
            </h6>
            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                Login
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <div className={styles.form_container}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={formik?.handleChange}
                value={formik?.values?.name}
                onBlur={formik?.handleBlur}
               
                className={styles.input}
              />
              <p className="text-danger m-0">
                {formik?.touched?.name && formik?.errors?.name}
              </p>

              <PhoneInput
                type="number"
                onBlur={formik?.handleBlur}
                placeholder="Phone Number"
                // className={styles.input}
                 inputClass={styles.control22}
                country={"in"}
                value={  formik?.values?.phone}
                onChange={(phone) => { const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
                formik?.setFieldValue("phone", formattedPhone);}}
                inputProps={{
                  name: "phone",
                  required: true,
             
                }}
                enableSearch={true}
               
              />
             {/* <p>{formik?.values?.phone}</p> */}
              <p className="text-danger m-0">
                {formik?.touched?.phone && formik?.errors?.phone}
              </p>
          
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

              <select
                name="role"
                onChange={formik.handleChange}
                value={formik.values.role}
                onBlur={formik.handleBlur}
                className={styles.input}
                required
              >
                <option value="" disabled selected>
                  Please Choose a Role
                </option>
                <option value="user">User</option>
                <option value="company">Company</option>
              </select>
              <p className="text-danger m-0">
                {formik.touched.role && formik.errors.role}
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
                className={styles.green_btn}
                onClick={formik?.handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
