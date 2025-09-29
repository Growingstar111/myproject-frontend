import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import useRole from "../hooks/useRole";
import useToken from "../hooks/useToken";

export const ProtectAdmin = () => {
  const token = useToken();

  const role = useRole();
  if (token) {
    if (role == 2) {
      return <Navigate to="/customer/home" replace={true} />;
    } else if (role == 3) {
      return <Navigate to="/company/dashboard" replace={true} />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export const ProtectCustomer = () => {
  const token = useToken();

  const role = useRole();
  if (token) {
    if (role == 1) {
      return <Navigate to="/admin/dashboard" replace={true} />;
    } else if (role == 3) {
      return <Navigate to="/company/dashboard" replace={true} />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export const ProtectCompany = () => {
  const token = useToken();
  const role = useRole();
  if (token) {
    if (role == 1) {
      return <Navigate to="/admin/dashboard" replace={true} />;
    } else if (role == 2) {
      return <Navigate to="/customer/home" replace={true} />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export const ProtectPublic = () => {
  const token = useToken();
  const role = useRole();
  if (token) {
    if (role == 1) {
      return <Navigate to="/admin/dashboard" replace={true} />;
    } else if (role == 2) {
      return <Navigate to="/customer/home" replace={true} />;
    } else if (role == 3) {
      return <Navigate to="/company/dashboard" replace={true} />;
    }
  } else {
    return <Outlet />;
  }
};
