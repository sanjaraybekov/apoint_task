import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import PrivateRoute from "./private-route";
import Materials from "../pages/materials";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Materials />
      </PrivateRoute>
    ),
  },
]);
