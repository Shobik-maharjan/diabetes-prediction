import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <>
      <div className="grid grid-cols-5 justify-between px-8 py-4 bg-blue-400 items-center">
        <div className="text-3xl col-span-2">
          <Link to="/">DIabetesPrediction</Link>
        </div>
        <div className="flex gap-4 justify-between col-span-1">
          <div>
            <Link to="home">Home</Link>
          </div>
          <div>
            <Link to="about-us">About&nbsp;Us</Link>
          </div>
          <div>
            <Link to="contact">Contact</Link>
          </div>
        </div>
        <div className="col-span-2 text-end">
          {user ? (
            <>
              <Link to="/" className="pl-6" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="login">Login</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
