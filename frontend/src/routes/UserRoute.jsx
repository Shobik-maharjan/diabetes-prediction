import React from "react";
import { Route, Routes } from "react-router-dom";
import Prediction from "../components/Prediction";
import Login from "../components/Login";
import Register from "../components/Register";
import About from "../components/About";
import ActivatePage from "../components/ActivatePage";
import ResetPassword from "../components/ResetPassword";
import ResetPasswordPage from "../components/ResetPasswordPage";
import NotFoundPage from "../components/NotFoundPage";
import Home from "../layout/pages/home/Home";

const UserRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/activate/:uid/:token" element={<ActivatePage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<ResetPasswordPage />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default UserRoute;
