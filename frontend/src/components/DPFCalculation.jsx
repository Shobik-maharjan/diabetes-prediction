import React, { useState } from "react";

const DPFCalculation = () => {
  const [numImmediate, setNumImmediate] = useState("");
  const [numDistant, setNumDistant] = useState("");
  const [agesOnset, setAgesOnset] = useState("");
  const [dpfScore, setDpfScore] = useState(null);

  const calculateDPF = (numImmediate, numDistant, agesOnsetList) => {
    const immediateWeight = 1; // Weight for immediate relatives
    const distantWeight = 0.25; // Weight for distant relatives

    // Calculate scores
    const immediateScore = numImmediate * immediateWeight || 0;
    const distantScore = numDistant * distantWeight || 0;

    // Calculate age penalty
    const agePenalty = agesOnsetList.reduce((total, age) => {
      if (age < 60) {
        total += (60 - age) / 10; // Penalty decreases for each decade below 60
      }
      return total;
    }, 0);

    // Calculate DPF score
    let calculatedDPF = immediateScore + distantScore - agePenalty;

    // Clamp DPF score to a maximum of 2.5 and a minimum of 0
    calculatedDPF = Math.max(0, Math.min(calculatedDPF, 2.5));

    return Number(calculatedDPF.toFixed(3)); // Limit to three decimal places
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const agesOnsetList = agesOnset
      .split(",")
      .map((age) => parseInt(age.trim()))
      .filter((age) => !isNaN(age)); // Filter out any non-numeric values

    const score = calculateDPF(
      parseInt(numImmediate) || 0,
      parseInt(numDistant) || 0,
      agesOnsetList
    );
    setDpfScore(score);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">
        Diabetes Pedigree Function Calculator
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700">
            Number of Immediate Relatives with Diabetes:
          </label>
          <input
            type="number"
            value={numImmediate}
            onChange={(e) => setNumImmediate(e.target.value)}
            min="0"
            placeholder="Optional"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Number of Distant Relatives with Diabetes:
          </label>
          <input
            type="number"
            value={numDistant}
            onChange={(e) => setNumDistant(e.target.value)}
            min="0"
            placeholder="Optional"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Ages of Onset (comma separated):
          </label>
          <input
            type="text"
            value={agesOnset}
            onChange={(e) => setAgesOnset(e.target.value)}
            placeholder="e.g., 45, 50, 70"
            required
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Calculate DPF
        </button>
      </form>

      {dpfScore !== null && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">
            DPF-like Score: {dpfScore.toFixed(3)}
          </h3>
        </div>
      )}
    </div>
  );
};

export default DPFCalculation;
