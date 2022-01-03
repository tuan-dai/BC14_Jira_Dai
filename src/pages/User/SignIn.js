import { React } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/actions/signin";

import { useFormik } from "formik";
import * as Yup from "yup";
import SignUp from "./SignUp";

export default function SignIn(props) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
    },
    onSubmit: (values) => {
      dispatch(userLogin(values, props.history));
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("*Email is required")
        .email("*Email is not correct"),
      passWord: Yup.string()
        .required("*Password is required")
        .min(2, "*Too short")
        .max(10, "*Too long"),
    }),
  });

  const { handleSubmit, handleChange, errors, touched } = formik;

  return (
    <div className="row">

      {/* CONTENT */}
      <div className="content-signin my-auto col-lg-6 col-md-6 col-sm-12">
        <div className="w-3/5 mx-auto my-auto">
          <p className="text-3xl text-center">Sign In Jira</p>

          <form onSubmitCapture={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control mt-3 h-12 bg-gray-50"
                type="email"
                placeholder="Your email"
                name="email"
                onChange={handleChange}
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm ml-2">{errors.email}</p>
              )}
              <input
                className="form-control mt-3 h-12 bg-gray-50"
                type="password"
                placeholder="Your password"
                name="passWord"
                onChange={handleChange}
              />
              {errors.passWord && touched.passWord && (
                <p className="text-red-500 text-sm ml-2">{errors.passWord}</p>
              )}
            </div>

            <button
              className="w-full py-3 mt-3 text-white text-xl rounded-lg bg-blue-300 hover:bg-blue-600 duration-500 focus:outline-none border-none"
              type="submit"
            >
              Sign In
            </button>
            <div className="text-3xl m-3 flex justify-center text-blue-900 gap-4">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
            </div>
          </form>
          <div className="text-center border-t-2 pt-4">
            <span>Don't have an account? </span>
            <button
              className="text-blue-600 font-medium focus:outline-none border-none"
              type="submit"
              data-toggle="modal"
              data-target="#signUpModal"
            >
              Register here
            </button>
          </div>
        </div>
      </div>

      {/* PHOTO */}
      <div className="photo-signin col-lg-6 col-md-6">
        <img
          className="h-screen object-cover"
          src="https://picsum.photos/1000/1000"
          alt=""
        />
      </div>
      <SignUp />
    </div>
  );
}
