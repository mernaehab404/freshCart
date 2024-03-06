import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function SignUp() {
    let navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);
     function sendDataToApi(values){
        setLoading(false)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
        .then(({data})=>{
        console.log(data);
        if(data.status == 200 || data.message === 'success'){
navigate('/signin')
        }
    }).catch((err) =>{
        console.log(err.response.data.message);
        setErrorMsg(err.response.data.message);
        setLoading(true)

    } )
}
  function validationSchema() {
    let schema = new Yup.object({
      name: Yup.string().min(3).max(8).required(),
      email: Yup.string().email().required(),
      password: Yup.string().matches(/^[A-Z][a-zA-Z0-9@]{6,}$/).required(),
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
      sendDataToApi(values)
    },
  });
  console.log(
  register.errors
  );
  return (
    <div>
      <div className="w-75 m-auto my-4">
        <h2>Register Now:</h2>
        <form onSubmit={register.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            value={register.values.name}
            type="text"
            name="name"
            id="name"
            className="form-control mb-3"
          />
          {register.errors.name  && register.touched.name ? <div className="alert alert-danger">{register.errors.name}</div>: ''}
          <label htmlFor="email">Email:</label>
          <input
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            value={register.values.email}
            type="email"
            name="email"
            id="email"
            className="form-control mb-3"
          />
          {register.errors.email && register.touched.email ? <div className="alert alert-danger">{register.errors.email}</div>: ''}

          <label htmlFor="password">Password:</label>
          <input
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            value={register.values.password}
            type="password"
            name="password"
            id="password"
            className="form-control mb-3"
          />
          {register.errors.password  && register.touched.password ? <div className="alert alert-danger">{register.errors.password}</div>: ''}

          <label htmlFor="rePassword">rePassword:</label>
          <input
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            value={register.values.rePassword}
            type="password"
            name="rePassword"
            id="rePassword"
            className="form-control mb-3"
          />
          {register.errors.rePassword  && register.touched.rePassword  ? <div className="alert alert-danger">{register.errors.rePassword}</div>: ''}
{errorMsg? <div className="alert alert-danger">{errorMsg}</div> : null}
          <button disabled={!(register.dirty&&register.isValid)} type="submit" className="btn bg-main">
            {loading ? 'Sign Up' : <i className="fa fa-spinner fa-spin"></i>}
            
          </button>
        </form>
      </div>
    </div>
  );
}
