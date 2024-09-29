import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo, logout, reset } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { FaCircleUser } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icons

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false); // State for mobile menu

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const { user, userInfo } = useSelector((state) => state.auth);

  // Define isTokenExpired function
  const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Check if token is expired
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && isTokenExpired(user.access)) {
      dispatch(logout());
      dispatch(reset());
      navigate("/login");
    }
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const handleLogoutAndCloseMenu = () => {
    handleLogout();
    toggleMobileMenu();
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch, navigate]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuVisible((prev) => !prev);
  };

  return (
    <>
      <div className="bg-blue-400 sticky top-0 z-40">
        <div className="flex justify-between items-center w-10/12 h-20 m-auto">
          <div className="text-2xl transition duration-300 hover:scale-110">
            <Link to="/" onClick={() => setMobileMenuVisible(false)}>
              DiabetesPrediction
            </Link>
          </div>
          <div className="gap-8 justify-between text-xl hidden md:flex">
            {/* Hidden on mobile */}
            <div className="hover:text-blue-900 hover:underline">
              <Link to="/">Home</Link>
            </div>
            <div className="hover:text-blue-900 hover:underline">
              <Link to="/about">About</Link>
            </div>
            <div className="hover:text-blue-900 hover:underline">
              <Link to="/contact">Contact</Link>
            </div>
            <div className="hover:text-blue-900 hover:underline">
              <Link to="/prediction">Prediction</Link>
            </div>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-3xl">
              {isMobileMenuVisible ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div className="text-end text-xl hover:text-blue-900 hover:underline hidden md:block">
            {/* Hide dropdown on mobile */}
            {user ? (
              <>
                <div
                  className="relative inline-block"
                  onMouseEnter={handleMouseEnter}
                >
                  <div className="flex items-center gap-2">
                    <FaCircleUser className="text-3xl" />
                    {userInfo?.first_name}
                  </div>
                  {isDropdownVisible && (
                    <div
                      className="absolute -right-8 mt-2 min-w-28 bg-white border border-gray-200 rounded-md shadow-lg align"
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
                <Link to="/login">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuVisible && (
        <div className="md:hidden bg-blue-400 w-40 h-screen top-20 fixed z-10 right-0">
          <div className="flex flex-col items-center">
            <Link
              to="/"
              className="text-xl py-2 hover:text-blue-900 hover:underline"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-xl py-2 hover:text-blue-900 hover:underline"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-xl py-2 hover:text-blue-900 hover:underline"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            <Link
              to="/prediction"
              className="text-xl py-2 hover:text-blue-900 hover:underline"
              onClick={toggleMobileMenu}
            >
              Prediction
            </Link>
            {/* Profile, History, and Logout in the Mobile Menu */}
            {user && (
              <>
                <Link
                  to="/profile"
                  className="text-xl py-2 hover:text-blue-900 hover:underline"
                  onClick={toggleMobileMenu}
                >
                  Profile
                </Link>
                <Link
                  to="/history"
                  className="text-xl py-2 hover:text-blue-900 hover:underline"
                  onClick={toggleMobileMenu}
                >
                  History
                </Link>
                <Link
                  onClick={handleLogoutAndCloseMenu} // Use combined function here
                  className="text-xl py-2 hover:text-blue-900 hover:underline"
                >
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
