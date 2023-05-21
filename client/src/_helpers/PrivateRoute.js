import { Navigate, Outlet, useLocation } from "react-router-dom";
import moment from "moment";
import React from "react";

export default function PrivateRoute() {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  let isAuth = false;
  if (user?.exp) {
    let expiryTime = moment(user?.exp);
    let currentTime = moment();
    isAuth = currentTime.isSameOrBefore(expiryTime);
  }
  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return <Outlet />;
}
