import React, { useState, useEffect } from "react";

const DiabetesInfoSlider = () => {
  const descriptions = [
    {
      title: "Diabetes",
      description:
        "Diabetes is a chronic condition where the body cannot effectively manage blood sugar levels due to insulin issues, leading to serious health risks if left untreated.",
      image: "./src/assets/images/diabetesSlider.jpg",
    },
    {
      title: "Pregnancies",
      description:
        "The number of pregnancies a patient has had. This is important in diabetes prediction, particularly for women who may develop gestational diabetes.",
      image: "./src/assets/images/pregnancySlider.jpg",
    },
    {
      title: "Glucose",
      description:
        "Glucose refers to the blood sugar level. High glucose levels are a key indicator of diabetes, especially when fasting or after meals.",
      image: "./src/assets/images/glucose.jpg",
    },
    {
      title: "Blood Pressure",
      description:
        "Blood pressure measures the force of blood against artery walls. High blood pressure is often linked to insulin resistance and increased diabetes risk.",
      image: "./src/assets/images/bloodpressure.jpg",
    },
    {
      title: "Skin Thickness",
      description:
        "The thickness of the triceps skin fold. This is a measure of body fat, and higher values may indicate a higher risk of diabetes due to obesity.",
      image: "./src/assets/images/skinThickness.jpeg",
    },
    {
      title: "Insulin",
      description:
        "Insulin helps regulate blood sugar levels. Measuring insulin can indicate how well the body manages blood sugar, important for identifying diabetes.",
      image: "./src/assets/images/insulin.jpeg",
    },
    {
      title: "BMI",
      description:
        "Body Mass Index is a measure of body fat based on height and weight. Higher BMI is associated with a higher risk of type 2 diabetes.",
      image: "./src/assets/images/bmi.jpeg",
    },
    {
      title: "Diabetes Pedigree Function",
      description:
        "This score assesses the likelihood of developing diabetes based on family history and genetics. A higher score suggests a greater risk.",
      image: "./src/assets/images/dpf.jpeg",
    },
    {
      title: "Age",
      description:
        "The risk of developing diabetes increases with age, as insulin sensitivity typically decreases over time.",
      image: "./src/assets/images/age.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === descriptions.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle the previous slide (if needed)
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? descriptions.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide with 3 second interval
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3500); // 3000 milliseconds (3 seconds)

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [currentIndex]);

  return (
    <div className=" mt-4 flex flex-col items-center justify-center">
      <div className="relative w-full">
        <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform duration-500 ease-in-out transform">
          {/* Image */}
          <img
            src={descriptions[currentIndex].image}
            alt={descriptions[currentIndex].title}
            className="w-full h-80 object-scale-down rounded-lg mb-4"
          />

          {/* Title and Description */}
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            {descriptions[currentIndex].title}
          </h2>
          <p className="text-gray-950 font-medium text-xl min-h-16">
            {descriptions[currentIndex].description}
          </p>
        </div>

        {/* Previous Button */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-indigo-300 hover:bg-indigo-600 px-4 py-2 rounded-full shadow-md focus:outline-none"
          onClick={prevSlide}
        >
          ‹
        </button>

        {/* Next Button */}
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-indigo-300 hover:bg-indigo-600 px-4 py-2 rounded-full shadow-md focus:outline-none"
          onClick={nextSlide}
        >
          ›
        </button>
      </div>

      {/* Slider Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {descriptions.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-indigo-600" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DiabetesInfoSlider;
