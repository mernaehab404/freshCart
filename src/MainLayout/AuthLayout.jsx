import React from "react";
import logo from "../assets/images/freshcart-logo.svg";
import { Link, Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container ">
          <Link className="navbar-brand" to="/home">
            <img src={logo} alt="" />
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
