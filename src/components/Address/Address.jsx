import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { cartContext } from "../Context/CartContext";

export default function Address() {
    let {id}=useParams()
    let navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);
    let {payment} =useContext(cartContext)
async  function sendDataToApi(values){
        setLoading(false)
       let {data}= await payment(id,values)
       console.log(data);
       if (data.status=='success'){
        window.location.href=data.session.url
       }
}
  function validationSchema() {
    let schema = new Yup.object({
      details: Yup.string().min(13).max(30).required(),
      phone: Yup.number().required(),
      city: Yup.string().required(),
    });
    return schema;
  }
  let pay = useFormik({
    initialValues: {
        details: "",
        phone: "",
        city: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted", values);
      //send to api
      sendDataToApi(values)
    },
  });
  console.log(
  pay.errors
  );
  return (
    <div>
      <div className="w-75 m-auto my-4">
     
        <form onSubmit={pay.handleSubmit}>
          <label htmlFor="details">Details:</label>
          <input
            onBlur={pay.handleBlur}
            onChange={pay.handleChange}
            value={pay.values.details}
            type="text"
            name="details"
            id="details"
            className="form-control mb-3"
          />
          {pay.errors.details  && pay.touched.details ? <div className="alert alert-danger">{pay.errors.details}</div>: ''}
          <label htmlFor="phone">Phone:</label>
          <input
            onBlur={pay.handleBlur}
            onChange={pay.handleChange}
            value={pay.values.phone}
            type="text"
            name="phone"
            id="phone"
            className="form-control mb-3"
          />
          {pay.errors.phone && pay.touched.phone ? <div className="alert alert-danger">{pay.errors.phone}</div>: ''}

          <label htmlFor="city">City:</label>
          <input
            onBlur={pay.handleBlur}
            onChange={pay.handleChange}
            value={pay.values.city}
            type="city"
            name="city"
            id="city"
            className="form-control mb-3"
          />
          {pay.errors.city  && pay.touched.city ? <div className="alert alert-danger">{pay.errors.city}</div>: ''}

         
          
{errorMsg? <div className="alert alert-danger">{errorMsg}</div> : null}
          <button disabled={!(pay.dirty&&pay.isValid)} type="submit" className="btn bg-main">
            {loading ? 'Pay Now' : <i className="fa fa-spinner fa-spin"></i>}
            
          </button>
        </form>
      </div>
    </div>
  );
}
