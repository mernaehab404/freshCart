import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ForgetPassword from "../ForgetPassword/ForgetPassword";

export default function SignIn() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showForgetModal, setShowForgetModal] = useState(false);
  function sendDataToApi(values) {
    setLoading(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        console.log(data);
        if (data.message === "success") {
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
    <div className="my-4">
      <form onSubmit={login.handleSubmit}>
        <label htmlFor="email" className="fw-semibold">
          Email:
        </label>
        <input
          onBlur={login.handleBlur}
          onChange={login.handleChange}
          value={login.values.email}
          className="form-control"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
        />
        {login.errors.email && login.touched.email && (
          <div className="text-danger fs-6">{login.errors.email}</div>
        )}
        <label htmlFor="password" className="fw-semibold mt-4">
          Password:
        </label>
        <input
          onBlur={login.handleBlur}
          onChange={login.handleChange}
          value={login.values.password}
          className="form-control"
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
        />
        {login.errors.password && login.touched.password && (
          <div className="text-danger fs-6">{login.errors.password}</div>
        )}

        {errorMsg && (
          <div className="alert alert-danger p-1 mt-2 fs-6">{errorMsg}</div>
        )}

        <button
          disabled={!(login.dirty && login.isValid)}
          type="submit"
          className="btn bg-main my-3 w-100 border-0 text-white"
        >
          {loading ? "Login" : <i className="fa fa-spinner fa-spin"></i>}
        </button>
      </form>
      <p
        onClick={() => setShowForgetModal(true)}
        className="fw-bolder pt-4 text-main cursor-pointer"
      >
        Forgot password?
      </p>
      <ForgetPassword
        show={showForgetModal}
        onClose={() => setShowForgetModal(false)}
      />
    </div>
  );
}
