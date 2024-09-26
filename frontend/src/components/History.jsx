import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDiabetesData } from "../features/auth/authSlice";

const History = () => {
  const dispatch = useDispatch();
  const { diabetesData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserDiabetesData());
  }, [dispatch]);

  return (
    <div className="bg-slate-100 p-4 mb-10 pb-10">
      <div className="text-2xl font-bold mb-4">History</div>

      {/* Header Row */}
      <div className="hidden md:flex justify-between items-center border-y border-black p-4 font-semibold text-center">
        <div className="flex-1">S.N</div>
        <div className="flex-1">Pregnancies (No of times)</div>
        <div className="flex-1">Glucose</div>
        <div className="flex-1">Blood Pressure</div>
        <div className="flex-1">Skin Thickness</div>
        <div className="flex-1">Insulin</div>
        <div className="flex-1">BMI</div>
        <div className="flex-1">Diabetes Pedigree Function</div>
        <div className="flex-1">Age</div>
        <div className="flex-1">Result</div>
      </div>

      {diabetesData && diabetesData.map ? (
        diabetesData.map((item, i) => (
          <div key={i} className="border-b border-black p-4">
            {/* For larger screens */}
            <div className="hidden md:flex justify-between items-center text-center">
              <div className="flex-1">{i + 1}</div>
              <div className="flex-1">{item.pregnancies}</div>
              <div className="flex-1">{item.glucose}</div>
              <div className="flex-1">{item.bloodpressure}</div>
              <div className="flex-1">{item.skinthickness}</div>
              <div className="flex-1">{item.insulin}</div>
              <div className="flex-1">{item.bmi}</div>
              <div className="flex-1">{item.diabetes_pedigree_function}</div>
              <div className="flex-1">{item.age}</div>
              <div className="flex-1">{item.result}</div>
            </div>

            {/* For smaller screens */}
            <div className="md:hidden grid grid-cols-2 gap-2 text-left">
              <div>S.N</div>
              <div>{i + 1}</div>
              <div className="font-bold">Pregnancies:</div>
              <div>{item.pregnancies}</div>
              <div className="font-bold">Glucose:</div>
              <div>{item.glucose}</div>
              <div className="font-bold">Blood Pressure:</div>
              <div>{item.bloodpressure}</div>
              <div className="font-bold">Skin Thickness:</div>
              <div>{item.skinthickness}</div>
              <div className="font-bold">Insulin:</div>
              <div>{item.insulin}</div>
              <div className="font-bold">BMI:</div> <div>{item.bmi}</div>
              <div className="font-bold">Diabetes Pedigree Function:</div>
              <div>{item.diabetes_pedigree_function}</div>
              <div className="font-bold">Age:</div> <div>{item.age}</div>
              <div className="font-bold">Result:</div> <div>{item.result}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-4">No data available</div>
      )}
    </div>
  );
};

export default History;
