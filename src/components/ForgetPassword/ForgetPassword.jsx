import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import ResetPassword from "../ResetPassword/ResetPassword";
import { toast } from "react-toastify";

export default function ForgetPassword({ show, onClose }) {
  const [resetPassword, setResetPassword] = useState(true);
  const [showReset, setShowReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  let mySchema;
  if (resetPassword) {
    mySchema = Yup.object({
      email: Yup.string()
        .email("email isn't valid")
        .required("email is required"),
    });
  } else {
    mySchema = Yup.object({
      resetCode: Yup.string()
        .required("resetCode is required")
        .matches(/^[0-9]{5,6}$/, "resetCode must be 5 or 6 numbers"),
    });
  }

  let initialValues = resetPassword ? { email: "" } : { resetCode: "" };
  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: mySchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      getEmail(values);
    },
  });

  // let endPoint = resetPassword ? "forgotPasswords" : "verifyResetCode";
  async function getEmail(values) {
    setLoading(true);

    try {
      if (resetPassword) {
        // Step 1 → send email
        const { status } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
          values
        );

        if (status === 200) {
          toast.success("Email sent successfully. Check your inbox.");
          setUserEmail(formik.values.email);
          setResetPassword(false); // show code input next
          formik.resetForm(); // clear previous values
        }
      } else {
        // Step 2 → verify reset code
        const { status } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
          values
        );

        if (status === 200) {
          toast.success("Code verified successfully.");
          // onClose(); // close ForgetPassword modal
          setShowReset(true); // open ResetPassword modal
          setResetPassword(true); // reset back to first step for next open
          formik.resetForm();
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!show) return null;
  return (
    <>
      <div
        className="modal d-block"
        tabIndex="-1"
        style={{ backgroundColor: "#00000080" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h5 className="modal-title">Forgot Password</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  // Close modal
                  onClose();

                  // Reset all states and form values
                  setResetPassword(true); // Go back to "email" step
                  setShowReset(false); // Hide reset modal if open
                  formik.resetForm(); // Clear form values and touched/errors
                }}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  {resetPassword ? (
                    <>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-danger">{formik.errors.email}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter reset code"
                        name="resetCode"
                        value={formik.values.resetCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.resetCode && formik.errors.resetCode && (
                        <p className="text-danger">{formik.errors.resetCode}</p>
                      )}
                    </>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn bg-main w-100 pointer-cursor text-white"
                  disabled={!(formik.isValid && formik.dirty) || loading}
                >
                  {resetPassword ? "Next" : "Confirm"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ResetPassword
        email={userEmail}
        show={showReset}
        onClose={() => {
          setShowReset(false);
          onClose();
        }}
      />
    </>
  );
}
