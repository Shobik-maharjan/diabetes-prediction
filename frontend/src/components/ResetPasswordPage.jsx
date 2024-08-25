import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordConfirm } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const { uid, token } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      uid,
      token,
      new_password,
      re_new_password,
    };
    dispatch(resetPasswordConfirm(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/");
      toast.success("Your password was reset successfullt");
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <form action="" className="w-96 mx-auto flex py-10">
        <div className="flex flex-col gap-4 text-center bg-gray-200 px-8 py-10 rounded-md">
          <h2 className="font-bold text-xl">Reset Passowrd Here</h2>
          <p>Enter your email address to reset your password</p>

          <div className="flex flex-col gap-4">
            <input
              type="password"
              name="new_password"
              placeholder="New Password"
              className="border border-black p-2 rounded-md"
              onChange={handleChange}
              value={new_password}
            />
            <input
              type="password"
              name="re_new_password"
              placeholder="Confirm New Password"
              className="border border-black p-2 rounded-md"
              onChange={handleChange}
              value={re_new_password}
            />
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-400/90 text-white py-2.5 px-5 rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
            {/* {error && <div className="text-red-500 text-left">{error}</div>} */}
          </div>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordPage;
