import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const resetUserPassword = (e) => {
    e.preventDefault();
    const userData = {
      email,
    };

    if (email === null || email === "") {
      setError("Please enter your email");
      return;
    } else {
      dispatch(resetPassword(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/");
      toast.success("A reset password email has been sent to you.");
    }
  }, [isError, isSuccess, message, navigate, dispatch]);
  return (
    <>
      <form action="" className="w-96 mx-auto flex py-10">
        <div className="flex flex-col gap-4 text-center bg-gray-200 px-8 py-10 rounded-md">
          <h2 className="font-bold text-xl">Forgot Passowrd ?</h2>
          <p>Enter your email address to reset your password</p>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Example@gmail.com"
              className="p-2 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-400/90 text-white py-2.5 px-5 rounded-md"
              onClick={resetUserPassword}
            >
              Submit
            </button>
            {error && <div className="text-red-500 text-left">{error}</div>}
          </div>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
