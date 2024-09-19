import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Prediction = () => {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const token = user ? user.access : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data object
    const formData = {
      Pregnancies: parseFloat(e.target.Pregnancies.value),
      Glucose: parseFloat(e.target.Glucose.value),
      BloodPressure: parseFloat(e.target.BloodPressure.value),
      SkinThickness: parseFloat(e.target.SkinThickness.value),
      Insulin: parseFloat(e.target.Insulin.value),
      BMI: parseFloat(e.target.BMI.value),
      DiabetesPedigreeFunction: parseFloat(
        e.target.DiabetesPedigreeFunction.value
      ),
      Age: parseFloat(e.target.Age.value),
    };

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/diabetes-prediction/",
        {
          // Replace with your actual backend URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setResult(result.result); // Assuming 'result' contains the prediction
    } catch (error) {
      if (!token) {
        setResult("Please Login to predict");
      }
      console.error("Error:", error);
      // setResult("Error: Unable to predict. Please try again.");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex flex-col py-10 justify-center items-center">
        <form onSubmit={handleSubmit} className="w-96">
          <div className=" px-8 py-10 bg-gray-200 rounded-md  uppercase">
            <h1 className="uppercase text-2xl py-6">Diabetes Prediction</h1>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="Pregnancies">Pregnancies:</label>
                <input
                  type="number"
                  id="Pregnancies"
                  name="Pregnancies"
                  value={formData.Pregnancies}
                  onChange={handleChange}
                  required
                  className="py-2 px-2.5 w-full rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Glucose">Glucose:</label>
                <input
                  type="number"
                  id="Glucose"
                  name="Glucose"
                  value={formData.Glucose}
                  onChange={handleChange}
                  required
                  className="py-2 px-2.5 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="BloodPressure">Blood Pressure:</label>
                <input
                  type="number"
                  id="BloodPressure"
                  name="BloodPressure"
                  value={formData.BloodPressure}
                  onChange={handleChange}
                  required
                  className="py-2 px-2.5 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="SkinThickness">Skin Thickness:</label>
                <input
                  type="number"
                  id="SkinThickness"
                  name="SkinThickness"
                  value={formData.SkinThickness}
                  onChange={handleChange}
                  required
                  className="py-2 px-2.5 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Insulin">Insulin:</label>
                <input
                  type="number"
                  id="Insulin"
                  name="Insulin"
                  value={formData.Insulin}
                  onChange={handleChange}
                  required
                  className="py-2 px-2.5 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="BMI">BMI:</label>
                <input
                  type="number"
                  id="BMI"
                  name="BMI"
                  value={formData.BMI}
                  onChange={handleChange}
                  required
                  className="py-2 px-2.5 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="DiabetesPedigreeFunction">
                  Diabetes Pedigree Function:
                </label>
                <input
                  type="number"
                  id="DiabetesPedigreeFunction"
                  name="DiabetesPedigreeFunction"
                  value={formData.DiabetesPedigreeFunction}
                  onChange={handleChange}
                  required
                  className="py-2 px-2.5 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Age">Age:</label>
                <input
                  type="number"
                  id="Age"
                  name="Age"
                  value={formData.Age}
                  onChange={handleChange}
                  required
                  className="py-2 px-2.5 rounded-md"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`py-2.5 px-5 text-black rounded-md text-xl uppercase mb-2.5 w-full mt-2 bg-blue-400 ${
                  loading ? "cursor-not-allowed" : ""
                } `}
              >
                Predict
              </button>
            </div>
            {result && (
              <div>
                <h2 className="text-xl text-center">
                  Prediction Result: {loading ? "predicting..." : result}
                </h2>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Prediction;
