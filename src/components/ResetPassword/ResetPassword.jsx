import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword({ email, show, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [show]);

  const mySchema = Yup.object({
    // email: Yup.string()
    //   .email("Email isn't valid")
    //   .required("Email is required"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-zA-Z0-9@]{6,}$/,
        "Must start with uppercase and be at least 7 chars"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email,
      newPassword: "",
    },
    validationSchema: mySchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
          values
        );
        if (response.data.token) {
          localStorage.removeItem("token");
          setIsLoading(false);
          formik.resetForm();
          onClose(); // close modal
          navigate("/auth");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        setIsLoading(false);
      }
    },
  });

  if (!show || !email) return null; // modal closed

  return (
    <div
      className={`modal fade ${show ? "show d-block" : "d-none"}`}
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      style={{
        backgroundColor: "#00000080",
        transition: "opacity 0.3s ease",
      }}
      // onClick={onClose} // close when clicking outside
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className="modal-content p-3 position-relative">
          <div className="modal-header border-0">
            <h1 className="modal-title fs-3 fw-bold text-center w-100">
              Reset Password
            </h1>
            <button
              type="button"
              className="btn-close position-absolute end-0 me-3"
              onClick={() => {
                onClose();
                formik.resetForm();
              }}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email..."
                  name="email"
                  value={email}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  readOnly
                />
                {/* {formik.touched.email && formik.errors.email && (
                  <p className="text-danger">{formik.errors.email}</p>
                )} */}
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Your new password..."
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="text-danger">{formik.errors.newPassword}</p>
                )}
              </div>

              <button
                type="submit"
                className="btn bg-main fw-bold text-light w-100 mt-3"
                disabled={!(formik.isValid && formik.dirty) || isLoading}
              >
                {isLoading ? "loading..." : " Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
