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
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item position-relative">
                <Link className="nav-link " aria-current="page" to="/signup">
                  Sign up
                </Link>
              </li>
              <li className="nav-item position-relative">
                <Link className="nav-link " aria-current="page" to="/signin">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
