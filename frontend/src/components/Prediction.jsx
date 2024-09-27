import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictSchema } from "../schemas";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "../features/auth/authSlice";

const Prediction = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const token = user ? user.access : null;
  const dispatch = useDispatch();

  const formLabel = [
    {
      label: "Number of times Pregnant: (0 for male)",
      name: "Pregnancies",
    },
    { label: "Glucose level (mg/dL): (70-300)", name: "Glucose" },
    { label: "Diastolic Blood Pressure: (normal < 80)", name: "BloodPressure" },
    { label: "Skin thickness (in mm)", name: "SkinThickness" },
    { label: "Insulin level (µU/mL):", name: "Insulin" },
    { label: "BMI (normal < 25)", name: "BMI" },
    {
      label: "Diabetes Pedigree Function (0-2.5)",
      name: "DiabetesPedigreeFunction",
    },
    { label: "Age (in Years > 16)", name: "Age" },
  ];

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        Pregnancies: "",
        Glucose: "",
        BloodPressure: "",
        SkinThickness: "",
        Insulin: "",
        BMI: "",
        DiabetesPedigreeFunction: "",
        Age: "",
      },
      validationSchema: predictSchema,
      onSubmit: async (values, action) => {
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

          setResult(result); // Assuming 'result' contains the prediction
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
  console.log(result);
  useEffect(() => {
    if (!user) {
      dispatch(logout());
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex flex-col py-10 justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className=" px-8 py-10 bg-gray-200 rounded-md w-9/12 m-auto">
            <h1 className="uppercase text-2xl py-6 text-center">
              Diabetes Prediction
            </h1>
            <div className="grid grid-cols-2 gap-8 pb-4">
              {formLabel.map((field, i) => (
                <div key={i}>
                  <label htmlFor="field.name" className="">
                    {field.label}
                  </label>
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
              {/* <label htmlFor="Pregnancies">
                  Number of times Pregnent: (0 if you are male)
                </label>
                <input
                  type="number"
                  id="Pregnancies"
                  name="Pregnancies"
                  value={values.Pregnancies}
                  onChange={handleChange}
                  className="py-2 px-2.5 w-full rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Glucose">Glucose level (mg/dL):(70-300)</label>
                <input
                  type="number"
                  id="Glucose"
                  name="Glucose"
                  value={values.Glucose}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="py-2 px-2.5 rounded-md"
                />
                <div className="text-red-500">
                  {errors.Glucose && touched.Glucose ? errors.Glucose : null}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="BloodPressure">
                  Diastolic Blood Pressure:(normal &lt; 80)
                </label>
                <input
                  type="number"
                  id="BloodPressure"
                  name="BloodPressure"
                  value={values.BloodPressure}
                  onChange={handleChange}
                  className="py-2 px-2.5 rounded-md"
                />
                <div className="text-red-500">
                  {errors.BloodPressure && touched.BloodPressure
                    ? errors.BloodPressure
                    : null}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="SkinThickness">Skin thickness (in mm)</label>
                <input
                  type="number"
                  id="SkinThickness"
                  name="SkinThickness"
                  value={values.SkinThickness}
                  onChange={handleChange}
                  className="py-2 px-2.5 rounded-md"
                />
                <div className="text-red-500">
                  {errors.SkinThickness && touched.SkinThickness
                    ? errors.SkinThickness
                    : null}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="Insulin">Insulin level (µU/mL):</label>
                <input
                  type="number"
                  id="Insulin"
                  name="Insulin"
                  value={values.Insulin}
                  onChange={handleChange}
                  className="py-2 px-2.5 rounded-md"
                />
                <div className="text-red-500">
                  {errors.Insulin && touched.Insulin ? errors.Insulin : null}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="BMI">BMI (normal &lt; 25)</label>
                <input
                  type="number"
                  id="BMI"
                  name="BMI"
                  value={values.BMI}
                  onChange={handleChange}
                  className="py-2 px-2.5 rounded-md"
                />
                <div className="text-red-500">
                  {errors.BMI && touched.BMI ? errors.BMI : null}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="DiabetesPedigreeFunction">
                  Diabetes Pedigree Function (0-2.5)
                </label>
                <input
                  type="number"
                  id="DiabetesPedigreeFunction"
                  name="DiabetesPedigreeFunction"
                  value={values.DiabetesPedigreeFunction}
                  onChange={handleChange}
                  className="py-2 px-2.5 rounded-md"
                />
                <div className="text-red-500">
                  {errors.DiabetesPedigreeFunction &&
                  touched.DiabetesPedigreeFunction
                    ? errors.DiabetesPedigreeFunction
                    : null}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Age">Age (&gt;16)</label>
                <input
                  type="number"
                  id="Age"
                  name="Age"
                  value={values.Age}
                  onChange={handleChange}
                  className="py-2 px-2.5 rounded-md"
                />
                <div className="text-red-500">
                  {errors.Age && touched.Age ? errors.Age : null}
                </div>*/}
              {/* </div> */}
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
            {result && (
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
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Prediction;
