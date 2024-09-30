import React, { useState } from "react";

const DPFCalculator = ({ setDpfValue, closeModal }) => {
  // Accept setDpfValue as a prop
  const [parents, setParents] = useState("");
  const [siblings, setSiblings] = useState("");
  const [grandparents, setGrandparents] = useState("");
  const [unclesAunts, setUnclesAunts] = useState("");
  // const [dpf, setDpf] = useState(null);

  const calculateDPF = () => {
    const parentWeight = 0.5;
    const siblingWeight = 0.25;
    const grandparentWeight = 0.12;
    const uncleAuntWeight = 0.08;

    let dpfValue =
      (parseInt(parents) || 0) * parentWeight +
      (parseInt(siblings) || 0) * siblingWeight +
      (parseInt(grandparents) || 0) * grandparentWeight +
      (parseInt(unclesAunts) || 0) * uncleAuntWeight;

    dpfValue = Math.min(Math.max(dpfValue, 0.08), 2.42);
    // setDpf(dpfValue);
    setDpfValue(dpfValue); // Call the prop function to set DPF value in Prediction
    closeModal();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Diabetes Pedigree Function Calculator
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Number of diabetic parents:
        </label>
        <input
          type="number"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
          value={parents}
          onChange={(e) => setParents(e.target.value)}
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Number of diabetic siblings:
        </label>
        <input
          type="number"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
          value={siblings}
          onChange={(e) => setSiblings(e.target.value)}
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Number of diabetic grandparents:
        </label>
        <input
          type="number"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
          value={grandparents}
          onChange={(e) => setGrandparents(e.target.value)}
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Number of diabetic uncles/aunts:
        </label>
        <input
          type="number"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
          value={unclesAunts}
          onChange={(e) => setUnclesAunts(e.target.value)}
          min="0"
        />
      </div>

      <button
        onClick={calculateDPF}
        className="w-full py-2 mt-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Calculate DPF
      </button>

      {/* {dpf !== null && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-center">
            Your DPF Value:
            <span className="text-blue-600">{dpf.toFixed(3)}</span>
          </h3>
        </div>
      )} */}
    </div>
  );
};

export default DPFCalculator;
