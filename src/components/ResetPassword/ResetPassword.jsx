import React, { useContext, useState } from 'react'; 
import { useFormik } from 'formik'; 
import { Triangle } from 'react-loader-spinner'; 
import * as Yup from 'yup'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
 
 
export default function ResetPassword() { 
  const [isLoading, setIsLoading] = useState(false); 
 
  const navigate = useNavigate(); 
 
  const mySchema = Yup.object({ 
    email: Yup.string().email("Email isn't valid").required('Email is required'), 
    newPassword: Yup.string().required('Password is required').matches(/^[A-Z][a-zA-Z0-9@]{6,}$/), 
  }); 
 
  const formik = useFormik({ 
    initialValues: { 
      email: '', 
      newPassword: '', 
    }, 
    validationSchema: mySchema, 
    onSubmit: async (values) => { 
      setIsLoading(true); 
      try { 
        const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values); 
        if (response.data.token) { 
          localStorage.removeItem("token"); 
     
          setIsLoading(false); 
          navigate("/signin"); 
        } 
      } catch (error) { 
        console.log(error); 
        setIsLoading(false); 
      } 
    } 
  }); 
 
  return ( 
    <> 
      {isLoading ? 
        <div className='loading d-flex align-items-center justify-content-center'> 
          <Triangle 
            visible={true} 
            height="80" 
            width="80" 
            color="var(--main-color)" 
            ariaLabel="triangle-loading" 
            wrapperStyle={{}} 
            wrapperClass="" /> 
        </div> : 
        <div className="container mx-auto forget-content bg-light-subtle shadow"> 
          <h1 className='text-center mb-5 fw-bolder'>Reset Password</h1> 
          <form onSubmit={formik.handleSubmit}> 
            <div className="mb-3 row"> 
              <div className="col-md-12 my-3"> 
                <input type="email" className="form-control" placeholder="Your email......." value={formik.values.email} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} /> 
                {formik.touched.email && formik.errors.email ? <p className='text-danger'>{formik.errors.email}</p> : ""} 
              </div> 
              <div className="col-md-12 my-3"> 
                <input type="password" className="form-control" placeholder="Your new password......." value={formik.values.newPassword} name="newPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} /> 
                {formik.touched.newPassword && formik.errors.newPassword ? <p className='text-danger'>{formik.errors.newPassword}</p> : ""} 
              </div> 
              <div className="col-md-5 my-3"> 
                <button type="submit" className="btn bg-main fw-bolder text-light fs-5 w-100" disabled={!(formik.isValid && formik.dirty)}>Reset password</button> 
              </div> 
            </div> 
          </form> 
        </div> 
      } 
    </> 
  ); 
}