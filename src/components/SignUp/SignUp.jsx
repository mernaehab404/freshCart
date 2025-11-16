import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function SignUp() {
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  function sendDataToApi(values) {
    setLoading(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        console.log(data);
        if (data.status === 200 || data.message === "success") {
          navigate("/signin");
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
      name: Yup.string().min(3).max(8).required(),
      email: Yup.string().email().required(),
      password: Yup.string()
        .matches(/^[A-Z][a-zA-Z0-9@]{6,}$/)
        .required(),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")])
        .required(),
    });
    return schema;
  }
  let register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted", values);
      //send to api
      sendDataToApi(values);
    },
  });
  console.log(register.errors);
  return (
      <div className="my-4">
        <form onSubmit={register.handleSubmit}>
          <label htmlFor="name" className="fw-semibold">Name:</label>
          <input
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            value={register.values.name}
            type="text"
            name="name"
            id="name"
            className="form-control"
          />
          {register.errors.name && register.touched.name ? (
            <div className="text-danger fs-6">{register.errors.name}</div>
          ) : (
            ""
          )}
          <label htmlFor="email" className="fw-semibold mt-3">Email:</label>
          <input
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            value={register.values.email}
            type="email"
            name="email"
            id="email"
            className="form-control"
          />
          {register.errors.email && register.touched.email ? (
            <div className="text-danger fs-6">{register.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password" className="fw-semibold mt-3">Password:</label>
          <input
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            value={register.values.password}
            type="password"
            name="password"
            id="password"
            className="form-control"
          />
          {register.errors.password && register.touched.password ? (
            <div className="text-danger fs-6">{register.errors.password}</div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword" className="fw-semibold mt-3">rePassword:</label>
          <input
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            value={register.values.rePassword}
            type="password"
            name="rePassword"
            id="rePassword"
            className="form-control"
          />
          {register.errors.rePassword && register.touched.rePassword ? (
            <div className="text-danger fs-6">
              {register.errors.rePassword}
            </div>
          ) : (
            ""
          )}
          {errorMsg ? (
            <div className="alert alert-danger p-1 mt-2 fs-6">{errorMsg}</div>
          ) : null}
          <button
            disabled={!(register.dirty && register.isValid)}
            type="submit"
            className="btn bg-main my-3 w-100 border-0 text-white"
          >
            {loading ? "Register" : <i className="fa fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
  );
}
