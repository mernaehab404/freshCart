import "./App.css";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import {
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";
import Home from "./components/Home/Home";
import Brands from "./components/Brands/Brands";
import NotFound from "./components/NotFound/NotFound";
import AuthLayout from "./MainLayout/AuthLayout";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import Cart from "./components/Cart/Cart";
import Address from "./components/Address/Address";
import Wishlist from "./components/Wishlist/Wishlist";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import LogOut from "./components/LogOut/LogOut";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import AuthTabs from "./components/AuthTabs/AuthTabs";

const router = createHashRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "prds",
        element: (
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        ),
      },
      {
        path: "categs",
        element: (
          <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoutes>
            <Brands />
          </ProtectedRoutes>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoutes>
            <Wishlist />
          </ProtectedRoutes>
        ),
      },
      {
        path: "product-details/:id",
        element: (
          <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "address/:id",
        element: (
          <ProtectedRoutes>
            <Address />
          </ProtectedRoutes>
        ),
      },
      {
        path: "logout",
        element: (
          <ProtectedRoutes>
            <LogOut />
          </ProtectedRoutes>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "",
    element: <AuthLayout />,
    children: [
      { path: "auth", element: <AuthTabs /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "resetPassword", element: <ResetPassword /> },
    ],
  },
]);
function App() {
  return (
    <>
      <ToastContainer theme="colored" autoClose="1000" />

      <RouterProvider router={router} />
    </>
  );
}

export default App;
