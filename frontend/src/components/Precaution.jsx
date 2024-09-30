import React from "react";

const Precautions = ({ hasDiabetes }) => {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      {hasDiabetes ? (
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Precautions for Diabetes
          </h2>
          <ul className="list-disc space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">Healthy Diet: </span>
              Eat a balanced diet rich in vegetables, whole grains, and lean
              protein. Avoid processed sugars and unhealthy fats.
            </li>
            <li>
              <span className="font-semibold">Regular Exercise: </span>
              Aim for at least 30 minutes of moderate physical activity, like
              walking, every day.
            </li>
            <li>
              <span className="font-semibold">Monitoring Blood Sugar: </span>
              Check your blood sugar levels frequently to maintain control.
            </li>
            <li>
              <span className="font-semibold">Stay Hydrated: </span>
              Drink plenty of water to help regulate blood sugar levels.
            </li>
            <li>
              <span className="font-semibold">Medication Adherence: </span>
              Take prescribed medication or insulin regularly, as advised by
              your healthcare provider.
            </li>
            <li>
              <span className="font-semibold">Foot Care: </span>
              Inspect your feet daily for any signs of sores or injuries.
            </li>
            <li>
              <span className="font-semibold">Regular Health Check-ups: </span>
              Schedule regular doctor visits for diabetes management and
              check-ups.
            </li>
            <li>
              <span className="font-semibold">Stress Management: </span>
              Use relaxation techniques such as yoga or meditation to manage
              stress.
            </li>
          </ul>
        </div>
      ) : (
        <div className="text-green-600">
          <h2 className="text-2xl font-bold">No Diabetes Detected</h2>
          <p>Keep up the healthy lifestyle!</p>
        </div>
      )}
    </div>
  );
};

export default Precautions;
