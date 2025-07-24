import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../helpers/utils";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return getToken() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
