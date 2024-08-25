import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activate } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const ActivatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uid, token } = useParams();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      uid,
      token,
    };
    dispatch(activate(userData));
    toast.success("Your account has been activated!");
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/");
    }
  }, [isError, isSuccess]);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2 className="text-4xl">Click here to activate your account</h2>

        <button
          className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-500/80 text-xl"
          onClick={handleSubmit}
        >
          Activate Account
        </button>
      </div>
    </>
  );
};

export default ActivatePage;
