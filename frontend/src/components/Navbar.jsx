import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

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
            <Link to="/">Home</Link>
          </div>
          <div className="hover:text-blue-900 hover:underline">
            <Link to="about">About</Link>
          </div>
          <div className="hover:text-blue-900 hover:underline">
            <Link to="bmi">BMI Calculator</Link>
          </div>
          <div className="hover:text-blue-900 hover:underline">
            <Link to="contact">Contact</Link>
          </div>
          <div className="hover:text-blue-900 hover:underline">
            <Link to="prediction">prediction</Link>
          </div>
        </div>
        <div className="text-end text-xl hover:text-blue-900 hover:underline">
          {user ? (
            <>
              <div
                className="relative inline-block"
                onMouseEnter={handleMouseEnter}
              >
                Name
                {isDropdownVisible && (
                  <div
                    className="absolute right-0 mt-2 min-w-28 bg-white border border-gray-200 rounded-md shadow-lg align"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-center"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/history"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-center"
                    >
                      History
                    </Link>
                    <Link
                      to="/"
                      onClick={handleLogout}
                      className="hover:underline block px-4 py-2 text-gray-800 hover:bg-gray-100 text-center"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
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
