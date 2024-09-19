import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mb-10">
      <div>Description About diabetes</div>
      <div>Pregnancies</div>
      <div>Glucose</div>
      <div>BloodPressure</div>
      <div>SkinThickness</div>
      <div>Insulin</div>
      <div>BMI</div>
      <div>DiabetesPedigreeFunction</div>
      <div>Age</div>
      <div className="text-center">
        <h2 className="text-3xl">Click here to Predict</h2>
        <button className="bg-blue-400 px-4 py-2 rounded-md">
          <Link to="/prediction">Prediction</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
