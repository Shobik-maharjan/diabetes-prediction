import React, { useState } from "react";

const BmiCalculation = ({ setBmiValue, closeModal }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const handleBmiCalculation = (e) => {
    e.preventDefault();

    if (weight && height) {
      const bmi = (parseFloat(weight) / parseFloat(height) ** 2).toFixed(2);
      setBmiValue(bmi); // Pass BMI value to parent component
      closeModal(); // Close modal after calculation
    }
  };

  return (
    <div className="p-4">
      <div className="pb-2 font-bold text-2xl">BMI Calculation</div>
      <form onSubmit={handleBmiCalculation}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="Weight">Weight (kg)</label>
            <input
              type="text"
              name="weight"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="Height">Height (meters)</label>
            <input
              type="text"
              name="height"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="py-2.5 px-5 text-black rounded-md text-xl uppercase mb-2.5 w-full mt-2 bg-blue-400 hover:bg-blue-400/90"
          >
            Calculate
          </button>
        </div>
      </form>
    </div>
  );
};

export default BmiCalculation;
