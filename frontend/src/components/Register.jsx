import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        re_password: "",
      },
      validationSchema: registerSchema,
      onSubmit: (values, action) => {
        dispatch(register(values));
        action.resetForm();
      },
    });

  useEffect(() => {
    if (isError) {
      toast.error(message.email[0]);
    }
    if (isSuccess || user) {
      navigate("/login");
      toast.success(
        "An activation email has been sent to your email. Please check your email address"
      );
    }
    dispatch(reset());
  }, [isError, isSuccess, user, navigate, dispatch]);

  return (
    <>
      <div className="flex py-10 justify-center items-center">
        <form action="" onSubmit={handleSubmit} className="w-96">
          <div className="bg-gray-200 rounded-md uppercase px-8 py-10">
            <h2 className="text-center text-2xl">Register</h2>
            <div className="flex flex-col gap-2 mt-4">
              <div className="input-container">
                <label htmlFor="first_name" className="required">
                  First Name
                </label>
                <input
                  value={values.first_name}
                  type="text"
                  name="first_name"
                  id="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="First Name"
                  className="w-full my-2.5 mx-auto p-2.5 rounded-md outline-none"
                />
                <div className="text-red-500">
                  {errors.first_name && touched.first_name
                    ? errors.first_name
                    : null}
                </div>
              </div>

              <div className="input-container">
                <label htmlFor="last_name" className="required">
                  Last Name
                </label>
                <input
                  value={values.last_name}
                  type="text"
                  name="last_name"
                  id="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Last Name"
                  className="w-full my-2.5 mx-auto p-2.5 rounded-md outline-none"
                />
                <div className="text-red-500">
                  {errors.last_name && touched.last_name
                    ? errors.last_name
                    : null}
                </div>
              </div>

              <div className="mx-0">
                <label htmlFor="email" className="required">
                  Email
                </label>
                <input
                  value={values.email}
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="on"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email@gmail.com"
                  className="w-full my-2.5 mx-auto p-2.5 rounded-md outline-none"
                />
                <div className="text-red-500">
                  {errors.email && touched.email ? errors.email : null}
                </div>
              </div>

              <div className="input-container">
                <label htmlFor="password" className="required">
                  Password
                </label>
                <div className="relative">
                  <input
                    value={values.password}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    className="w-full my-2.5 mx-auto p-2.5 rounded-md outline-none"
                  />
                  {values.password.length > 0 && (
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  )}
                </div>
                <div className="text-red-500">
                  {errors.password && touched.password ? errors.password : null}
                </div>
              </div>
              <div className="input-container">
                <label htmlFor="re_password" className="required">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    value={values.re_password}
                    type={showConfirmPassword ? "text" : "password"}
                    name="re_password"
                    id="re_password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm Password"
                    className="w-full my-2.5 mx-auto p-2.5 rounded-md outline-none"
                  />
                  {values.re_password.length > 0 && (
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  )}
                </div>
                <div className="text-red-500">
                  {errors.re_password && touched.re_password
                    ? errors.re_password
                    : null}
                </div>
              </div>
              <button
                type="submit"
                id="form-login"
                className={`py-2.5 px-5 bg-blue-500 text-white rounded-md text-xl uppercase mb-2.5 w-full hover:bg-blue-500/90 ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
              >
                Register
              </button>
            </div>

            <div className="text-red-500 capitalize">{error}</div>

            <div className="text-right text-lg flex justify-between py-2.5 px-0">
              <Link className="hover:text-blue-400" to={"/login"}>
                Login Here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
