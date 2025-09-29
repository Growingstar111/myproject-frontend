import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./PublicPages/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

import ForgetPass from "./Auth/ForgetPass";

import {
  ProtectAdmin,
  ProtectCompany,
  ProtectCustomer,
  ProtectPublic,
} from "./ProtectRoutes/ProtectRoute";
import CompanyRoutes from "./ProtectRoutes/CompanyRoutes";
import Adminroutes from "./ProtectRoutes/Adminroutes";
import CustomerRoutes from "./ProtectRoutes/CustomerRoutes";
import Notfound from "./NotFound/Notfound";
import SetNewPass from "./Auth/SetNewPass";
import SignupVerify from "./Auth/SignupVerify";
import PasswordVerify from "./Auth/PasswordVerify";
import AdminLogin from "./Auth/AdminLogin";

function App() {
  // let str = "fun&!! time";

  // let substrings = str.split("");

  // const longestElement = substrings.reduce((longest, current) => {
  //   return current.length > longest.length ? current : longest;
  // }, "");

  // console.log(longestElement);
  // if (longestElement) {
  //   addXEveryThirdChar(longestElement + "i1t0qnsbea52");
  // }

  // function addXEveryThirdChar(longestElement) {
  //   let result = "";
  //   for (let i = 0; i < longestElement.length; i++) {
  //     result += longestElement[i];
  //     // Check if the current index + 1 is a multiple of 3
  //     if ((i + 1) % 2 === 0) {
  //       result += "x"; // Add 'x' after every third character
  //     }
  //   }
  //   console.log(">>>>", result);
  // }

  return (
    <>
      <Routes>
        {/* Protect Company */}

        <Route path="*" element={<ProtectCompany />}>
          <Route path="company/*" element={<CompanyRoutes />} />
        </Route>
        {/* Protect Company */}

        {/* Protect Admin */}
        <Route path="*" element={<ProtectAdmin />}>
          <Route path="admin/*" element={<Adminroutes />} />
        </Route>
        {/* Protect Admin */}

        {/* Protect Customer */}
        <Route path="*" element={<ProtectCustomer />}>
          <Route path="customer/*" element={<CustomerRoutes />} />
        </Route>

        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />

        <Route path="/*" element={<ProtectPublic />}>
        <Route path="login" element={<Login />} />

       <Route path="register" element={<Register />} />
          <Route path="forget" element={<ForgetPass />} />
          <Route path="verifyotp" element={<SignupVerify />} />
          <Route path="verifypass" element={<PasswordVerify />} />

          <Route path="" element={<SetNewPass />} />
        </Route>

        <Route path="admin-gateway" element={<AdminLogin />} />

        {/* Not Found Page */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
