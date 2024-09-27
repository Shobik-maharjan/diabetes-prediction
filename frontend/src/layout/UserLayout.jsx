import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[url('https://images.pexels.com/photos/6941884/pexels-photo-6941884.jpeg?cs=srgb&dl=pexels-n-voitkevich-6941884.jpg&fm=jpg')] bg-contain bg-center">
      <Navbar />
      <div className="flex-grow w-10/12 mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
