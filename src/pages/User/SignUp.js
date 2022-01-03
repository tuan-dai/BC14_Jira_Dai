import React, { useRef } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { signUp } from "../../redux/actions/signup";

export default function SignUp(props) {
  const myRef = useRef(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      email: "",
      passWord: "",
    },
    onSubmit: (values) => {
      dispatch(signUp(values, myRef));
    },
    validationSchema: Yup.object({
      name: Yup.string().required("User name is required"),
      phoneNumber: Yup.string()
        .required("Phone number is required")
        .min(6, "Too short")
        .max(12, "Too long"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is not valid"),
      passWord: Yup.string()
        .required("Password is required")
        .min(8, "Too short"),
    }),
  });

  const { handleSubmit, handleChange, errors, touched, dirty } = formik;

  return (
    <div className="modal fade" id="signUpModal" tabIndex={-1} role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bg-blue-400">
            <h5
              className="modal-title font-bold text-4xl text-white ml-44"
              id="exampleModalLabel"
            >
              Sign up
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
              ref={myRef}>
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <form onSubmitCapture={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>User name</label>
                <input type="text" className="form-control" name="name" onChange={handleChange}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="form-group">
                <label>Phone number</label>
                <input type="number" className="form-control" name="phoneNumber" onChange={handleChange} />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" name="email" onChange={handleChange} />
                {errors.email && touched.email && (
                  <p className="text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name="passWord" onChange={handleChange} />
                {errors.passWord && touched.passWord && (
                  <p className="text-red-500">{errors.passWord}</p>
                )}
              </div>

              <button
                type="submit" disabled={!dirty && errors}
                className="w-full py-3 mt-3 text-white text-2xl rounded-md bg-blue-400 
                hover:bg-blue-800 duration-500 focus:outline-none">
                Sign up
              </button>
            </div>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}
