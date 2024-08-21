import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { loginSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [error, setError] = useState("");
  const [showPassowrd, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        console.log(values);
        dispatch(login(values));
        // action.resetForm();
      },
    });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, navigate, dispatch]);
  return (
    <>
      <div className="flex justify-center items-center my-10">
        <form action="" onSubmit={handleSubmit} className="w-96">
          <div className=" px-8 py-10 bg-gray-200 rounded-md  uppercase">
            <h2 className="text-center text-2xl">Login</h2>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email@gmail.com"
                  className="w-full p-2.5 rounded-md outline-none"
                />
                <div className="text-red-500">
                  {errors.email && touched.email ? errors.email : null}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password">Pasword</label>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Passowrd"
                    className="w-full p-2.5 rounded-md outline-none"
                  />
                </div>
                <div className="text-red-500">
                  {errors.password && touched.password ? errors.password : null}
                </div>
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 text-black rounded-md text-xl uppercase mb-2.5 w-full mt-2 bg-blue-400"
              >
                Login
              </button>
            </div>
            <div className="text-right text-xl flex gap-10 py-2.5 px-0">
              <Link className="hover:text-blue-400" to={"/register"}>
                Register
              </Link>
              <Link to="/reset-password" className="hover:text-blue-400">
                Forgot password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
