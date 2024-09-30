import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import Modal from "../components/Modal";
import BmiCalculation from "./BmiCalculation";
import { predictSchema } from "../schemas";
import DPFCalculator from "./DPFCalculation";
import axios from "axios";
import Precautions from "./Precaution";

const Prediction = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isBmiModalOpen, setBmiModalOpen] = useState(false);
  const [isDpfModalOpen, setDpfModalOpen] = useState(false);
  const [bmiValue, setBmiValue] = useState(""); // State for BMI value
  const [dpfValue, setDpfValue] = useState(""); // State for DPF value
  const [isResultModalOpen, setResultModalOpen] = useState(false); // State for the result modal

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const token = user ? user.access : null;
  const dispatch = useDispatch();

  const formLabel = [
    { label: "Number of times Pregnant: (0 for male)", name: "Pregnancies" },
    { label: "Glucose level (mg/dL): (70-300)", name: "Glucose" },
    { label: "Diastolic Blood Pressure: (60 - 120)", name: "BloodPressure" },
    { label: "Skin thickness (0-99 mm)", name: "SkinThickness" },
    { label: "Insulin level (0-846 µU/mL):", name: "Insulin" },
    { label: "BMI (15 - 60)", name: "BMI" },
    {
      label: "Diabetes Pedigree Function (0-2.5)",
      name: "DiabetesPedigreeFunction",
    },
    { label: "Age ( > 16 Years)", name: "Age" },
  ];

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      Pregnancies: "",
      Glucose: "",
      BloodPressure: "",
      SkinThickness: "",
      Insulin: "",
      BMI: bmiValue, // Initialize with BMI state
      DiabetesPedigreeFunction: "",
      Age: "",
    },
    validationSchema: predictSchema,
    onSubmit: async (values) => {
      const formData = {
        Pregnancies: parseFloat(values.Pregnancies),
        Glucose: parseFloat(values.Glucose),
        BloodPressure: parseFloat(values.BloodPressure),
        SkinThickness: parseFloat(values.SkinThickness),
        Insulin: parseFloat(values.Insulin),
        BMI: parseFloat(values.BMI),
        DiabetesPedigreeFunction: parseFloat(values.DiabetesPedigreeFunction),
        Age: parseFloat(values.Age),
      };

      setLoading(true);

      try {
        const response = await fetch(
          "http://localhost:8000/api/diabetes-prediction/",
          {
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

        setResult(result); // Assuming 'result' contains the prediction
        setResultModalOpen(true);
      } catch (error) {
        if (!token) {
          setResult("Please Login to predict");
        }
        console.error("Error:", error);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // action.resetForm();
    },
  });
  useEffect(() => {
    if (!user) {
      dispatch(logout());
      navigate("/login");
    }
  }, [user, navigate, dispatch]);

  // Update the BMI field value when the BMI is calculated
  useEffect(() => {
    if (bmiValue) {
      setFieldValue("BMI", bmiValue);
    }
  }, [bmiValue, setFieldValue]);

  useEffect(() => {
    if (dpfValue) {
      setFieldValue("DiabetesPedigreeFunction", dpfValue); // Update DPF in form
    }
  }, [dpfValue, setFieldValue]);

  // Function to predict skin thickness
  const predictSkinThickness = async () => {
    if (values.Age && values.BMI && values.Glucose) {
      const newUserData = [
        parseFloat(values.Age),
        parseFloat(values.BMI),
        parseFloat(values.Glucose),
      ];

      try {
        const response = await axios.post(
          "http://localhost:8000/api/predict_skin_thickness/",
          {
            Age: newUserData[0],
            BMI: newUserData[1],
            Glucose: newUserData[2],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.estimated_skin_thickness) {
          setFieldValue(
            "SkinThickness",
            response.data.estimated_skin_thickness.toFixed(2)
          ); // Update the SkinThickness field
        }
      } catch (error) {
        console.error("Error predicting skin thickness:", error);
      }
    }
  };

  // Automatically predict skin thickness when Age, BMI, or Glucose changes
  useEffect(() => {
    if (values.Age && values.BMI && values.Glucose) {
      predictSkinThickness();
    }
  }, [values.Age, values.BMI, values.Glucose]);

  return (
    <>
      <div className="flex flex-col py-10 justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="px-8 py-10 bg-gray-200 rounded-md w-9/12 m-auto">
            <h1 className="uppercase text-2xl py-6 text-center">
              Diabetes Prediction
            </h1>

            <div className="grid grid-cols-2 gap-8 pb-4">
              {formLabel.map((field, i) => (
                <div key={i}>
                  <label htmlFor={field.name}>{field.label}</label>
                  <input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={values[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`py-2 px-2.5 w-full rounded-md border ${
                      errors[field.name] && touched[field.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[field.name] && touched[field.name] && (
                    <div className="text-red-500 mt-1">
                      {errors[field.name]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`py-2.5 px-5 text-white rounded-md text-xl uppercase mb-2.5 w-full mt-2 bg-blue-500 hover:bg-blue-500/90 ${
                loading ? "cursor-not-allowed" : ""
              }`}
            >
              Predict
            </button>
            {/* {result && (
              <div>
                <h2 className="text-xl text-center">
                  Prediction Result: {loading ? "predicting..." : result.result}
                </h2>
                {!loading && (
                  <p className="text-center">
                    {result.result === "Diabetic"
                      ? `${result.probability_diabetic} of being Diabetic`
                      : `${result.probability_not_diabetic} of not being Diabetic`}
                  </p>
                )}
              </div>
            )} */}

            {/* Button to open BMI Modal */}
            <button
              type="button"
              onClick={() => setBmiModalOpen(true)}
              className="hover:text-blue-500 underline mt-4"
            >
              Click here to calculate BMI
            </button>
            <br />
            <button
              type="button"
              onClick={() => setDpfModalOpen(true)}
              className="hover:text-blue-500 underline mt-4"
            >
              Click here to calculate DIabetes Pedigree Function
            </button>
          </div>
        </form>
        {/* BMI Calculation Modal */}
        <Modal isOpen={isBmiModalOpen} onClose={() => setBmiModalOpen(false)}>
          <BmiCalculation
            setBmiValue={setBmiValue}
            closeModal={() => setBmiModalOpen(false)}
          />
        </Modal>

        {/* DPF Calculation Modal */}
        <Modal isOpen={isDpfModalOpen} onClose={() => setDpfModalOpen(false)}>
          <DPFCalculator
            setDpfValue={setDpfValue}
            closeModal={() => setDpfModalOpen(false)}
          />
          {/* Render DPFCalculator inside Modal */}
        </Modal>

        {/* Result Modal */}
        <Modal
          isOpen={isResultModalOpen}
          onClose={() => setResultModalOpen(false)}
        >
          {loading ? (
            <p>Predicting...</p>
          ) : (
            <div className="text-center">
              {result?.result === "Diabetic" ? (
                <>
                  <h2 className="text-xl font-semibold text-red-600">
                    Diabetic
                  </h2>
                  <Precautions hasDiabetes={true} />
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-green-600">
                    Not Diabetic
                  </h2>
                  <Precautions hasDiabetes={false} />
                </>
              )}
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Prediction;
