import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
            <Link to="about-us">About Us</Link>
          </div>
          <div>
            <Link to="contact">Contact</Link>
          </div>
        </div>
        <div className="col-span-2 text-end">
          <Link to="login">Login</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
