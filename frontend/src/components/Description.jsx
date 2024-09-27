import React from "react";

const Description = () => {
  const descriptions = [
    {
      title: "Diabetes",
      description:
        "Diabetes is a chronic condition where the body cannot effectively manage blood sugar levels due to insulin issues, leading to serious health risks if left untreated.",
    },
    {
      title: "Pregnancies",
      description:
        "The number of pregnancies a patient has had. This is important in diabetes prediction, particularly for women who may develop gestational diabetes.",
    },
    {
      title: "Glucose",
      description:
        "Glucose refers to the blood sugar level. High glucose levels are a key indicator of diabetes, especially when fasting or after meals.",
    },
    {
      title: "Blood Pressure",
      description:
        "Blood pressure measures the force of blood against artery walls. High blood pressure is often linked to insulin resistance and increased diabetes risk.",
    },
    {
      title: "Skin Thickness",
      description:
        "The thickness of the triceps skin fold. This is a measure of body fat, and higher values may indicate a higher risk of diabetes due to obesity.",
    },
    {
      title: "Insulin",
      description:
        "Insulin helps regulate blood sugar levels. Measuring insulin can indicate how well the body manages blood sugar, important for identifying diabetes.",
    },
    {
      title: "BMI",
      description:
        "Body Mass Index is a measure of body fat based on height and weight. Higher BMI is associated with a higher risk of type 2 diabetes.",
    },
    {
      title: "Diabetes Pedigree Function",
      description:
        "This score assesses the likelihood of developing diabetes based on family history and genetics. A higher score suggests a greater risk.",
    },
    {
      title: "Age",
      description:
        "The risk of developing diabetes increases with age, as insulin sensitivity typically decreases over time.",
    },
  ];

  return (
    <div className="min-h-screen bg-sky-300 p-10 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Diabetes Prediction Parameters
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
        {descriptions.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              {item.title}
            </h2>
            <p className="text-gray-700 text-base">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Description;
