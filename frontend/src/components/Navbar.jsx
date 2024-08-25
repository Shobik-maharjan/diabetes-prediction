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
    navigate("/login");
  };
  return (
    <>
      <div className="flex justify-between h-20 items-center">
        <div className="text-2xl transition duration-300 hover:scale-110">
          <Link to="/">DiabetesPrediction</Link>
        </div>
        <div className="flex gap-8 justify-between text-xl">
          <div className="hover:text-blue-900 hover:underline">
            <Link to="home">Home</Link>
          </div>
          <div className="hover:text-blue-900 hover:underline">
            <Link to="about">About</Link>
          </div>
          <div className="hover:text-blue-900 hover:underline">
            <Link to="contact">Contact</Link>
          </div>
        </div>
        <div className="text-end text-xl hover:text-blue-900 hover:underline">
          {user ? (
            <>
              <Link to="/" onClick={handleLogout}>
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
