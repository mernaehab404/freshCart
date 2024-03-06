import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function SignIn() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  function sendDataToApi(values) {
    setLoading(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        console.log(data);
        if (data.message == "success") {
          localStorage.setItem("token", data.token);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMsg(err.response.data.message);
        setLoading(true);
      });
  }

  function validationSchema() {
    let schema = new Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string()
        .matches(/^[A-Z][a-zA-Z0-9@]{6,}$/)
        .required(),
    });
    return schema;
  }
  let login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      sendDataToApi(values);
    },
  });
  return (
    <div>
      <div className="w-75 m-auto my-4">
        <h2>Login</h2>
        <form onSubmit={login.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            onBlur={login.handleBlur}
            onChange={login.handleChange}
            value={login.values.email}
            className="form-control mb-3"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
          <label htmlFor="password">Password</label>
          <input
            onBlur={login.handleBlur}
            onChange={login.handleChange}
            value={login.values.password}
            className="form-control mb-3"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
          {login.errors.password && login.touched.password ? (
            <div className="alert alert-danger">{login.errors.password}</div>
          ) : (
            ""
          )}

          {errorMsg ? (
            <div className="alert alert-danger">{errorMsg}</div>
          ) : null}

          <button
            disabled={!(login.dirty && login.isValid)}
            type="submit"
            className="btn bg-main mb-3"
          >
            {loading ? "Sign Up" : <i className="fa fa-spinner fa-spin"></i>}
          </button>
        </form>
        <Link
          className="fw-bolder  pt-4  text-main cursor-pointer "
          to="/forgetpassword"
        >
          Forgot password
        </Link>
      </div>
    </div>
  );
}
