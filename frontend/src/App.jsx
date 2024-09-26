import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserLayout from "./layout/UserLayout";
import UserRoute from "./routes/UserRoute";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserLayout />}>
            <Route path="*" element={<UserRoute />} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
