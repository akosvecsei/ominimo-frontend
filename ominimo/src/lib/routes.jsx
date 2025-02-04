import { createBrowserRouter } from "react-router-dom";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import MainView from "../components/main/MainView";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

const NotFound = () => <div>Page not found.</div>;

export const router = createBrowserRouter([
  { path: ROOT, element: <MainView /> },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  { path: "*", element: <NotFound /> },
]);
